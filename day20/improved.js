import '../utils.js'
import { manhattan } from '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  const minSave = 100
  const maxCheatSteps = 2

  let start, end
  grid.forEachCell(({ cell, pos }) => {
    if (cell === 'S') start = pos
    if (cell === 'E') end = pos
  })

  let path = grid.getShortestPath(start, end, ({ cell }) => cell !== '#')

  let stepsFromStart = {}
  for (const [steps, [c, r]] of path.entries()) {
    stepsFromStart[`${c},${r}`] = steps
  }

  let count = 0
  for (const [steps, [sc, sr]] of path.entries()) {
    grid.forEachCell(({ cell, r: er, c: ec }) => {
      if (cell === '#') return

      const cheatSteps = manhattan(sc, sr, ec, er)

      if (cheatSteps <= maxCheatSteps) {
        const longPathToCheatEnd = stepsFromStart[`${ec},${er}`]
        const shortPathToCheatEnd = steps + cheatSteps
        const saved = longPathToCheatEnd - shortPathToCheatEnd

        count += saved >= minSave ? 1 : 0
      }
    })
  }

  return count
}

export const part2 = input => {
  const grid = input.toGrid()
  const minSave = 100
  const maxCheatSteps = 20

  let start, end
  grid.forEachCell(({ cell, pos }) => {
    if (cell === 'S') start = pos
    if (cell === 'E') end = pos
  })

  let path = grid.getShortestPath(start, end, ({ cell }) => cell !== '#')

  let stepsFromStart = {}
  for (const [steps, [c, r]] of path.entries()) {
    stepsFromStart[`${c},${r}`] = steps
  }

  let count = 0
  for (const [steps, [sc, sr]] of path.entries()) {
    grid.forEachCell(({ cell, r: er, c: ec }) => {
      if (cell === '#') return

      const cheatSteps = manhattan(sc, sr, ec, er)

      if (cheatSteps <= maxCheatSteps) {
        const longPathToCheatEnd = stepsFromStart[`${ec},${er}`]
        const shortPathToCheatEnd = steps + cheatSteps
        const saved = longPathToCheatEnd - shortPathToCheatEnd

        count += saved >= minSave ? 1 : 0
      }
    })
  }

  return count
}
