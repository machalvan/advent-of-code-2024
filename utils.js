// Functions

export function createGrid(width, height, cell = 0) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(cell))
}

export function createRange(start, end, step = 1) {
  // [start, end)
  //
  // Example usage:
  // createRange(1, 5) // [1, 2, 3, 4]

  return start <= end
    ? [...Array(Math.floor((end - 1 - start) / step) + 1).keys()].map(
        num => num * step + start
      )
    : [...Array(Math.floor((start - end - 1) / step) + 1).keys()].map(
        num => -num * step + start
      )
}

export function loop(times, callback) {
  for (let i = 0; i < times; i++) {
    callback(i)
  }
}

export function manhattan(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

// Array

Array.prototype.min = function () {
  return Math.min(...this)
}

Array.prototype.max = function () {
  return Math.max(...this)
}

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0)
}

Array.prototype.prod = function () {
  return this.reduce((a, b) => a * b, 1)
}

Array.prototype.equals = function (arr) {
  if (this.length !== arr.length) return false

  for (let i = 0; i < this.length; i++) {
    if (this[i] !== arr[i]) return false
  }

  return true
}

Array.prototype.toSortedAsc = function () {
  return this.toSorted((a, b) =>
    typeof a === 'string' ? a.localeCompare(b) : a - b
  )
}

Array.prototype.toSortedDesc = function () {
  return this.toSorted((a, b) =>
    typeof a === 'string' ? b.localeCompare(a) : b - a
  )
}

Array.prototype.toNums = function () {
  return this.map(str => (isNaN(+str) ? str : +str))
}

Array.prototype.intersection = function () {
  return this.filter(str => arguments[0].includes(str))
}

Array.prototype.difference = function () {
  return this.filter(str => !arguments[0].includes(str))
}

Array.prototype.isSubsetOf = function (arr) {
  return this.every(str => arr.includes(str))
}

Array.prototype.isSupersetOf = function (arr) {
  return arr.every(str => this.includes(str))
}

Array.prototype.transpose = function () {
  return this[0].map((_, i) => this.map(row => row[i]))
}

Array.prototype.rotate = function (times = 1) {
  if (times === 0) return this
  const rotated = this[0].map((_, i) => this.map(row => row[i]).reverse())
  return rotated.rotate(times.mod(4) - 1)
}

Array.prototype.count = function (value) {
  return this.filter(item => item === value).length
}

Array.prototype.countAll = function () {
  return this.reduce((acc, cur) => {
    acc[cur] = (acc[cur] ?? 0) + 1
    return acc
  }, {})
}

Array.prototype.gcd = function () {
  const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b))
  return this.reduce(gcd, 0)
}

Array.prototype.lcm = function () {
  const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b))
  const lcm = (a, b) => (a / gcd(a, b)) * b
  return this.reduce(lcm, 1)
}

Array.prototype.forEachSurrounding = function (x, y, callback) {
  for (const dy of [-1, 0, 1]) {
    for (const dx of [-1, 0, 1]) {
      if (dx === 0 && dy === 0) continue
      if (this[y + dy]?.[x + dx] === undefined) continue

      callback({
        x: x + dx,
        y: y + dy,
        pos: [x + dx, y + dy],
        cell: this[y + dy][x + dx],
        dir: {
          '0,-1': 0,
          '1,0': 1,
          '0,1': 2,
          '-1,0': 3,
          '1,-1': 4,
          '1,1': 5,
          '-1,1': 6,
          '-1,-1': 7
        }[[dx, dy]]
      })
    }
  }
}

Array.prototype.forEachAdjacent = function (x, y, callback) {
  for (const dy of [-1, 0, 1]) {
    for (const dx of [-1, 0, 1]) {
      if (dx === 0 && dy === 0) continue
      if (this[y + dy]?.[x + dx] === undefined) continue
      if (Math.abs(dx) + Math.abs(dy) !== 1) continue

      callback({
        x: x + dx,
        y: y + dy,
        pos: [x + dx, y + dy],
        cell: this[y + dy][x + dx],
        dir: { '0,-1': 0, '1,0': 1, '0,1': 2, '-1,0': 3 }[[dx, dy]]
      })
    }
  }
}

Array.prototype.forEachCell = function (callback) {
  for (let r = 0; r < this.length; r++) {
    for (let c = 0; c < this[r].length; c++) {
      callback({ r, c, pos: [c, r], cell: this[r][c] })
    }
  }
}

Array.prototype.getPermutations = function () {
  // Heap's algorithm
  //
  // Example usage:
  // [1, 2, 3].getPermutations() // [[1, 2, 3], [2, 1, 3], [3, 1, 2], ...]

  const result = []
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice()
        let next = curr.splice(i, 1)
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(this)

  return result
}

// String

String.prototype.toList = function () {
  return this.split('')
}

String.prototype.toLines = function () {
  return this.split('\n')
}

String.prototype.toWords = function () {
  return this.split(' ')
}

String.prototype.toBlocks = function () {
  return this.split('\n\n').map(block => block.toLines())
}

String.prototype.toGrid = function () {
  return this.toLines().map(line => line.split(''))
}

String.prototype.isUpperCase = function () {
  'use strict'
  return this === this.toUpperCase()
}

String.prototype.getNums = function () {
  return this.match(/-?\d+(\.\d+)?/g).toNums()
}

String.prototype.getInts = function () {
  return this.match(/-?\d+/g).toNums()
}

String.prototype.isNum = function () {
  return !isNaN(this)
}

String.prototype.toBin = function () {
  return (this >>> 0).toString(2)
}

String.prototype.toDec = function () {
  return parseInt(this, 2)
}

String.prototype.toReversed = function () {
  return this.split('').reverse().join('')
}

// Number

Number.prototype.toBin = function () {
  return (this >>> 0).toString(2)
}

Number.prototype.toDec = function () {
  return parseInt(this, 2)
}

Number.prototype.mod = function (num) {
  'use strict'
  return ((this % num) + num) % num
}

// Object

Object.prototype.getShortestDistance = function (start, end) {
  // Dijkstra's algorithm
  //
  // Example usage:
  // const graph = {
  //   a: { b: 1, c: 4 },
  //   b: { c: 2, d: 6 },
  //   c: { d: 3, e: 8 },
  //   d: { e: 1 },
  //   e: {},
  // }
  // graph.getShortestDistance('a', 'e') // 7

  const distances = {}
  for (const vertex in this) {
    distances[vertex] = Infinity
  }

  distances[start] = 0

  const pq = [[0, start]]
  while (pq.length > 0) {
    const [distance, vertex] = pq.pop()

    if (distance > distances[vertex]) continue

    for (const [neighbor, weight] of Object.entries(this[vertex])) {
      const newDistance = distance + weight

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance
        pq.push([newDistance, neighbor])
      }
    }
  }

  return distances[end]
}
