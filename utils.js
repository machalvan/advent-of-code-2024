// Functions

module.exports = function () {
  this.range = (start, end, step = 1) => {
    return start <= end
      ? [...Array(Math.floor((end - start) / step) + 1).keys()].map(
          num => num * step + start
        )
      : [...Array(Math.floor((start - end) / step) + 1).keys()].map(
          num => -num * step + start
        )
  }

  this.loop = (times, callback) => {
    for (let i = 0; i < times; i++) {
      callback(i)
    }
  }

  this.createGrid = (width, height, cell = 0) => {
    return Array(height)
      .fill()
      .map(() => Array(width).fill(cell))
  }

  this.manhattan = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
  }
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
  return this[0].map((_, colIndex) => this.map(row => row[colIndex]))
}

Array.prototype.count = function (value) {
  return this.filter(item => item === value).length
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

String.prototype.toNums = function () {
  return this.match(/-?\d+(\.\d+)?/g).toNums()
}

String.prototype.toInts = function () {
  return this.match(/-?\d+/g).toNums()
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
