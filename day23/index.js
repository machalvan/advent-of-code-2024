import '../utils.js'

export const part1 = input => {
  const lines = input.toLines()

  let graph = {}
  for (const line of lines) {
    let [n0, n1] = line.split('-')
    graph[n0] = (graph[n0] ?? []).concat(n1)
    graph[n1] = (graph[n1] ?? []).concat(n0)
  }

  let sum = 0
  let found = new Set()
  for (const n0 of Object.keys(graph)) {
    for (const n1 of graph[n0]) {
      for (const n2 of graph[n1]) {
        for (const n3 of graph[n2]) {
          let key = [n0, n1, n2].toSortedAsc().join()
          let hasT = [n0, n1, n2].some(n => n.startsWith('t'))

          if (n3 === n0 && !found.has(key) && hasT) {
            sum++
            found.add(key)
          }
        }
      }
    }
  }

  return sum
}

export const part2 = input => {
  const lines = input.toLines()

  let graph = {}
  for (const line of lines) {
    let [n0, n1] = line.split('-')
    graph[n0] = (graph[n0] ?? []).concat(n1)
    graph[n1] = (graph[n1] ?? []).concat(n0)
  }

  const dp = {}
  const getMaxClique = (node, clique = []) => {
    if (clique.includes(node)) return clique

    let key = `${node} ${clique.toSortedAsc().join('-')}`
    if (dp[key]) return dp[key]

    let newClique = clique
    if (clique.every(n => graph[n].includes(node))) {
      for (const newNode of graph[node]) {
        const cand = getMaxClique(newNode, clique.concat(node))

        if (cand.length > newClique.length) {
          newClique = cand
        }
      }
    }

    dp[key] = newClique
    return newClique
  }

  let maxClique = []
  for (const node of Object.keys(graph)) {
    let cand = getMaxClique(node)

    if (cand.length > maxClique.length) {
      maxClique = cand
    }
  }

  return maxClique.toSortedAsc().join(',')
}
