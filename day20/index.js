import '../utils.js'
import { manhattan } from '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()
  const minSave = 100

  let start, end
  grid.forEachCell(({ cell, pos }) => {
    if (cell === 'S') start = pos
    if (cell === 'E') end = pos
  })

  let minSteps = grid.getShortestDist(start, end, ({ cell }) => cell !== '#')

  let cheats = {}
  for (let i = 0; i < minSteps; i++) {
    const queue = [[...start, 0, new Map()]]

    while (queue.length) {
      const [x, y, steps, seen] = queue.shift()

      if (steps > minSteps - minSave) continue

      const key = `${x},${y}`
      if (seen.has(key)) continue
      seen.set(key, steps)

      if (x === end[0] && y === end[1]) {
        let saved = minSteps - steps
        cheats[saved] = (cheats[saved] ?? 0) + 1
        continue
      }

      grid.forEachAdjacent(x, y, ({ cell, x: nx, y: ny }) => {
        if (cell === '#' && steps !== i) return

        if (steps === i) {
          queue.push([nx, ny, steps + 1, new Map(seen)])
        } else {
          queue.push([nx, ny, steps + 1, seen])
        }
      })
    }
  }

  let res = 0
  for (const [saved, count] of Object.entries(cheats)) {
    if (saved >= minSave) {
      res += count
    }
  }

  return res
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
  let minSteps = path.length - 1

  let stepsFromStart = {}
  for (const [steps, [x, y]] of path.entries()) {
    stepsFromStart[`${x},${y}`] = steps
  }

  const getValidEnds = (x, y) => {
    let ends = []

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const dist = manhattan(x, y, c, r)

        if (dist <= maxCheatSteps) {
          const cell = grid[r]?.[c]

          if (cell === undefined || cell === '#') continue

          ends.push([c, r, dist])
        }
      }
    }

    return ends
  }

  let map = {}
  for (const [i, [x, y]] of path.entries()) {
    const validEnds = getValidEnds(x, y)

    for (const [nx, ny, startDist] of validEnds) {
      const endDist = minSteps - stepsFromStart[`${nx},${ny}`]
      const saved = minSteps - (i + startDist + endDist)

      if (saved >= minSave) {
        map[saved] = (map[saved] ?? 0) + 1
      }
    }
  }

  let res = 0
  for (const [saved, count] of Object.entries(map)) {
    if (saved >= minSave) {
      res += count
    }
  }

  return res
}
