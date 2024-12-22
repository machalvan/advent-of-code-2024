import '../utils.js'

const mix = (n, m) => n ^ m

const prune = n => n.mod(16777216)

const getSecret = n => {
  let a = prune(mix(n, n * 64))
  let b = prune(mix(a, Math.floor(a / 32)))
  let c = prune(mix(b * 2048, b))

  return c
}

export const part1 = input => {
  const lines = input.toLines().toNums()
  const iter = 2000

  let sum = 0
  for (const line of lines) {
    let secret = line

    iter.loop(() => (secret = getSecret(secret)))

    sum += secret
  }

  return sum
}

export const part2 = input => {
  const lines = input.toLines().toNums()
  const iter = 2000

  let bananas = {}
  for (const line of lines) {
    let secret = line
    let changes = []
    let seen = new Set()

    iter.loop(() => {
      let initLast = secret % 10
      secret = getSecret(secret)
      let last = secret % 10

      changes.push(last - initLast)

      if (changes.length === 4) {
        let key = changes.join(',')

        if (!seen.has(key)) {
          bananas[key] = (bananas[key] ?? 0) + last
          seen.add(key)
        }

        changes.shift()
      }
    })
  }

  return bananas.max().value
}
