import '../utils.js'

export const part1 = input => {
  let [patterns, designs] = input.split('\n\n')
  patterns = patterns.split(', ')
  designs = designs.toLines()

  let cache = new Map()
  const isPossible = design => {
    if (cache.has(design)) return cache.get(design)
    if (patterns.includes(design)) return true

    let found = false
    for (let i = 1; i < design.length; i++) {
      let sub = design.slice(0, i)
      found = isPossible(sub) && isPossible(design.slice(i))
      if (found) break
    }

    cache.set(design, found)
    return found
  }

  let count = 0
  for (const design of designs) {
    count += isPossible(design) ? 1 : 0
  }

  return count
}

export const part2 = input => {
  let [patterns, designs] = input.split('\n\n')
  patterns = patterns.split(', ')
  designs = designs.toLines()

  let cache = new Map()
  const getCount = design => {
    if (cache.has(design)) return cache.get(design)

    let count = 0
    for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
        let sub = design.slice(pattern.length)
        count += sub.length > 0 ? getCount(sub) : 1
      }
    }

    cache.set(design, count)
    return count
  }

  let count = 0
  for (const design of designs) {
    count += getCount(design)
  }

  return count
}
