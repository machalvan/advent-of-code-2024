require('../utils')()

const part1 = input => {
  const nums = input.toLines().map(line => line.toNums())

  let l = []
  let r = []
  for (const num of nums) {
    l.push(num[0])
    r.push(num[1])
  }

  l.sort()
  r.sort()

  return l.reduce((acc, _, i) => acc + Math.abs(l[i] - r[i]), 0)
}

const part2 = input => {
  const nums = input.toLines().map(line => line.toNums())

  const l = []
  const r = []
  for (const num of nums) {
    l.push(num[0])
    r.push(num[1])
  }

  return l.reduce((acc, _, i) => acc + l[i] * r.count(l[i]), 0)
}

module.exports = { part1, part2 }
