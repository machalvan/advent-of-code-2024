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

  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < nums.length; j++) {
      const cur = nums[j]
      const curLen = cur.toString().length

      if (cur === 0) {
        nums[j] = 1
      } else if (curLen % 2 === 0) {
        let f = +cur.toString().slice(0, curLen / 2)
        let l = +cur.toString().slice(curLen / 2, curLen)
        nums.splice(j, 1, f, l)
        j++
      } else {
        nums[j] *= 2024
      }
    }
  }

  return nums.length
}

export const part2 = input => {
  const nums = input.toWords().toNums()

  let sum = 0
  for (const num of nums) {
    sum += getCount(num, 75)
  }

  return sum
}
