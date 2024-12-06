import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()

  let sr
  let sc
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '^') {
        sr = r
        sc = c
        break
      }
    }

    if (sr !== undefined) break
  }

  let r = sr
  let c = sc
  let dir = 0
  let seen = new Set()
  while (true) {
    seen.add([r, c].join())

    let dr = [-1, 0, 1, 0][dir]
    let dc = [0, 1, 0, -1][dir]

    let nr = r + dr
    let nc = c + dc

    if (grid[nr]?.[nc] === undefined) break

    if (grid[nr][nc] === '#') {
      dir = (dir + 1) % 4
    } else {
      r = nr
      c = nc
    }
  }

  return seen.size
}

export const part2 = input => {
  const grid = input.toGrid()

  let sr
  let sc
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '^') {
        sr = r
        sc = c
        break
      }
    }

    if (sr !== undefined) break
  }

  let r = sr
  let c = sc
  let dir = 0
  let path = new Set()
  while (true) {
    path.add([r, c].join())

    let dr = [-1, 0, 1, 0][dir]
    let dc = [0, 1, 0, -1][dir]

    let nr = r + dr
    let nc = c + dc

    if (grid[nr]?.[nc] === undefined) break

    if (grid[nr][nc] === '#') {
      dir = (dir + 1) % 4
    } else {
      r = nr
      c = nc
    }
  }

  let res = 0
  for (const cell of path) {
    const [or, oc] = cell.getNums()
    let r = sr
    let c = sc
    let dir = 0
    let seen = new Set()

    while (true) {
      if (seen.has([r, c, dir].join())) {
        res++
        break
      }

      seen.add([r, c, dir].join())

      let dr = [-1, 0, 1, 0][dir]
      let dc = [0, 1, 0, -1][dir]

      let nr = r + dr
      let nc = c + dc

      if (grid[nr]?.[nc] === undefined) break

      if (grid[nr][nc] === '#' || (nr === or && nc === oc)) {
        dir = (dir + 1) % 4
      } else {
        r = nr
        c = nc
      }
    }
  }

  return res
}
