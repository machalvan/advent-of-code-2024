require('../utils')()

const part1 = input => {
  let l = []
  let r = []
  const nums = input.toLines().map(line => line.toNums())

  for (const num of nums) {
    l.push(num[0])
    r.push(num[1])
  }

  l.sort()
  r.sort()

  let sum = 0
  for (let i = 0; i < l.length; i++) {
    sum += Math.abs(l[i] - r[i])
  }

  return sum
}

const part2 = input => {
  const l = []
  const r = []
  const nums = input.toLines().map(line => line.toNums())

  for (const num of nums) {
    l.push(num[0])
    r.push(num[1])
  }

  let sum = 0
  for (let i = 0; i < l.length; i++) {
    sum += l[i] * r.count(l[i])
  }

  return sum
}

module.exports = { part1, part2 }
