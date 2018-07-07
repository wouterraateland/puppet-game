import { delay } from 'redux-saga'
import { take, takeEvery, select, put, all } from 'redux-saga/effects'
import { createElementEventChannel } from 'utilities/sagas'

import {
  START_MOVEMENT_PATH,
  EDIT_MOVEMENT_PATH,
  editMovementPathFailure,
  editMovementPathSuccess,
  stopMovementPath } from 'ducks/game/movementPath'
import * as Map from 'ducks/game/map'

import { getMovementPath } from 'selectors/movementPath'
import { getGraph } from 'selectors/map'
import { getCurrentFighter } from 'selectors/battle'

const getEditedPath = (path, position, graph, speed) => {
  if (!path.length) {
    throw Error('Path not started yet')
  }

  const i = path.indexOf(position)
  if (i !== -1) {
    return path.slice(0, i + 1)
  } else {
    const newPath = [
      ...path.slice(0, path.length - 1),
      ...graph.getShortestPath(path[path.length - 1], position)
    ]

    return graph.weighPath(newPath) <= speed
      ? newPath
      : graph.getShortestPath(path[0], position)
  }
}

export function* editMovementPath(action) {
  const path = yield select(getMovementPath)
  const graph = yield select(getGraph)
  const fighter = yield select(getCurrentFighter)

  try {
    const newPath = getEditedPath(path, action.payload, graph, fighter.properties.character.speed)
    yield put(editMovementPathSuccess(newPath))
  } catch (e) {
    yield put(editMovementPathFailure(e))
  }
}

export function* stop(event) {
  const path = yield select(getMovementPath)
  const object = yield select(getCurrentFighter)

  yield put(stopMovementPath())
  yield put(Map.moveRequest({ objectId: object.id, path }))
}

export function* listenForMouseUp() {
  const channel = createElementEventChannel(window, 'mouseup')
  yield take(channel)
  yield stop()
}

export function* moveObject({payload: { objectId, path }}) {
  for (let position of path) {
    yield put(Map.moveStep({objectId, position}))
    yield delay(100)
  }
  yield put(Map.moveComplete(objectId))
}

export function* movementPathSaga() {
  yield all([
    takeEvery(START_MOVEMENT_PATH, listenForMouseUp),
    takeEvery(EDIT_MOVEMENT_PATH.REQUEST, editMovementPath),
    takeEvery(Map.MOVE.REQUEST, moveObject)
  ])
}

export default movementPathSaga
