import { combineReducers } from 'redux'
import { Vec3 } from 'utilities'
import { createAsyncActionType, createReducer } from 'utilities/ducks'

// Misc
const getDirection = (p1, p2) =>
  (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 2 / Math.PI + 4) % 4

// Action types
export const LOAD = createAsyncActionType('map/LOAD')
export const MOVE = createAsyncActionType('map/MOVE', ['REQUEST', 'STEP', 'COMPLETE'])

// Action creators
export const load = (mapName) => ({
  type: LOAD.REQUEST,
  mapName,
})

export const loadSuccessfull = (size, tiles, objects) => ({
  type: LOAD.SUCCESS,
  size, tiles, objects,
})

export const moveObject = (objectId, path) => ({
  type: MOVE.REQUEST,
  objectId, path,
})

export const moveObjectStep = (objectId, position) => ({
  type: MOVE.STEP,
  objectId, position,
})

export const moveObjectComplete = (objectId) => ({
  type: MOVE.COMPLETE,
  objectId,
})

// Reducers
export const size = createReducer([], {
  [LOAD.SUCCESS]: (state, { size }) => size
})

export const tiles = createReducer([], {
  [LOAD.SUCCESS]: (state, { tiles }) => tiles
    .reduce((tiles, row, y) => [
      ...tiles,
      ...row.reduce((acc, type, x) => type === 0
        ? acc
        : [
          ...acc,
          { type, position: new Vec3(x, y, 0) }
        ], [])
    ], []),
})

export const byId = createReducer({}, {
  [LOAD.SUCCESS]: (state, { objects }) =>
    objects.reduce((acc, object) => ({
      ...acc,
      [object.id]: {
        ...object,
        position: new Vec3(...object.position, 0),
      }
    }), {}),
  [MOVE.STEP]: (state, { objectId, position }) => ({
    ...state,
    [objectId]: {
      ...state[objectId],
      position,
      direction: getDirection(state[objectId].position, position)
    }
  })
})

export const allIds = createReducer([], {
  [LOAD.SUCCESS]: (state, { objects }) =>
    objects.map(object => object.id),
})

export const objects = combineReducers({
  byId, allIds
})

export const reducer = combineReducers({
  size, tiles, objects
})

export default reducer
