import { readFileSync } from 'fs'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'

async function main() {
  if (process.argv.length === 2) {
    console.error('Expected an argument.')
    console.error('Usage: node . <day>')
    process.exit(1)
  }

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const dayNumber = process.argv[2]
  const day = `day${dayNumber.padStart(2, '0')}`

  const input = readFileSync(
    resolve(__dirname, `${day}/input.txt`),
    'utf8'
  ).trimEnd()

  try {
    const { part1, part2 } = await import(`./${day}/improved.js`)
    console.log(part1(input))
    console.log(part2(input))
  } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND') {
      throw error
    }

    const { part1, part2 } = await import(`./${day}/index.js`)
    console.log(part1(input))
    console.log(part2(input))
  }
}

main()
