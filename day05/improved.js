import '../utils.js'

export const part1 = input => {
  const [rules, updates] = input.toBlocks()

  const pageRules = {}
  for (const rule of rules) {
    const [key, value] = rule.split('|')
    pageRules[key] = (pageRules[key] ?? []).concat(value)
  }

  let sum = 0
  for (const update of updates) {
    const pages = update.split(',')

    if (
      pages.every((page, index) =>
        pages.slice(index + 1).isSubsetOf(pageRules[page])
      )
    ) {
      sum += +pages[Math.floor(pages.length / 2)]
    }
  }

  return sum
}

export const part2 = input => {
  const [rules, updates] = input.toBlocks()

  const pageRules = {}
  for (const rule of rules) {
    const [key, value] = rule.split('|')
    pageRules[key] = (pageRules[key] ?? []).concat(value)
  }

  let sum = 0
  for (const update of updates) {
    const pages = update
      .split(',')
      .toSorted((a, b) => (pageRules[a].includes(b) ? -1 : 1))

    if (pages.join(',') === update) {
      continue
    }

    if (
      pages.every((page, index) =>
        pages.slice(index + 1).isSubsetOf(pageRules[page])
      )
    ) {
      sum += +pages[Math.floor(pages.length / 2)]
    }
  }

  return sum
}
