import '../utils.js'

export const part1 = input => {
  const grid = input.toGrid()

  let sr, sc, er, ec
  grid.forEachCell(({ cell, r, c }) => {
    if (cell === 'S') {
      sr = r
      sc = c
    } else if (cell === 'E') {
      er = r
      ec = c
    }
  })

  let queue = [[sr, sc, 1, 0]]
  let seen = new Map()
  let minScore = Infinity
  while (queue.length) {
    let [r, c, dir, score] = queue.shift()

    if (r === er && c === ec) {
      minScore = Math.min(score, minScore)
      continue
    }

    let key = [r, c, dir].join()
    if (seen.has(key) && seen.get(key) <= score) continue
    seen.set(key, score)

    let dr = [-1, 0, 1, 0][dir]
    let dc = [0, 1, 0, -1][dir]
    let nr = r + dr
    let nc = c + dc

    let cell = grid[nr]?.[nc]
    if (cell !== undefined && cell !== '#') {
      queue.push([nr, nc, dir, score + 1])
    }

    queue.push([r, c, (dir + 1) % 4, score + 1000])
    queue.push([r, c, (dir + 3) % 4, score + 1000])
  }

  return minScore
}

export const part2 = input => {
  const grid = input.toGrid()

  let sr, sc, er, ec
  grid.forEachCell(({ cell, r, c }) => {
    if (cell === 'S') {
      sr = r
      sc = c
    } else if (cell === 'E') {
      er = r
      ec = c
    }
  })

  // prettier-ignore
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  let minScore = Infinity
  let queue = [[sr, sc, 0, 1, 0, new Set()]]
  let seen = new Map()
  let paths = {}
  while (queue.length) {
    let [r, c, dr, dc, score, vis] = queue.shift()

    if (r === er && c === ec) {
      minScore = Math.min(score, minScore)
      paths[minScore] = new Set([...(paths[minScore] ?? new Set()), ...vis])
      continue
    }

    let nr = r + dr
    let nc = c + dc
    let cell = grid[nr]?.[nc]

    if (cell !== undefined && cell !== '#') {
      let newScore = score + 1
      let newVis = new Set([...vis, [r, c].join()])

      let visKey = `${nr},${nc},${dr},${dc}`
      if (seen.has(visKey) && seen.get(visKey) < newScore) continue
      seen.set(visKey, newScore)

      queue.push([nr, nc, dr, dc, newScore, newVis])
    }

    for (const [ndr, ndc] of dirs) {
      let newScore = score + 1000

      let visKey = `${r},${c},${ndr},${ndc}`
      if (seen.has(visKey) && seen.get(visKey) < newScore) continue
      seen.set(visKey, newScore)

      if (newScore >= minScore) continue

      queue.push([r, c, ndr, ndc, newScore, vis])
    }
  }

  return paths[minScore].size + 1
}
