import { createSelector } from 'reselect'

const getState = state => state.game.characters
const getId = (_, { id }) => id

export const getAllIds = createSelector(
  getState,
  state => state.allIds
)

export const getById = createSelector(
  getState,
  state => state.byId
)

export const getCharacters = createSelector(
  [getAllIds, getById],
  (allIds, byId) => allIds.map(id => byId[id])
)

export const getCharacterById = createSelector(
  [getState, getId],
  (characters, id) => characters.byId[id]
)
