import '../utils.js'

export const part1 = input => {
  let [patterns, designs] = input.split('\n\n')
  patterns = patterns.split(', ')
  designs = designs.toLines()

  let cache = new Map()
  const isFound = design => {
    if (cache.has(design)) return cache.get(design)
    if (design === '') return true

    let found = false
    for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
        let sub = design.slice(pattern.length)
        found = isFound(sub)
        if (found) break
      }
    }

    cache.set(design, found)
    return found
  }

  return designs.filter(isFound).length
}

export const part2 = input => {
  let [patterns, designs] = input.split('\n\n')
  patterns = patterns.split(', ')
  designs = designs.toLines()

  let cache = new Map()
  const getCount = design => {
    if (cache.has(design)) return cache.get(design)
    if (design === '') return 1

    let count = 0
    for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
        let sub = design.slice(pattern.length)
        count += getCount(sub)
      }
    }

    cache.set(design, count)
    return count
  }

  return designs.map(getCount).sum()
}
