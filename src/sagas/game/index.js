import { all, fork, take } from 'redux-saga/effects'

import mapSaga from './map'
import movementPathSaga from './movementPath'
import startSaga from './start'

export default function* rootSaga() {
  yield all([
    fork(mapSaga),
    fork(movementPathSaga),
    fork(startSaga),
  ])
}
