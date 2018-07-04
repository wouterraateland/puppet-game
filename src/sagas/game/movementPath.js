import { delay } from 'redux-saga'
import { take, takeEvery, takeLatest, select, put, all } from 'redux-saga/effects'
import { createElementEventChannel } from 'utilities/sagas'

import * as MovementPath from 'ducks/game/movementPath'
import * as Map from 'ducks/game/map'

import { getMovementPath } from 'selectors/movementPath'
import { getGraph } from 'selectors/map'
import { getCurrent } from 'selectors/fighters'

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

export function* editMovementPath({ position }) {
  const path = yield select(getMovementPath)
  const graph = yield select(getGraph)
  const fighter = yield select(getCurrent)

  try {
    const newPath = getEditedPath(path, position, graph, fighter.properties.character.speed)
    yield put(MovementPath.editSuccess(newPath))
  } catch (e) {
    yield put(MovementPath.editFailure(e))
  }
}

export function* stopMovementPath(event) {
  const path = yield select(getMovementPath)
  const object = yield select(getCurrent)

  yield put(MovementPath.stop())
  yield put(Map.moveObject(object.id, path))
}

export function* listenForMouseUp() {
  const channel = createElementEventChannel(window, 'mouseup')
  yield take(channel)
  yield stopMovementPath()
}

export function* moveObject({ objectId, path }) {
  for (let position of path) {
    yield put(Map.moveObjectStep(objectId, position))
    yield delay(100)
  }
  yield put(Map.moveObjectComplete(objectId))
}

export function* movementPathSaga() {
  yield all([
    takeEvery(MovementPath.START, listenForMouseUp),
    takeEvery(MovementPath.EDIT.REQUEST, editMovementPath),
    takeEvery(Map.MOVE.REQUEST, moveObject)
  ])
}

export default movementPathSaga
