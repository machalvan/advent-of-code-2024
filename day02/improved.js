require('../utils')()

const isSafe = nums => {
  const numsString = JSON.stringify(nums)
  const numsAsc = JSON.stringify(nums.toSortedAsc())
  const numsDesc = JSON.stringify(nums.toSortedDesc())

  return (
    (numsString === numsAsc || numsString === numsDesc) &&
    nums.every((_, i, arr) => {
      if (i === 0) return true
      const diff = Math.abs(arr[i] - arr[i - 1])
      return 1 <= diff && diff <= 3
    })
  )
}

const part1 = input => {
  return input.toLines().filter(line => isSafe(line.toNums())).length
}

const part2 = input => {
  return input.toLines().filter(line => {
    const nums = line.toNums()
    if (isSafe(nums)) return true
    return nums.some((_, i) => isSafe(nums.filter((_, j) => j !== i)))
  }).length
}

module.exports = { part1, part2 }
