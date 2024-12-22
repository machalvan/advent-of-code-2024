import '../utils.js'

const getSecret = n => {
  let a = n * 64
  let b = n ^ a
  let c = b.mod(16777216)

  let d = Math.floor(c / 32)
  let e = c ^ d
  let f = e.mod(16777216)

  let g = f * 2048
  let h = g ^ f
  let i = h.mod(16777216)

  return i
}

const getBananasBySequence = (n, map) => {
  let changes = []
  let seen = new Set()

  for (let j = 0; j < 2000 - 1; j++) {
    let initLast = +n.toString().at(-1)

    n = getSecret(n)

    let last = +n.toString().at(-1)
    let change = last - initLast

    changes.push(change)

    if (changes.length === 4) {
      let key = changes.join(',')

      if (!seen.has(key)) {
        map[key] = (map[key] ?? 0) + last
        seen.add(key)
      }

      changes.shift()
    }
  }

  return map
}

export const part1 = input => {
  const lines = input.toLines()

  let sum = 0
  for (const line of lines) {
    let secret = +line

    for (let i = 0; i < 2000; i++) {
      secret = getSecret(secret)
    }

    sum += secret
  }

  return sum
}

export const part2 = input => {
  const lines = input.toLines()

  let map = {}
  for (const line of lines) {
    map = getBananasBySequence(+line, map)
  }

  let max = 0
  let maxKey = ''
  for (const key in map) {
    if (map[key] > max) {
      max = map[key]
      maxKey = key
    }
  }

  return max
}
