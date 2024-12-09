import '../utils.js'

export const part1 = input => {
  const nums = input.toList().toNums()

  let disk = []
  let count = 0
  for (const [i, num] of nums.entries()) {
    const isOcc = i % 2 === 0
    if (isOcc) count += num
    disk.push(...Array.from({ length: num }, _ => (isOcc ? i / 2 : undefined)))
  }

  let sum = 0
  for (let i = 0; i < count; i++) {
    let cur = disk[i]

    while (cur === undefined) {
      cur = disk.pop()
    }

    sum += cur * i
  }

  return sum
}

export const part2 = input => {
  const nums = input.split('').map(n => parseInt(n))

  let free = []
  let occ = []
  let startIndex = 0
  for (const [i, num] of nums.entries()) {
    if (num === 0) continue

    if (i % 2 === 0) {
      occ.push([startIndex, num, i / 2])
    } else {
      free.push([startIndex, num])
    }

    startIndex += num
  }

  let sum = 0
  while (occ.length > 0) {
    let [index, count, value] = occ.pop()

    let i = 0
    while (i < free.length && free[i][0] < index) {
      const [fIndex, space] = free[i]

      if (space >= count) {
        index = fIndex
        free[i] = [fIndex + count, space - count]
        break
      }

      i++
    }

    const start = index * value
    const end = (index + count - 1) * value

    sum += ((start + end) * count) / 2
  }

  return sum
}
