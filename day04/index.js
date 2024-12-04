import '../utils.js'

const isXMAS = slice => {
  return (
    (slice[0] === 'X' &&
      slice[1] === 'M' &&
      slice[2] === 'A' &&
      slice[3] === 'S') ||
    (slice[0] === 'S' &&
      slice[1] === 'A' &&
      slice[2] === 'M' &&
      slice[3] === 'X')
  )
}

const isMAS = slice => {
  return (
    (slice[0] === 'M' && slice[1] === 'A' && slice[2] === 'S') ||
    (slice[0] === 'S' && slice[1] === 'A' && slice[2] === 'M')
  )
}

export const part1 = input => {
  const grid = input.toGrid()
  let count = 0

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length - 3; x++) {
      const slice = grid[y].slice(x, x + 4)

      if (isXMAS(slice)) {
        count++
      }
    }
  }

  for (let y = 0; y < grid.length - 3; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const slice = [grid[y][x], grid[y + 1][x], grid[y + 2][x], grid[y + 3][x]]

      if (isXMAS(slice)) {
        count++
      }
    }
  }

  for (let y = 0; y < grid.length - 3; y++) {
    for (let x = 0; x < grid[y].length - 3; x++) {
      const slice = [
        grid[y][x],
        grid[y + 1][x + 1],
        grid[y + 2][x + 2],
        grid[y + 3][x + 3]
      ]

      if (isXMAS(slice)) {
        count++
      }
    }
  }

  for (let y = 0; y < grid.length - 3; y++) {
    for (let x = 3; x < grid[y].length; x++) {
      const slice = [
        grid[y][x],
        grid[y + 1][x - 1],
        grid[y + 2][x - 2],
        grid[y + 3][x - 3]
      ]

      if (isXMAS(slice)) {
        count++
      }
    }
  }

  return count
}

export const part2 = input => {
  const grid = input.toGrid()
  let count = 0

  for (let y = 0; y < grid.length - 2; y++) {
    for (let x = 2; x < grid[y].length; x++) {
      const slice1 = [grid[y][x], grid[y + 1][x - 1], grid[y + 2][x - 2]]
      const slice2 = [grid[y + 2][x], grid[y + 1][x - 1], grid[y][x - 2]]

      if (isMAS(slice1) && isMAS(slice2)) {
        count++
      }
    }
  }

  return count
}
