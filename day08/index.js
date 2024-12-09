import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()

  const freqs = {}
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c]

      if (grid[r][c] !== '.') {
        freqs[cell] = (freqs[cell] ?? []).concat([[r, c]])
      }
    }
  }

  let res = new Set()
  for (const value of Object.values(freqs)) {
    for (let r = 0; r < value.length; r++) {
      for (let c = 0; c < value.length; c++) {
        if (r === c) continue

        const [r1, c1] = value[r]
        const [r2, c2] = value[c]

        const dr = r1 - r2
        const dc = c1 - c2

        const nr = r1 + dr
        const nc = c1 + dc

        if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) {
          continue
        }

        res.add([nr, nc].join())
      }
    }
  }

  return res.size
}

export const part2 = input => {
  const grid = input.toGrid()

  const freqs = {}
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c]

      if (grid[r][c] !== '.') {
        freqs[cell] = (freqs[cell] ?? []).concat([[r, c]])
      }
    }
  }

  let res = new Set()
  for (const value of Object.values(freqs)) {
    for (let r = 0; r < value.length; r++) {
      for (let c = 0; c < value.length; c++) {
        if (r === c) continue

        const [r1, c1] = value[r]
        const [r2, c2] = value[c]

        const dr = r1 - r2
        const dc = c1 - c2

        let nr = r1 - dr
        let nc = c1 - dc

        while (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
          res.add([nr, nc].join())
          nr = nr + -dr
          nc = nc + -dc
        }
      }
    }
  }

  return res.size
}
