import { computeDigest } from '../src/digest'

test('digest', async () => {
  // % shasum -a 256 tests/fixtures/fixture.txt
  // 4a1e67f2fe1d1cc7b31d0ca2ec441da4778203a036a77da10344c85e24ff0f92  tests/fixtures/fixture.txt
  const actual = await computeDigest(`${__dirname}/fixtures/fixture.txt`)
  expect(actual).toBe('4a1e67f2fe1d1cc7b31d0ca2ec441da4778203a036a77da10344c85e24ff0f92')
})
