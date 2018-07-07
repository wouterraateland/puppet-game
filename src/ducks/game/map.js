import { combineReducers } from 'redux'
import { Vec3 } from 'utilities'
import { createAsyncActionType } from 'utilities/ducks'
import { createActions, handleActions } from 'redux-actions'

// Action types
export const LOAD_MAP = createAsyncActionType('LOAD_MAP')
export const MOVE = createAsyncActionType('MOVE', ['REQUEST', 'STEP', 'COMPLETE'])

// Action creators
export const {
  loadMapRequest,
  loadMapSuccess,
  loadMapFailure,
  moveRequest,
  moveStep,
  moveComplete
} = createActions(
  {},
  LOAD_MAP.REQUEST,
  LOAD_MAP.SUCCESS,
  LOAD_MAP.FAILURE,
  MOVE.REQUEST,
  MOVE.STEP,
  MOVE.COMPLETE
)

// Reducers
export const size = handleActions({
  [LOAD_MAP.SUCCESS]: (state, { payload: { size }}) => size
}, [])

export const tiles = handleActions({
  [LOAD_MAP.SUCCESS]: (state, { payload: { tiles }}) => tiles
    .reduce((tiles, row, y) => [
      ...tiles,
      ...row.reduce((acc, type, x) => type === 0
        ? acc
        : [
          ...acc,
          { type, position: new Vec3(x, y, 0) }
        ], [])
    ], []),
}, [])

export const byId = handleActions({
  [LOAD_MAP.SUCCESS]: (state, { payload: { objects }}) =>
    objects.reduce((acc, object) => ({
      ...acc,
      [object.id]: {
        ...object,
        position: new Vec3(...object.position, 0),
      }
    }), {}),
  [MOVE.STEP]: (state, { payload: { objectId, position }}) => ({
    ...state,
    [objectId]: {
      ...state[objectId],
      position,
      direction: getDirection(state[objectId].position, position)
    }
  })
}, {})

export const allIds = handleActions({
  [LOAD_MAP.SUCCESS]: (state, { payload: { objects }}) =>
    objects.map(object => object.id),
}, [])

export const objects = combineReducers({
  byId, allIds
})

export const reducer = combineReducers({
  size, tiles, objects
})

export default reducer

// Misc
const getDirection = (p1, p2) =>
  (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 2 / Math.PI + 4) % 4
