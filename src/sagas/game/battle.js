import { take, call, select, put, race } from 'redux-saga/effects'

import * as Battle from 'ducks/game/battle'
import * as Hud from 'ducks/game/hud'
import * as Fighter from 'ducks/game/fighter'

import { getCurrentFighter, isBattleOver } from 'selectors/battle'

function* playerTurnSaga(fighter) {
  yield put(Hud.showPlayerControls())

  while (true) {
    const {move, action, end} = yield race({
      move:   take(Fighter.MOVE),
      action: take(Fighter.ACT),
      end:    take(Battle.TURN_END),
    })

    if (end) { return true }
  }
}

export function* fighterTurnSaga(fighter) {
  if (fighter.isComputer) {
    yield console.log('computer is playing')
  } else {
    yield console.log('player is playing')
    yield call(playerTurnSaga, fighter)
  }
}

export function* battleSaga() {
  while(true) {
    const fighter = yield select(getCurrentFighter)
    console.log(fighter)

    yield call(fighterTurnSaga, fighter)

    const battleOver = yield select(isBattleOver)

    if (battleOver) { return true }
  }
}

export default battleSaga
