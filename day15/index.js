import '../utils.js'

export const part1 = input => {
  let [grid, ops] = input.split('\n\n')
  grid = grid.toGrid()
  ops = ops.toList().filter(op => op !== '\n')

  let sr
  let sc
  grid.forEachCell(({ cell, r, c }) => {
    if (cell === '@') {
      sr = r
      sc = c
      grid[r][c] = '.'
    }
  })

  let r = sr
  let c = sc
  let dirs = ['^', '>', 'v', '<']
  for (const op of ops) {
    let dir = dirs.indexOf(op)
    let dr = [-1, 0, 1, 0][dir]
    let dc = [0, 1, 0, -1][dir]

    let nr = r + dr
    let nc = c + dc

    let cell = grid[nr][nc]
    if (cell === '#') {
      continue
    } else if (cell === 'O') {
      while (grid[nr][nc] === 'O') {
        nr += dr
        nc += dc
      }

      if (grid[nr][nc] === '#') continue

      grid[r + dr][c + dc] = '.'
      grid[nr][nc] = 'O'
    }

    r += dr
    c += dc
  }

  let sum = 0
  grid.forEachCell(({ cell, r, c }) => {
    sum += cell === 'O' ? r * 100 + c : 0
  })

  return sum
}

export const part2 = input => {
  let [grid, ops] = input.split('\n\n')
  grid = grid.toGrid()
  ops = ops.toList().filter(op => op !== '\n')

  let newGrid = []
  let sr
  let sc
  grid.forEachCell(({ cell, r, c }) => {
    newGrid[r] ??= []

    if (cell === '@') {
      newGrid[r].push('@', '.')
      sr = r
      sc = c * 2
    } else if (cell === 'O') {
      newGrid[r].push('[', ']')
    } else if (cell === '#') {
      newGrid[r].push('#', '#')
    } else {
      newGrid[r].push('.', '.')
    }
  })

  grid = newGrid

  let r = sr
  let c = sc
  let dirs = ['^', '>', 'v', '<']
  for (const op of ops) {
    let dir = dirs.indexOf(op)
    let dr = [-1, 0, 1, 0][dir]
    let dc = [0, 1, 0, -1][dir]

    let nr = r + dr
    let nc = c + dc

    let cell = grid[nr][nc]
    if (cell === '#') {
      continue
    } else if (cell === '[' || cell === ']') {
      let nextPos = [[nc, nr]]
      let boxCells = [[nc, nr, grid[nr][nc]]]

      if (grid[nr][nc] === '[') {
        nextPos.push([nc + 1, nr])
        boxCells.push([nc + 1, nr, ']'])
      } else {
        nextPos.push([nc - 1, nr])
        boxCells.push([nc - 1, nr, '['])
      }

      let stop = false
      if (dir === 0 || dir === 2) {
        while (nextPos.length > 0) {
          let [bc, br] = nextPos.pop()
          let nr = br + dr
          let nc = bc + dc

          let nCell = grid[nr][nc]
          if (nCell === '[') {
            nextPos.push([nc, nr], [nc + 1, nr])
            boxCells.push([nc, nr, '['], [nc + 1, nr, ']'])
          } else if (nCell === ']') {
            nextPos.push([nc, nr], [nc - 1, nr])
            boxCells.push([nc, nr, ']'], [nc - 1, nr, '['])
          } else if (nCell === '#') {
            stop = true
            break
          }
        }
      } else {
        while (true) {
          nr += 2 * dr
          nc += 2 * dc

          let nCell = grid[nr][nc]
          if (nCell === '[') {
            boxCells.push([nc, nr, '['], [nc + 1, nr, ']'])
          } else if (nCell === ']') {
            boxCells.push([nc, nr, ']'], [nc - 1, nr, '['])
          } else {
            if (nCell === '#') {
              stop = true
            }

            break
          }
        }
      }

      if (stop) continue

      for (const [bc, br] of boxCells) {
        grid[br][bc] = '.'
      }

      for (const [bc, br, boxCell] of boxCells) {
        grid[br + dr][bc + dc] = boxCell
      }
    }

    r += dr
    c += dc
  }

  let sum = 0
  grid.forEachCell(({ cell, r, c }) => (sum += cell === '[' ? r * 100 + c : 0))

  return sum
}
