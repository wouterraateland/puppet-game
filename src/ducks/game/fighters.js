import { combineReducers } from 'redux'
import { createAction, handleActions } from 'redux-actions'
import uuidv4 from 'uuid/v4'

import fighter from './fighter'

// Action types
export const SPAWN_FIGHTER = 'SPAWN_FIGHTER'

// Action creators
export const spawnFighter = createAction(SPAWN_FIGHTER, ({character, ...rest}) => ({
  id: uuidv4(),
  health: character.health,
  character,
  ...rest
}))

// Reducers
export const byId = (state={}, action) => {
  switch (action.type) {
    case SPAWN_FIGHTER:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    default:
      break;
  }

  if (action.type.startsWith('fighter/') && action.payload.id) {
    return {
      ...state,
      [action.payload.id]: fighter(state[action.payload.id], action)
    }
  }

  return state
}

export const allIds = handleActions({
  SPAWN_FIGHTER: (state, action) =>
    [...state, action.payload.id],
}, [])

export const reducer = combineReducers({
  byId, allIds
})

export default reducer
