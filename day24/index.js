import '../utils.js'

const ops = { AND: '&', OR: '|', XOR: '^' }

export const part1 = input => {
  let blocks = input.toBlocks()
  let [init, connections] = blocks

  let wires = {}
  for (let line of init) {
    let [key, val] = line.split(': ')
    wires[key] = +val
  }

  connections = connections.map(c => c.split(' '))

  while (connections.length > 0) {
    let c = connections.shift()
    let [a, op, b, _, out] = c
    op = ops[op]

    if (wires[a] !== undefined && wires[b] !== undefined) {
      wires[out] = eval(`(${wires[a]} ${op} ${wires[b]})`)
    } else {
      connections.push(c)
    }
  }

  let zs = []
  for (const [key, val] of Object.entries(wires)) {
    if (key.startsWith('z')) {
      zs.push([key, val])
    }
  }

  return zs
    .toSorted((a, b) => b[0].localeCompare(a[0]))
    .map(z => z[1])
    .join('')
    .toDec()
}

export const part2 = input => {
  let blocks = input.toBlocks()
  let [init, connections] = blocks

  let bits = Math.round(init.length / 2)
  connections = connections.map(c => c.split(' '))

  let map = {}
  for (const [a, op, b, _, out] of connections) {
    map[out] = [a, ops[op], b]
  }

  let keys = connections.map(c => c.at(-1))
  let zKeys = keys.filter(out => out.startsWith('z')).toSortedAsc()

  let initMap = { ...map }
  let tempMap = { ...map }
  let N = 100
  let maxTargetIndex = 0
  let swaps = 0

  while (swaps !== 4) {
    let matches = Array(bits + 1).fill(0)

    for (let n = 0; n < N; n++) {
      let ranX = ''
      for (let i = 0; i < bits; i++) {
        ranX += Math.random() > 0.5 ? 1 : 0
      }

      let ranY = ''
      for (let i = 0; i < bits; i++) {
        ranY += Math.random() > 0.5 ? 1 : 0
      }

      let ranExpected = (parseInt(ranX, 2) + parseInt(ranY, 2)).toString(2)

      let wires = {}
      for (let i = 0; i < bits; i++) {
        const xKey = `x${i <= 9 ? 0 : ''}${i}`
        const yKey = `y${i <= 9 ? 0 : ''}${i}`

        wires[xKey] = +ranX.at(-i - 1)
        wires[yKey] = +ranY.at(-i - 1)
      }

      const getVal = key => {
        let [a, op, b] = tempMap[key]

        let A = wires[a]
        let B = wires[b]

        if (A === undefined) A = getVal(a)
        if (B === undefined) B = getVal(b)

        return eval(`(${A} ${op} ${B})`)
      }

      for (let i = 0; i < ranExpected.length; i++) {
        const z = `z${i <= 9 ? '0' : ''}${i}`
        const expectedBit = +ranExpected.at(-i - 1)
        const actualBit = getVal(z)

        matches[i] += expectedBit === actualBit
      }
    }

    let targetIndex = matches.findIndex(m => m < N)

    if (targetIndex > maxTargetIndex && maxTargetIndex > 0) {
      map = { ...tempMap }
      maxTargetIndex = targetIndex
      swaps++
    }

    maxTargetIndex = Math.max(maxTargetIndex, targetIndex)

    const getNodes = key => {
      let [a, _, b] = map[key]

      let aIsXorY = a.startsWith('x') || a.startsWith('y')
      let bIsXorY = b.startsWith('x') || b.startsWith('y')

      if (aIsXorY && bIsXorY) return []
      if (aIsXorY) return [b, ...getNodes(b)]
      if (bIsXorY) return [a, ...getNodes(a)]

      return [a, b, ...getNodes(a), ...getNodes(b)]
    }

    let gatesIntroduced = {}
    let added = new Set()
    for (const key of zKeys) {
      const nodes = getNodes(key)
      gatesIntroduced[key] = [key]

      for (const node of nodes) {
        if (!added.has(node)) {
          added.add(node)
          gatesIntroduced[key].push(node)
        }
      }
    }

    let gatesIntroducedOrHigher = {}
    let prev = []
    for (let i = zKeys.length - 1; i >= 0; i--) {
      let key = zKeys[i]
      let gi = gatesIntroduced[key]
      gatesIntroducedOrHigher[key] = [...new Set([...prev, ...gi])]
      prev = gatesIntroducedOrHigher[key]
    }

    let targetKey = `z${maxTargetIndex <= 9 ? 0 : ''}${maxTargetIndex}`
    let targetNodes = gatesIntroduced[targetKey]
    let targetNodes2 = gatesIntroducedOrHigher[targetKey]

    let banned = {}
    for (const key of keys) {
      const nodes = getNodes(key)
      banned[key] = new Set(nodes)
    }

    let ranSwapKey = targetNodes[Math.floor(Math.random() * targetNodes.length)]
    let ranSwapKey2 =
      targetNodes2[Math.floor(Math.random() * targetNodes2.length)]

    while (
      ranSwapKey === ranSwapKey2 ||
      banned[ranSwapKey].has(ranSwapKey2) ||
      banned[ranSwapKey2].has(ranSwapKey)
    ) {
      ranSwapKey = targetNodes[Math.floor(Math.random() * targetNodes.length)]
      ranSwapKey2 =
        targetNodes2[Math.floor(Math.random() * targetNodes2.length)]
    }

    tempMap = {
      ...map,
      [ranSwapKey]: map[ranSwapKey2],
      [ranSwapKey2]: map[ranSwapKey]
    }
  }

  let swapped = []
  for (const key of keys) {
    if (!initMap[key].equals(map[key])) {
      swapped.push(key)
    }
  }

  return swapped.toSortedAsc().join(',')
}
