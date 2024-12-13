import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()

  let seen = new Set()
  let sum = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let key = [r, c].join()

      if (seen.has(key)) continue
      seen.add(key)

      let cell = grid[r][c]
      let area = 1
      let perimeter = 0

      for (const dy of [-1, 0, 1]) {
        for (const dx of [-1, 0, 1]) {
          if (dx === 0 && dy === 0) continue
          if (Math.abs(dx) + Math.abs(dy) !== 1) continue

          let nr = r + dy
          let nc = c + dx

          if (grid[nr]?.[nc] !== cell) perimeter++
        }
      }

      const step = (r2, c2) => {
        grid.forEachAdjacent(c2, r2, ({ x, y, cell: nextCell }) => {
          if (nextCell !== cell) return

          let key = [y, x].join()

          if (seen.has(key)) return
          seen.add(key)

          area++

          for (const dy of [-1, 0, 1]) {
            for (const dx of [-1, 0, 1]) {
              if (dx === 0 && dy === 0) continue
              if (Math.abs(dx) + Math.abs(dy) !== 1) continue

              let nr = y + dy
              let nc = x + dx

              if (grid[nr]?.[nc] !== cell) perimeter++
            }
          }

          step(y, x)
        })
      }

      step(r, c)

      sum += area * perimeter
    }
  }

  return sum
}

export const part2 = input => {
  const grid = input.toGrid()

  const getSides = cells => {
    let sides = 0

    for (let r = 0; r < grid.length; r++) {
      let prevHasSideAbove = false
      let prevHasSideBelow = false

      for (let c = 0; c < grid[0]?.length; c++) {
        let cur = [r, c].join()
        let above = [r - 1, c].join()
        let below = [r + 1, c].join()

        if (cells.has(cur) && !cells.has(above)) {
          if (!prevHasSideAbove) {
            sides++
            prevHasSideAbove = true
          }
        } else {
          prevHasSideAbove = false
        }

        if (cells.has(cur) && !cells.has(below)) {
          if (!prevHasSideBelow) {
            sides++
            prevHasSideBelow = true
          }
        } else {
          prevHasSideBelow = false
        }
      }
    }

    for (let c = 0; c < grid[0]?.length; c++) {
      let prevHasSideLeft = false
      let prevHasSideRight = false

      for (let r = 0; r < grid.length; r++) {
        let cur = [r, c].join()
        let left = [r, c - 1]?.join()
        let right = [r, c + 1]?.join()

        if (cells.has(cur) && !cells.has(left)) {
          if (!prevHasSideLeft) {
            sides++
            prevHasSideLeft = true
          }
        } else {
          prevHasSideLeft = false
        }

        if (cells.has(cur) && !cells.has(right)) {
          if (!prevHasSideRight) {
            sides++
            prevHasSideRight = true
          }
        } else {
          prevHasSideRight = false
        }
      }
    }

    return sides
  }

  let seen = new Set()
  let sum = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let region = new Set()

      let key = [r, c].join()

      if (seen.has(key)) continue
      seen.add(key)
      region.add(key)

      let cell = grid[r][c]
      let area = 1
      let sides = 0

      for (const dy of [-1, 0, 1]) {
        for (const dx of [-1, 0, 1]) {
          if (dx === 0 && dy === 0) continue
          if (Math.abs(dx) + Math.abs(dy) !== 1) continue

          let nr = r + dy
          let nc = c + dx

          if (grid[nr]?.[nc] !== cell) sides++
        }
      }

      const step = (r2, c2) => {
        grid.forEachAdjacent(c2, r2, ({ x, y, cell: nextCell }) => {
          if (nextCell !== cell) return

          let key = [y, x].join()

          if (seen.has(key)) return
          seen.add(key)
          region.add(key)

          area++

          step(y, x)
        })
      }

      step(r, c)

      sum += area * getSides(region)
    }
  }

  return sum
}
