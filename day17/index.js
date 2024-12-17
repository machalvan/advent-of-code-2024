import '../utils.js'

export const part1 = input => {
  const lines = input.toLines()
  let [A, B, C, _, ops] = lines
  A = A.getNums()[0]
  B = B.getNums()[0]
  C = C.getNums()[0]
  ops = ops.getNums()

  let getCombo = num => ({ 4: A, 5: B, 6: C }[num] ?? num)

  let i = 0
  let out = ''
  while (i < ops.length) {
    const [opcode, operand] = ops.slice(i, i + 2)

    if (opcode === 0) A = Math.trunc(A / 2 ** getCombo(operand))
    if (opcode === 1) B ^= operand
    if (opcode === 2) B = getCombo(operand).mod(8)
    if (opcode === 3) i = A !== 0 ? operand - 2 : i
    if (opcode === 4) B ^= C
    if (opcode === 5) out += (out ? ',' : '') + getCombo(operand).mod(8)
    if (opcode === 6) B = Math.trunc(A / 2 ** getCombo(operand))
    if (opcode === 7) C = Math.trunc(A / 2 ** getCombo(operand))

    i += 2
  }

  return out
}

export const part2 = input => {
  const lines = input.toLines()
  let [A, B, C, _, ops] = lines
  A = A.getNums()[0]
  B = B.getNums()[0]
  C = C.getNums()[0]
  ops = ops.getNums()
  let program = ops.join(',')

  let getCombo = num => ({ 4: A, 5: B, 6: C }[num] ?? num)

  let guess = 0
  while (true) {
    A = guess

    let out = ''
    let i = 0
    while (i < ops.length) {
      const [opcode, operand] = ops.slice(i, i + 2)

      if (opcode === 0) A = Math.trunc(A / 2 ** getCombo(operand))
      if (opcode === 1) B ^= operand
      if (opcode === 2) B = getCombo(operand).mod(8)
      if (opcode === 3) i = A !== 0 ? operand - 2 : i
      if (opcode === 4) B ^= C
      if (opcode === 5) out += (out ? ',' : '') + getCombo(operand).mod(8)
      if (opcode === 6) B = Math.trunc(A / 2 ** getCombo(operand))
      if (opcode === 7) C = Math.trunc(A / 2 ** getCombo(operand))

      i += 2
    }

    if (out === program) return guess

    if (program.endsWith(out)) guess *= 8

    guess++
  }
}
