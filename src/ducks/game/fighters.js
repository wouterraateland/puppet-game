import { combineReducers } from 'redux'
import { createReducer } from 'utilities/ducks'
import uuidv4 from 'uuid/v4'

import fighter from './fighter'

// Action types
export const SPAWN = 'fighters/SPAWN'

// Action creators
export const spawn = (character) => ({
  type: SPAWN,
  fighter: {
    id: uuidv4(),
    characterId: character.id,
    health: character.properties.health,
  },
})

// Reducers
export const byId = (state={}, action) => {
  switch (action.type) {
    case SPAWN:
      return {
        ...state,
        [action.fighter.id]: action.fighter
      }
    default:
      break;
  }

  if (action.type.startsWith('fighter/') && action.id) {
    return {
      ...state,
      [action.id]: fighter(state[action.id], action)
    }
  }

  return state
}

export const allIds = createReducer([], {
  [SPAWN]: (state, action) =>
    [...state, action.fighter.id],
})

export const reducer = combineReducers({
  byId, allIds
})

export default reducer
