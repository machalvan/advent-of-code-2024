import '../utils.js'

export const part1 = input => {
  const lines = input.toLines()
  const W = 101
  const H = 103
  const QW = (W - 1) / 2
  const QH = (H - 1) / 2
  const ticks = 100

  let q1 = 0
  let q2 = 0
  let q3 = 0
  let q4 = 0
  for (const line of lines) {
    let [sx, sy, vx, vy] = line.getNums()

    let x = (sx + vx * ticks).mod(W)
    let y = (sy + vy * ticks).mod(H)

    if (x < QW && y < QH) q1++
    else if (x < QW && y > QH) q2++
    else if (x > QW && y < QH) q3++
    else if (x > QW && y > QH) q4++
  }

  return q1 * q2 * q3 * q4
}

export const part2 = input => {
  const lines = input.toLines()
  const W = 101
  const H = 103

  const pos = []
  const vel = []
  for (const line of lines) {
    let [sx, sy, vx, vy] = line.getNums()
    pos.push([sx, sy])
    vel.push([vx, vy])
  }

  // prettier-ignore
  const triangleShape = (x, y) => [
                            [x, y],
                [x-1, y+1], [x, y+1], [x+1, y+1],
    [x-2, y+2], [x-1, y+2], [x, y+2], [x+1, y+2], [x+2, y+2],
  ]

  let counter = 0
  while (true) {
    for (const [x, y] of pos) {
      let found = true
      for (const [tx, ty] of triangleShape(x, y)) {
        if (pos.every(([px, py]) => px !== tx || py !== ty)) {
          found = false
          break
        }
      }

      if (found) return counter
    }

    for (let i = 0; i < pos.length; i++) {
      let [px, py] = pos[i]
      let [vx, vy] = vel[i]

      let x = (px + vx).mod(W)
      let y = (py + vy).mod(H)

      pos[i] = [x, y]
    }

    counter++
  }
}
