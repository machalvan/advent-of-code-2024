import '../utils.js'

export const part1 = input => {
  return input
    .match(/mul\(\d+,\d+\)/g)
    .map(match => match.getNums().prod())
    .sum()
}

export const part2 = input => {
  let enabled = true

  return input
    .match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)
    .map(match => {
      if (match === 'do()') {
        enabled = true
      } else if (match === "don't()") {
        enabled = false
      } else if (enabled) {
        return match.getNums().prod()
      }

      return 0
    })
    .sum()
}
