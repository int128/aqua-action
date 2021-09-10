import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  await run({
    config: core.getInput('config', { required: true }),
    version: core.getInput('version', { required: true }),
    token: core.getInput('token', { required: true }),
  })
}

main().catch((error) => core.setFailed(error))
