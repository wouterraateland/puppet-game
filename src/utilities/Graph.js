import PriorityQueue from 'priorityqueue'

export class DirectedGraph {
  constructor(nodes) {
    this.nodes = nodes
  }

  getNodeByLabel(label) {
    return this.nodes.find(node => node.label.equals(label))
  }

  getNodesInRange(startLabel, maxDist) {
    const startNode = this.getNodeByLabel(startLabel)

    if (!startNode) {
      console.error(`Non-existent label in graph: ${startLabel}`)
      return []
    }

    const visited = new Set()
    const distance = new Map()

    for (let node of this.nodes) { distance.set(node, Infinity) }
    distance.set(startNode, 0)

    const todo = new PriorityQueue({
      comparator: (a, b) => distance.get(b) - distance.get(a)
    })
    todo.enqueue(startNode)

    while (todo.length) {
      const node = todo.dequeue()

      if (visited.has(node)) { continue }
      visited.add(node)

      for (let edge of node.edges) {
        const d = distance.get(node) + edge.weight
        if (!visited.has(edge.to) &&
            d <= maxDist &&
            d < distance.get(edge.to)) {
          distance.set(edge.to, d)
          todo.enqueue(edge.to)
        }
      }
    }

    return Array.of(...visited).map(node => node.label)
  }

  getShortestPath(startLabel, endLabel) {
    const startNode = this.getNodeByLabel(startLabel)
    const endNode = this.getNodeByLabel(endLabel)

    if (!startNode || !endNode) {
      if (!startNode)
        console.error(`Non-existent label in graph: ${startLabel}`)
      if (!endNode)
        console.error(`Non-existent label in graph: ${endLabel}`)
      return []
    }

    const visited = new Set()
    const predecessors = new Map()

    const distance = new Map()
    for (let node of this.nodes) { distance.set(node, Infinity) }
    distance.set(startNode, 0)

    const todo = new PriorityQueue({
      comparator: (a, b) => distance.get(b) - distance.get(a)
    })
    todo.enqueue(startNode)

    while (todo.length) {
      const node = todo.dequeue()

      if (node === endNode) { break }
      if (visited.has(node)) { continue }
      visited.add(node)

      for (let edge of node.edges) {
        const d = distance.get(node) + edge.weight
        if (!visited.has(edge.to) &&
            d < distance.get(edge.to)) {
          predecessors.set(edge.to, edge.from)
          distance.set(edge.to, d)
          todo.enqueue(edge.to)
        }
      }
    }

    let path = [endNode]
    while (path[0] !== startNode) {
      path = [predecessors.get(path[0]), ...path]
      if (path[0] === undefined) { break; }
    }

    return path.map(node => node.label)
  }

  weighPath(path) {
    const nodes = path.map(pos => this.getNodeByLabel(pos))
    let weight = 0
    for (let i = 0; i < nodes.length - 1; i++) {
      const edge = nodes[i].edges.find(edge => edge.to === nodes[i + 1])
      if (edge) {
        weight += edge.weight
      } else {
        return Infinity
      }
    }
    return weight
  }
}

export class Node {
  constructor(label) {
    this.label = label
    this.edges = []
  }

  addEdge(to, weight) {
    this.edges.push(new Edge(this, to, weight))
  }
}

export class Edge {
  constructor(from, to, weight) {
    this.from = from
    this.to = to
    this.weight = weight
  }
}

export default DirectedGraph
