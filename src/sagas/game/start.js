import { put, takeEvery } from 'redux-saga/effects'

import * as Battle from 'ducks/game/battle'
import * as Map from 'ducks/game/map'

import battleSaga from './battle'

function* startSaga() {
  yield put(Map.load('test'))
  takeEvery(Battle.START, battleSaga)
}

export default startSaga
