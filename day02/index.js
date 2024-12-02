require('../utils')()

const part1 = input => {
  const safeReports = input.toLines().filter(line => {
    const nums = line.toNums()

    return (
      (JSON.stringify(nums) == JSON.stringify(nums.toSortedAsc()) ||
        JSON.stringify(nums) == JSON.stringify(nums.toSortedDesc())) &&
      nums.every((_, i, arr) => {
        if (i === 0) return true
        const diff = Math.abs(arr[i] - arr[i - 1])
        return 1 <= diff && diff <= 3
      })
    )
  })

  return safeReports.length
}

const part2 = input => {
  const safeReports = input.toLines().filter(line => {
    const nums = line.toNums()

    for (let i = -1; i < nums.length; i++) {
      const filteredNums = nums[i].filter((_, j) => j !== i)

      const isSafe =
        (JSON.stringify(filteredNums) ==
          JSON.stringify(filteredNums.toSortedAsc()) ||
          JSON.stringify(filteredNums) ==
            JSON.stringify(filteredNums.toSortedDesc())) &&
        filteredNums.every((_, i, arr) => {
          if (i === 0) return true
          const diff = Math.abs(arr[i] - arr[i - 1])
          return 1 <= diff && diff <= 3
        })

      if (isSafe) return true
    }

    return false
  })

  return safeReports.length
}

module.exports = { part1, part2 }
