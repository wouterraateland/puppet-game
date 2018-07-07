import { createAsyncActionType } from 'utilities/ducks'
import { handleActions, createActions } from 'redux-actions'

// Action types
export const START_MOVEMENT_PATH = 'START_MOVEMENT_PATH'
export const EDIT_MOVEMENT_PATH = createAsyncActionType('EDIT_MOVEMENT_PATH')
export const STOP_MOVEMENT_PATH = 'STOP_MOVEMENT_PATH'

// Action creators
export const {
  startMovementPath,
  editMovementPathRequest,
  editMovementPathSuccess,
  editMovementPathFailure,
  stopMovementPath,
} = createActions(
  {},
  START_MOVEMENT_PATH,
  EDIT_MOVEMENT_PATH.REQUEST,
  EDIT_MOVEMENT_PATH.SUCCESS,
  EDIT_MOVEMENT_PATH.FAILURE,
  STOP_MOVEMENT_PATH
)

// Reducers
export const reducer = handleActions({
  START_MOVEMENT_PATH: (state, {payload}) => [payload],
  [EDIT_MOVEMENT_PATH.SUCCESS]: (state, {payload}) => payload,
  STOP_MOVEMENT_PATH: (state) => []
}, [])

export default reducer
