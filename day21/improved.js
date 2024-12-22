import '../utils.js'

const numpad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['#', '0', 'A']
]

const numpadPos = {}
numpad.forEachCell(({ cell, c, r }) => {
  numpadPos[cell] = [c, r]
})

const dirpad = [
  ['#', '^', 'A'],
  ['<', 'v', '>']
]

const dirpadPos = {}
dirpad.forEachCell(({ cell, c, r }) => {
  dirpadPos[cell] = [c, r]
})

const dirPos = {
  '-1,0': dirpadPos['^'],
  '0,1': dirpadPos['>'],
  '1,0': dirpadPos['v'],
  '0,-1': dirpadPos['<']
}

const startPos = dirpadPos['A']

const dp = {}
const getMinSeqLen = (fromPos, toPos, depth, pad = dirpad) => {
  if (depth <= 0) return 1
  if (fromPos.equals(toPos)) return 1

  const key = `${toPos},${fromPos},${depth}`
  if (dp[key] !== undefined) return dp[key]

  const queue = [[...fromPos, [], new Set()]]
  let minSeqLen = Infinity
  while (queue.length) {
    const [c, r, positions, seen] = queue.shift()

    const seenKey = `${c},${r}`
    if (seen.has(seenKey)) continue
    seen.add(seenKey)

    if (c === toPos[0] && r === toPos[1]) {
      let prev = startPos
      let sum = 0

      for (const cur of positions.concat([startPos])) {
        const seqLen = getMinSeqLen(prev, cur, depth - 1)
        sum += seqLen
        prev = cur
      }

      minSeqLen = Math.min(minSeqLen, sum)
    }

    pad.forEachAdjacent(c, r, ({ x, y, dx, dy, cell }) => {
      if (cell === '#') return

      const nextPos = dirPos[`${dy},${dx}`]

      queue.push([x, y, [...positions, nextPos], new Set(seen)])
    })
  }

  dp[key] = minSeqLen

  return minSeqLen
}

export const part1 = input => {
  const lines = input.toLines()
  const depth = 2

  let sum = 0
  for (const line of lines) {
    let prevPos = numpadPos['A']
    let seqLen = 0

    for (const curChar of line) {
      let curPos = numpadPos[curChar]
      seqLen += getMinSeqLen(prevPos, curPos, depth + 1, numpad)
      prevPos = curPos
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
    let prevPos = numpadPos['A']
    let seqLen = 0

    for (const curChar of line) {
      let curPos = numpadPos[curChar]
      seqLen += getMinSeqLen(prevPos, curPos, depth + 1, numpad)
      prevPos = curPos
    }

    sum += seqLen * +line.slice(0, -1)
  }

  return sum
}
