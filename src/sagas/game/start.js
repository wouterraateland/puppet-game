import { put, takeEvery } from 'redux-saga/effects'

import { START_BATTLE } from 'ducks/game/battle'
import { loadMapRequest } from 'ducks/game/map'

import battleSaga from './battle'

function* startSaga() {
  yield put(loadMapRequest('test'))
  yield takeEvery(START_BATTLE, battleSaga)
}

export default startSaga
