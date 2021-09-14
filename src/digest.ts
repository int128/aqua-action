import { createHash } from 'crypto'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export const computeDigest = async (name: string): Promise<string> => {
  const h = createHash('sha256')
  const f = fs.createReadStream(name)
  f.pipe(h)
  const p = new Promise<string>((resolve, reject) => {
    f.on('end', () => {
      resolve(h.digest('hex'))
    })
    f.on('error', reject)
  })
  p.finally(() => f.close())
  return p
}

export const computeCacheKeyForRelativePath = (): string => {
  const workspace = process.env['GITHUB_WORKSPACE'] ?? process.cwd()
  const rp = path.relative(workspace, os.homedir())
  const h = createHash('sha256')
  h.write(rp)
  return h.digest('hex')
}
