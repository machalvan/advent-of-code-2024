import '../utils.js'
import { createGrid } from '../utils.js'

export const part1 = input => {
  let bytePositions = input.toLines().map(line => line.getNums())
  let grid = createGrid(71, 71, '.')

  for (const [x, y] of bytePositions.slice(0, 1024)) {
    grid[y][x] = '#'
  }

  return grid.getShortestDist([0, 0], [70, 70], ({ cell }) => cell !== '#')
}

export const part2 = input => {
  let bytePositions = input.toLines().map(line => line.getNums())
  let grid = createGrid(71, 71, '.')

  for (let i = 0; i < bytePositions.length; i++) {
    const [x, y] = bytePositions[i]
    grid[y][x] = '#'

    let dist = grid.getShortestDist(
      [0, 0],
      [70, 70],
      ({ cell }) => cell !== '#'
    )

    if (dist === null) return [x, y].join(',')
  }
}
