import { createSelector } from 'reselect'

import * as battle from 'selectors/battle'
import * as map from 'selectors/map'

export const get = createSelector(
  map.getMapObjects,
  objects => objects.filter(object => object.type === 0)
)

export const getSorted = createSelector(
  get,
  fighters => fighters.sort((a, b) =>
    b.properties.character.speed - a.properties.character.speed)
)

export const getCurrent = createSelector(
  [getSorted, battle.getCurrentTurn],
  (fighters, currentTurn) =>
    fighters[currentTurn % fighters.length]
)

export const getCurrentMovementOptions = createSelector(
  [getCurrent, map.getGraph, map.getMapTilePositions],
  (fighter, graph, tilePositions) =>
  fighter
    ? graph
      .getNodesInRange(
        tilePositions.find(fighter.position.equals),
        fighter.properties.character.speed)
    : []
)
