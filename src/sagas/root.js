import { all, fork } from 'redux-saga/effects'

import windowSaga from 'sagas/window'
import gameSaga from 'sagas/game'

export default function* rootSaga() {
  yield all([
    fork(windowSaga),
    fork(gameSaga),
  ])
}
