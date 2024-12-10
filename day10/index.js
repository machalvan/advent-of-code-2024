import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid().map(line => line.toNums())

  let final = new Set()
  const step = (sr, sc, r, c, i) => {
    grid.forEachAdjacent(c, r, ({ x, y, cell }) => {
      if (cell !== i) return
      step(sr, sc, y, x, i + 1)

      if (i === 9) {
        final.add([sr, sc, y, x].join(','))
      }
    })
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== 0) continue

      let sr = r
      let sc = c

      step(sr, sc, sr, sc, 1)
    }
  }

  return final.size
}

export const part2 = input => {
  const grid = input.toGrid().map(line => line.toNums())

  let count = 0
  const step = (r, c, i) => {
    grid.forEachAdjacent(c, r, ({ x, y, cell }) => {
      if (cell !== i) return
      step(y, x, i + 1)

      if (i === 9) {
        count++
      }
    })
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== 0) continue

      let sr = r
      let sc = c

      step(sr, sc, 1)
    }
  }

  return count
}
