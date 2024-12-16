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

  // prettier-ignore
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  let minScore = Infinity
  let queue = [[sr, sc, 0, 1, 0]]
  let visited = new Map()
  while (queue.length) {
    let [r, c, prevDr, prevDc, score] = queue.shift()

    if (r === er && c === ec) {
      minScore = Math.min(score, minScore)
      continue
    }

    for (const [dr, dc] of dirs) {
      let nr = r + dr
      let nc = c + dc

      if (grid[nr]?.[nc] === undefined) continue
      if (grid[nr][nc] === '#') continue

      let key = `${nr},${nc},${dr},${dc}`
      if (visited.has(key) && visited.get(key) <= score) continue
      visited.set(key, score)

      let newScore = score + (prevDr === dr && prevDc === dc ? 1 : 1001)
      if (newScore >= minScore) continue

      queue.push([nr, nc, dr, dc, newScore])
    }
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
  let visited = new Map()
  let paths = {}
  while (queue.length) {
    let [r, c, prevDr, prevDc, score, vis] = queue.shift()

    if (r === er && c === ec) {
      minScore = Math.min(score, minScore)
      paths[minScore] = (paths[minScore] ?? []).concat(...vis)
      continue
    }

    let nr = r + prevDr
    let nc = c + prevDc
    let newVis = new Set(vis).add(`${r},${c}`)

    if (grid[nr]?.[nc] !== undefined && grid[nr][nc] !== '#') {
      let newScore = score + 1

      let visKey = `${nr},${nc},${prevDr},${prevDc}`
      if (visited.has(visKey) && visited.get(visKey) < newScore) continue
      visited.set(visKey, newScore)

      queue.push([nr, nc, prevDr, prevDc, newScore, newVis])
    }

    for (const [dr, dc] of dirs) {
      let newScore = score + 1000

      let visKey = `${r},${c},${dr},${dc}`
      if (visited.has(visKey) && visited.get(visKey) < newScore) continue
      visited.set(visKey, newScore)

      if (newScore >= minScore) continue

      queue.push([r, c, dr, dc, newScore, newVis])
    }
  }

  let res = new Set()
  for (const item of paths[minScore]) {
    res.add(item)
  }

  return res.size + 1
}
