import { createHash } from 'crypto'
import * as fs from 'fs'

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
