import { createAsyncActionType, createReducer } from 'utilities/ducks'

// Action types
export const START = 'movementPath/START'
export const EDIT = createAsyncActionType('movementPath/EDIT')
export const STOP = 'movementPath/STOP'

// Action creators
export const start = (position) => ({
  type: START,
  position,
})

export const edit = (position) => ({
  type: EDIT.REQUEST,
  position,
})

export const editSuccess = (path) => ({
  type: EDIT.SUCCESS,
  path
})

export const editFailure = (error) => ({
  type: EDIT.FAILURE,
  error
})

export const stop = () => ({
  type: STOP,
})

// Reducers
export const reducer = createReducer([], {
  [START]: (state, {position}) => [position],
  [EDIT.SUCCESS]: (state, {path}) => path,
  [STOP]: (state) => []
})

export default reducer
