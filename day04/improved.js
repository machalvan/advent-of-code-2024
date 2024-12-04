import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  const rows = grid.length
  const cols = grid[0].length

  let count = 0

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      for (const dy of [-1, 0, 1]) {
        for (const dx of [-1, 0, 1]) {
          count += ['X', 'M', 'A', 'S'].every((char, i) => {
            const nx = y + i * dx
            const ny = x + i * dy

            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) return

            return grid[ny][nx] === char
          })
        }
      }
    }
  }

  return count
}

export const part2 = input => {
  const grid = input.toGrid()
  const rows = grid.length
  const cols = grid[0].length

  let count = 0

  for (let y = 0; y < rows - 2; y++) {
    for (let x = 0; x < cols - 2; x++) {
      const slice1 = [grid[y][x], grid[y + 1][x + 1], grid[y + 2][x + 2]]
      const slice2 = [grid[y + 2][x], grid[y + 1][x + 1], grid[y][x + 2]]

      count +=
        (slice1.equals(['M', 'A', 'S']) || slice1.equals(['S', 'A', 'M'])) &&
        (slice2.equals(['M', 'A', 'S']) || slice2.equals(['S', 'A', 'M']))
    }
  }

  return count
}
