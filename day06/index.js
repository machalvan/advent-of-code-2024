import '../utils.js'

const step = (cur, dir) => {
  switch (dir) {
    case 0:
      return [cur[0], cur[1] - 1]
    case 1:
      return [cur[0] + 1, cur[1]]
    case 2:
      return [cur[0], cur[1] + 1]
    case 3:
      return [cur[0] - 1, cur[1]]
  }
}

export const part1 = input => {
  const grid = input.toGrid()

  let cur = [0, 0]
  let visited = new Set()
  let dir = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '^') {
        cur = [c, r]
        visited.add(cur.join())
      }
    }
  }

  while (true) {
    let next = step(cur, dir)

    if (grid[next[1]]?.[next[0]] === undefined) break

    while (grid[next[1]][next[0]] === '#') {
      dir = (dir + 1) % 4
      next = step(cur, dir)
    }

    cur = next
    visited.add(cur.join())
  }

  return visited.size
}

export const part2 = input => {
  const grid = input.toGrid()

  let cur = [0, 0]
  let dir = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === '^') {
        cur = [c, r]
      }
    }
  }

  let start = cur
  let visitedDir = new Set()
  let res = 0
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let objPos = [c, r]

      if (grid[r][c] === '^' || grid[r][c] === '#') continue

      while (true) {
        let next = step(cur, dir)

        if (grid[next[1]]?.[next[0]] === undefined) break

        while (
          grid[next[1]][next[0]] === '#' ||
          next.join() === objPos.join()
        ) {
          dir = (dir + 1) % 4
          next = step(cur, dir)
        }

        cur = next

        if (visitedDir.has([cur[0], cur[1], dir].join())) {
          res++
          break
        }

        visitedDir.add([cur[0], cur[1], dir].join())
      }

      cur = start
      dir = 0
      visitedDir.clear()
    }
  }

  return res
}
