import { createSelector } from 'reselect'

import { DirectedGraph, Node } from 'utilities'

const isNeighbour = (tile) => ({ position }) =>
  (position.x === tile.position.x && Math.abs(position.y - tile.position.y) === 1) ||
  (position.y === tile.position.y && Math.abs(position.x - tile.position.x) === 1)

const getMap = state => state.game.map
const getPosition = (_, { position }) => position

export const getMapSize = createSelector(
  getMap,
  map => map.size
)

export const getMapTiles = createSelector(
  getMap,
  map => map.tiles
)

export const getMapTilePositions = createSelector(
  getMapTiles,
  tiles => tiles.map(tile => tile.position)
)

export const getMapObjects = createSelector(
  getMap,
  map => map.objects.allIds.map(id => map.objects.byId[id])
)

export const getMapObjectPositions = createSelector(
  getMapObjects,
  objects => objects.map(object => object.position)
)

export const getGraph = createSelector(
  [getMapTilePositions, getMapObjectPositions],
  (tilePositions, objectPositions) => {
    const nodes = tilePositions.map(position => new Node(position))
    tilePositions.forEach((position, i) => {
      const neighbours = tilePositions.reduce((acc, pos2, j) =>
        (
          position.distance(pos2) === 1 &&
          !objectPositions.find(pos2.equals)
        ) ? [...acc, j] : acc, [])

      neighbours.forEach(j => nodes[i].addEdge(nodes[j], 1))
    })

    return new DirectedGraph(nodes)
  }
)

export const getCharactersOnMap = createSelector(
  getMapObjects,
  objects => objects.filter(object => object.type === 0)
)

export const getConnectedTiles = createSelector(
  [getMapTiles, getPosition],
  (tiles, position) => tiles.filter(isNeighbour({position}))
)

export const getConnectedSides = createSelector(
  [getConnectedTiles, getPosition],
  (tiles, pos) => tiles.reduce((acc, { position }) => {
    if (position.x === pos.x) {
      if (position.y - pos.y ===  1) { return {...acc, bottom: true } }
      if (position.y - pos.y === -1) { return {...acc, top: true } }
    }
    if (position.y === pos.y) {
      if (position.x - pos.x ===  1) { return {...acc, right: true } }
      if (position.x - pos.x === -1) { return {...acc, left: true } }
    }
    return acc
  }, { left: false, top: false, right: false, bottom: false })
)
