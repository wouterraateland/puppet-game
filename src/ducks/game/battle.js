import { combineReducers } from 'redux'
import { createActions, handleActions } from 'redux-actions'

// import fighters from './fighters'

// Action types
export const START_BATTLE = 'START_BATTLE'
export const END_BATTLE = 'END_BATTLE'
export const END_TURN = 'END_TURN'
export const CHOSE_ACTION = 'CHOSE_ACTION'
export const EXECUTE_ACTION = 'EXECUTE_ACTION'
export const SET_POSSIBLE_LOCATIONS = 'SET_POSSIBLE_LOCATIONS'

// Action creators
export const {
  startBattle,
  endBattle,
  endTurn,
  choseAction,
  executeAction,
  setPossibleLocations,
} = createActions(
  {},
  START_BATTLE,
  END_BATTLE,
  END_TURN,
  CHOSE_ACTION,
  EXECUTE_ACTION,
  SET_POSSIBLE_LOCATIONS,
)

// Reducers
const currentTurn = handleActions({
  END_TURN: state => state + 1
}, 0)

const chosenAction = handleActions({
  END_TURN: () => null,
  CHOSE_ACTION: (_, {payload}) => payload,
  EXECUTE_ACTION: () => null,
}, null)

const executedActions = handleActions({
  END_TURN: () => [],
  EXECUTE_ACTION: (state, {payload}) => [...state, payload],
}, [])

const possibleLocations = handleActions({
  EXECUTE_ACTION: () => [],
  SET_POSSIBLE_LOCATIONS: (state, {payload}) => payload
}, [])

const reducer = combineReducers({
  currentTurn,
  chosenAction,
  executedActions,
  possibleLocations,
})

export default reducer
