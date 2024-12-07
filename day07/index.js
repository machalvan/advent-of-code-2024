import '../utils.js'

function countInBinary(bits) {
  const maxNumber = Math.pow(2, bits)

  let res = []
  for (let i = 0; i < maxNumber; i++) {
    res.push(
      i
        .toString(2)
        .padStart(bits, '0')
        .replace(/0/g, '+')
        .replace(/1/g, '*')
        .split('')
    )
  }

  return res
}

function countInTernary(bits) {
  const maxNumber = Math.pow(3, bits)

  let res = []
  for (let i = 0; i < maxNumber; i++) {
    res.push(
      i
        .toString(3)
        .padStart(bits, '0')
        .replace(/0/g, '+')
        .replace(/1/g, '*')
        .replace(/2/g, '|')
        .split('')
    )
  }

  return res
}

export const part1 = input => {
  const lines = input.toLines().map(line => line.getNums())

  let sum = 0
  for (const line of lines) {
    const first = line.shift()
    const ops = countInBinary(line.length - 1)

    for (const op of ops) {
      let res = line[0]
      for (let i = 0; i < op.length; i++) {
        res = eval(`${res} ${op[i]} ${line[i + 1]}`)
      }

      if (res === first) {
        sum += first
        break
      }
    }
  }

  return sum
}

export const part2 = input => {
  const lines = input.toLines().map(line => line.getNums())

  let sum = 0
  for (const line of lines) {
    const first = line.shift()
    const ops = countInTernary(line.length - 1)

    for (const op of ops) {
      let res = line[0]
      for (let i = 0; i < op.length; i++) {
        if (op[i] === '|') {
          res += line[i + 1].toString()
          res = +res
        } else {
          res = eval(res + op[i] + line[i + 1])
        }
      }

      if (res === first) {
        sum += first
        break
      }
    }
  }

  return sum
}
