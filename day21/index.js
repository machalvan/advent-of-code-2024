import '../utils.js'

// prettier-ignore
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]

// prettier-ignore
const dirChars = {'0,-1': '^', '1,0': '>', '0,1': 'v', '-1,0': '<'}

// prettier-ignore
const numpad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['#', '0', 'A'],
]

const numpadPos = {}
numpad.forEach((row, r) => {
  row.forEach((cell, c) => {
    numpadPos[cell] = [c, r]
  })
})

// prettier-ignore
const dirpad = [
  ['#', '^', 'A'],
  ['<', 'v', '>'],
]

const dirpadPos = {}
dirpad.forEach((row, r) => {
  row.forEach((cell, c) => {
    dirpadPos[cell] = [c, r]
  })
})

const dp = {}
const getMinSeqLen = (fromChar, toChar, depth) => {
  if (depth <= 0) return 1
  if (toChar === fromChar) return 1

  const key = `${toChar},${fromChar},${depth}`
  if (dp[key] !== undefined) return dp[key]

  const start = dirpadPos[fromChar]
  const end = dirpadPos[toChar]

  const queue = [[...start, [], new Set()]]
  let minSeqLen = Infinity
  while (queue.length) {
    const [c, r, sequence, seen] = queue.shift()

    if (c === end[0] && r === end[1]) {
      let prev = 'A'
      let sum = 0
      for (const cur of sequence.concat('A')) {
        const seqLen = getMinSeqLen(prev, cur, depth - 1)
        sum += seqLen
        prev = cur
      }

      minSeqLen = Math.min(minSeqLen, sum)
    }

    const seenKey = `${c},${r}`
    if (seen.has(seenKey)) continue
    seen.add(seenKey)

    for (const [dc, dr] of dirs) {
      const nc = c + dc
      const nr = r + dr

      const cell = dirpad[nr]?.[nc]
      if (cell === undefined || cell === '#') continue
      if (seen.has(cell)) continue

      const newDir = dirChars[`${dc},${dr}`]

      queue.push([nc, nr, [...sequence, newDir], new Set(seen)])
    }
  }

  dp[key] = minSeqLen

  return minSeqLen
}

export const part1 = input => {
  const lines = input.toLines()
  const depth = 2

  let sum = 0
  for (const line of lines) {
    let prevChar = 'A'
    let seqLen = 0

    for (const char of line) {
      const start = numpadPos[prevChar]
      const end = numpadPos[char]

      const queue = [[...start, [], new Set()]]
      let minSeqLen = Infinity
      while (queue.length) {
        const [c, r, sequence, seen] = queue.shift()

        if (c === end[0] && r === end[1]) {
          let prev = 'A'
          let sum = 0
          for (const cur of sequence.concat('A')) {
            const seqLen = getMinSeqLen(prev, cur, depth)
            sum += seqLen
            prev = cur
          }

          minSeqLen = Math.min(minSeqLen, sum)
          continue
        }

        const key = `${c},${r}`
        if (seen.has(key)) continue
        seen.add(key)

        for (const [dc, dr] of dirs) {
          const nc = c + dc
          const nr = r + dr
          const cell = numpad[nr]?.[nc]

          if (cell === undefined || cell === '#') continue
          if (seen.has(cell)) continue

          const newDir = dirChars[`${dc},${dr}`]

          queue.push([nc, nr, [...sequence, newDir], new Set(seen)])
        }
      }

      seqLen += minSeqLen
      prevChar = char
    }

    sum += seqLen * +line.slice(0, -1)
  }

  return sum
}

export const part2 = input => {
  const lines = input.toLines()
  const depth = 25

  let sum = 0
  for (const line of lines) {
    let prevChar = 'A'
    let seqLen = 0

    for (const char of line) {
      const start = numpadPos[prevChar]
      const end = numpadPos[char]

      const queue = [[...start, [], new Set()]]
      let minSeqLen = Infinity
      while (queue.length) {
        const [c, r, sequence, seen] = queue.shift()

        if (c === end[0] && r === end[1]) {
          let prev = 'A'
          let sum = 0
          for (const cur of sequence.concat('A')) {
            const seqLen = getMinSeqLen(prev, cur, depth)
            sum += seqLen
            prev = cur
          }

          minSeqLen = Math.min(minSeqLen, sum)
          continue
        }

        const key = `${c},${r}`
        if (seen.has(key)) continue
        seen.add(key)

        for (const [dc, dr] of dirs) {
          const nc = c + dc
          const nr = r + dr
          const cell = numpad[nr]?.[nc]

          if (cell === undefined || cell === '#') continue
          if (seen.has(cell)) continue

          const newDir = dirChars[`${dc},${dr}`]

          queue.push([nc, nr, [...sequence, newDir], new Set(seen)])
        }
      }

      seqLen += minSeqLen
      prevChar = char
    }

    sum += seqLen * +line.slice(0, -1)
  }

  return sum
}
