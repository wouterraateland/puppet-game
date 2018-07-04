import { createSelector } from 'reselect'

import * as characters from 'selectors/characters'
import * as map from 'selectors/map'

const isAlly = fighter => fighter.isAlly
const isOpponent = fighter => !fighter.isAlly

export const getBattle = state => state.game.battle
export const getCurrentTurn = state => state.game.battle.currentTurn
export const getFightersById = state => state.game.battle.fighters.byId
export const getAllFightersIds = state => state.game.battle.fighters.allIds

export const getFighters = createSelector(
  [getFightersById, getAllFightersIds],
  (byId, allIds) => allIds
    .map(id => byId[id])
)

export const getFightersWithCharacters = createSelector(
  [getFighters, characters.getById],
  (fighters, charactersById) => fighters.map(f => ({
    ...f,
    character: charactersById[f.characterId]
  }))
)

export const getFightersSorted = createSelector(
  [getFightersWithCharacters],
  (fighters) => fighters
    .sort((f1, f2) => f2.character.stats.speed - f1.character.stats.speed)
)

export const getCurrentFighter = createSelector(
  [getFightersSorted, getCurrentTurn],
  (fighters, currentTurn) => fighters.length
    ? fighters[currentTurn % fighters.length]
    : null
)

export const getCurrentFighterMovementOptions = createSelector(
  [getCurrentFighter, map.getGraph, map.getMapTilePositions],
  (fighter, graph, tilePositions) =>
  fighter
    ? graph
      .getNodesInRange(
        tilePositions.findIndex(fighter.position.equals),
        fighter.character.stats.speed)
    : []
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
