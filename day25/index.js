import '../utils.js'

export const part1 = input => {
  let blocks = input.toBlocks()
  blocks = blocks.map(block => block.map(line => line.split('')))

  let keys = []
  let locks = []
  for (const block of blocks) {
    let pin = [-1, -1, -1, -1, -1]

    for (let r = 0; r < block.length; r++) {
      for (let c = 0; c < block[r].length; c++) {
        let cell = block[r][c]

        if (cell === '#') {
          pin[c]++
        }
      }
    }

    if (block[0].every(cell => cell === '#')) {
      locks.push(pin)
    } else {
      keys.push(pin)
    }
  }

  let sum = 0
  for (const key of keys) {
    for (const lock of locks) {
      let match = true

      for (let i = 0; i < key.length; i++) {
        if (key[i] + lock[i] > 5) {
          match = false
          break
        }
      }

      if (match) sum++
    }
  }

  return sum
}

export const part2 = input => {
  return
}
