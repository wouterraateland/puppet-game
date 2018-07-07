import { createSelector } from 'reselect'

import * as battle from 'selectors/battle'
import * as map from 'selectors/map'

export const getFighters = createSelector(
  map.getMapObjects,
  objects => objects.filter(object => object.type === 0)
)

export const getFightersSorted = createSelector(
  getFighters,
  fighters => fighters.sort((a, b) =>
    b.properties.character.speed - a.properties.character.speed)
)

export const getFighterCharactersSorted = createSelector(
  getFightersSorted,
  fighters => fighters.map(fighter => fighter.properties.character)
)

export const getCurrentFighter = createSelector(
  [getFightersSorted, battle.getCurrentTurn],
  (fighters, currentTurn) =>
    fighters[currentTurn % fighters.length]
)

export const getCurrentMovementOptions = createSelector(
  [getCurrentFighter, map.getGraph, map.getMapTilePositions],
  (fighter, graph, tilePositions) =>
  fighter
    ? graph
      .getNodesInRange(
        tilePositions.find(fighter.position.equals),
        fighter.properties.character.speed)
    : []
)
