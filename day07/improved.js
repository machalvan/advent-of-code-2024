import '../utils.js'

const isValid = (first, rest) => {
  const r0 = rest[0]
  const r1 = rest[1]
  const rn = rest.slice(2)

  if (r0 === undefined || r1 === undefined) {
    return first === r0
  } else if (isValid(first, [r0 + r1].concat(rn))) {
    return true
  } else if (isValid(first, [r0 * r1].concat(rn))) {
    return true
  }

  return false
}

const isValid2 = (first, rest) => {
  const r0 = rest[0]
  const r1 = rest[1]
  const rn = rest.slice(2)

  if (r0 === undefined || r1 === undefined) {
    return first === r0
  } else if (isValid2(first, [r0 + r1].concat(rn))) {
    return true
  } else if (isValid2(first, [r0 * r1].concat(rn))) {
    return true
  } else if (isValid2(first, [+('' + r0 + r1)].concat(rn))) {
    return true
  }

  return false
}

export const part1 = input => {
  let sum = 0

  for (const line of input.toLines()) {
    const [first, ...rest] = line.getNums()

    if (isValid(first, rest)) {
      sum += first
    }
  }

  return sum
}

export const part2 = input => {
  let sum = 0

  for (const line of input.toLines()) {
    const [first, ...rest] = line.getNums()

    if (isValid2(first, rest)) {
      sum += first
    }
  }

  return sum
}
