import { createSelector } from 'reselect'

import * as map from 'selectors/map'

const prop = (_,x) => x

const isAlly = fighter => fighter.team === 0
const isOpponent = fighter => !fighter.team !== 0

export const getBattle = state => state.game.battle
export const getCurrentTurn = state => state.game.battle.currentTurn
export const getPossibleLocations = state => state.game.battle.possibleLocations
export const getExecutedActions = state => state.game.battle.executedActions

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
  [getFightersSorted, getCurrentTurn],
  (fighters, currentTurn) =>
    fighters[currentTurn % fighters.length]
)

export const isCurrentFighter = createSelector(
  [getCurrentFighter, prop],
  (fighter, id) => fighter.id === id
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

export const isActionExecuted = createSelector(
  [getExecutedActions,prop],
  (executedActions, action) => executedActions.includes(action)
)

export const getAllies = createSelector(
  getFighters,
  players => players.filter(isAlly)
)

export const getOpponents = createSelector(
  getBattle,
  players => players.filter(isOpponent)
)

export const isBattleWon = createSelector(
  getOpponents,
  opponents => opponents.all(opponent => opponent.health <= 0)
)

export const isBattleLost = createSelector(
  getAllies,
  allies => allies.all(ally => ally.health <= 0)
)

export const isBattleOver = createSelector(
  [isBattleWon, isBattleLost],
  (won, lost) => won || lost
)
