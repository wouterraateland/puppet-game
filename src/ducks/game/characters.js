import { combineReducers } from 'redux'
import { createReducer } from 'utilities/ducks'
import uuidv4 from 'uuid/v4'

// Action types
export const CREATE = 'characters/CREATE'
export const UPDATE = 'characters/UPDATE'
export const REMOVE = 'characters/REMOVE'

// Action creators
export const create = (stats) => ({
  type: CREATE,
  character: {
    id: uuidv4(),
    stats
  }
})

export const update = (character) => ({
  type: UPDATE,
  character,
})

export const remove = (character) => ({
  type: REMOVE,
  character,
})

// Reducers
const byId = createReducer({}, {
  [CREATE]: (state, action) => ({
    ...state,
    [action.character.id]: action.character
  }),
  [UPDATE]: (state, action) => ({
    ...state,
    [action.character.id]: action.character
  }),
  [REMOVE]: (state, action) => {
    const { [action.character.id]: _, ...rest } = state
    return rest
  }
})

export const allIds = createReducer([], {
  [CREATE]: (state, action) =>
    [...state, action.character.id],
  [REMOVE]: (state, action) =>
    state.filter(id => id !== action.character.id),
})

export const reducer = combineReducers({
  byId, allIds
})

export default reducer
