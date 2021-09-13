import * as cache from '@actions/cache'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'
import * as tc from '@actions/tool-cache'
import * as os from 'os'
import { computeDigest } from './digest'

type Inputs = {
  config: string
  version: string
  token: string
}

export const run = async (inputs: Inputs): Promise<void> => {
  const digest = await computeDigest(inputs.config)
  const aqua = aquaMetadata(inputs.version)
  const cacheKey = `${aqua.cacheKey}-v1-${digest}`
  core.info(`Cache key is ${cacheKey}`)

  const cacheMiss = await core.group(
    'Restore cache',
    async () => (await cache.restoreCache(['~/.aqua'], cacheKey)) === undefined
  )

  if (cacheMiss) {
    await core.group(`Install aqua`, async () => {
      core.info(`Download ${aqua.url}`)
      const downloaded = await tc.downloadTool(aqua.url)
      const extracted = await tc.extractTar(downloaded)
      core.info(`Install from ${extracted}`)
      await io.mkdirP(`${os.homedir()}/.aqua/bin`)
      await io.cp(`${extracted}/aqua`, `${os.homedir()}/.aqua/bin/aqua`)
    })
  }

  core.addPath(`${os.homedir()}/.aqua/bin`)
  await exec.exec('aqua', ['-c', inputs.config, 'install'], {
    env: {
      ...process.env,
      GITHUB_TOKEN: inputs.token,
    },
  })

  if (cacheMiss) {
    await core.group('Save cache', async () => {
      try {
        await cache.saveCache(['~/.aqua'], cacheKey)
      } catch (error) {
        core.info(`Could not save cache: ${JSON.stringify(error)}`)
      }
    })
  }
}

type Metadata = {
  platform: string
  arch: string
  version: string
  url: string
  cacheKey: string
}

const aquaMetadata = (version: string): Metadata => {
  const platform = os.platform()
  let arch = os.arch()
  if (arch === 'x64') {
    arch = 'amd64'
  }
  return {
    platform,
    arch,
    version,
    url: `https://github.com/suzuki-shunsuke/aqua/releases/download/${version}/aqua_${platform}_${arch}.tar.gz`,
    cacheKey: `aqua-${version}-${platform}-${arch}`,
  }
}
