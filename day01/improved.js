import '../utils.js'

export const part1 = input => {
  const nums = input.toLines().map(line => line.getNums())

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

export const part2 = input => {
  const nums = input.toLines().map(line => line.getNums())

  const l = []
  const r = []
  for (const num of nums) {
    l.push(num[0])
    r.push(num[1])
  }

  return l.reduce((acc, _, i) => acc + l[i] * r.count(l[i]), 0)
}
