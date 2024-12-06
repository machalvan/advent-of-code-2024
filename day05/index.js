import '../utils.js'

export const part1 = input => {
  const [rules, updates] = input.toBlocks()

  const pageOrder = {}
  for (const rule of rules) {
    const [key, value] = rule.split('|').toNums()

    if (pageOrder[key] === undefined) {
      pageOrder[key] = [value]
    } else {
      pageOrder[key].push(value)
    }
  }

  let sum = 0
  for (const update of updates) {
    const pages = update.split(',')

    if (
      pages.every((page, index) => {
        if (index === pages.length - 1) return true
        const rules = pageOrder[page] ?? []
        const rest = pages.slice(index + 1).toNums()

        return rest.every(r => rules.includes(r))
      })
    ) {
      sum += +pages[pages.length / 2 - 0.5]
    }
  }

  return sum
}

export const part2 = input => {
  const [rules, updates] = input.toBlocks()

  const pageOrder = {}
  for (const rule of rules) {
    const [key, value] = rule.split('|').toNums()

    if (pageOrder[key] === undefined) {
      pageOrder[key] = [value]
    } else {
      pageOrder[key].push(value)
    }
  }

  let sum = 0
  for (const update of updates) {
    const pages = update.split(',').toSorted((a, b) => {
      const rulesA = pageOrder[a] ?? []
      return rulesA.includes(+b) ? -1 : 1
    })

    if (
      pages.every((page, index) => {
        if (index === pages.length - 1) return true
        const rules = pageOrder[page] ?? []
        const rest = pages.slice(index + 1).toNums()

        return rest.every(r => rules.includes(r))
      })
    ) {
      sum += +pages[pages.length / 2 - 0.5]
    }
  }

  return sum - part1(input)
}
