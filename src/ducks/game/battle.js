import { combineReducers } from 'redux'
import { createReducer } from 'utilities/ducks'

import fighters from './fighters'

// Action types
export const START = 'battle/START'
export const END = 'battle/END'
export const TURN_END = 'battle/TURN_END'

// Action creators
export const endTurn = () => ({
  type: TURN_END,
})

// Reducers
const currentTurn = createReducer(0, {
  [TURN_END]: state => state + 1
})

const reducer = combineReducers({
  currentTurn, fighters
})

export default reducer
