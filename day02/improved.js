import '../utils.js'

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

export const part1 = input => {
  return input.toLines().filter(line => isSafe(line.getNums())).length
}

export const part2 = input => {
  return input.toLines().filter(line => {
    const nums = line.getNums()
    if (isSafe(nums)) return true
    return nums.some((_, i) => isSafe(nums.filter((_, j) => j !== i)))
  }).length
}
