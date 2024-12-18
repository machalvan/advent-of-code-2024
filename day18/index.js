import '../utils.js'
import { createGrid } from '../utils.js'

export const part1 = input => {
  const positions = input.toLines().map(line => line.getNums())

  let w = 71
  let h = 71
  let sr = 0
  let sc = 0
  let er = w - 1
  let ec = h - 1
  let grid = createGrid(w, h, '.')
  let bytes = 1024

  for (const [x, y] of positions.slice(0, bytes)) {
    grid[y][x] = '#'
  }

  let queue = [[sr, sc, 0]]
  let seen = new Map()
  while (queue.length) {
    let [r, c, score] = queue.shift()

    let key = [r, c].join()
    if (seen.has(key) && seen.get(key) <= score) continue
    seen.set(key, score)

    if (r === er && c === ec) return score

    for (let dir = 0; dir < 4; dir++) {
      let dr = [-1, 0, 1, 0][dir]
      let dc = [0, 1, 0, -1][dir]
      let nr = r + dr
      let nc = c + dc

      let cell = grid[nr]?.[nc]
      if (cell !== undefined && cell !== '#') {
        queue.push([nr, nc, score + 1])
      }
    }
  }
}

export const part2 = input => {
  const positions = input.toLines().map(line => line.getNums())

  let w = 71
  let h = 71
  let sr = 0
  let sc = 0
  let er = w - 1
  let ec = h - 1
  let grid = createGrid(w, h, '.')

  outer: for (let i = 0; i < positions.length; i++) {
    for (const [x, y] of positions.slice(0, i)) {
      grid[y][x] = '#'
    }

    let queue = [[sr, sc, 0]]
    let seen = new Map()
    while (queue.length) {
      let [r, c, score] = queue.shift()

      let key = [r, c].join()
      if (seen.has(key) && seen.get(key) <= score) continue
      seen.set(key, score)

      if (r === er && c === ec) continue outer

      for (let dir = 0; dir < 4; dir++) {
        let dr = [-1, 0, 1, 0][dir]
        let dc = [0, 1, 0, -1][dir]
        let nr = r + dr
        let nc = c + dc

        let cell = grid[nr]?.[nc]
        if (cell !== undefined && cell !== '#') {
          queue.push([nr, nc, score + 1])
        }
      }
    }

    return positions[i - 1].join(',')
  }
}
