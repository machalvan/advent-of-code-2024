import '../utils.js'

const cache = {}
const getCount = (value, index, sum = 0) => {
  if (index <= 0) return 1

  const key = [value, index].join()

  if (cache[key] !== undefined) return cache[key]

  let res
  if (value === 0) {
    res = getCount(1, index - 1, sum)
  } else if (value.toString().length % 2 === 0) {
    const valueLen = value.toString().length
    res =
      getCount(+value.toString().slice(0, valueLen / 2), index - 1, sum) +
      getCount(+value.toString().slice(valueLen / 2, valueLen), index - 1, sum)
  } else {
    res = getCount(value * 2024, index - 1, sum)
  }

  cache[key] = res
  return res
}

export const part1 = input => {
  const nums = input.toWords().toNums()
  return nums.reduce((sum, num) => sum + getCount(num, 25), 0)
}

export const part2 = input => {
  const nums = input.toWords().toNums()
  return nums.reduce((sum, num) => sum + getCount(num, 75), 0)
}
