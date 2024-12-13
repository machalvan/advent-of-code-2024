import '../utils.js'

const getScore = (xMulA, yMulA, xMulB, yMulB, x, y) => {
  let A = (yMulB * x - xMulB * y) / (yMulB * xMulA - xMulB * yMulA)
  let B = (y - yMulA * A) / yMulB

  return A % 1 === 0 && B % 1 === 0 ? A * 3 + B : 0
}

export const part1 = input => {
  const blocks = input.toBlocks()

  let sum = 0
  for (const block of blocks) {
    let [buttonA, buttonB, price] = block
    let [xMulA, yMulA] = buttonA.getNums()
    let [xMulB, yMulB] = buttonB.getNums()
    let [x, y] = price.getNums()

    sum += getScore(xMulA, yMulA, xMulB, yMulB, x, y)
  }

  return sum
}

export const part2 = input => {
  const blocks = input.toBlocks()

  let sum = 0
  for (const block of blocks) {
    let [buttonA, buttonB, price] = block
    let [xMulA, yMulA] = buttonA.getNums()
    let [xMulB, yMulB] = buttonB.getNums()
    let [x, y] = price.getNums()
    x += 10000000000000
    y += 10000000000000

    sum += getScore(xMulA, yMulA, xMulB, yMulB, x, y)
  }

  return sum
}
