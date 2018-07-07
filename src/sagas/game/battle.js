import { take, call, select, put } from 'redux-saga/effects'

import { CHOSE_ACTION, setPossibleLocations, executeAction, endTurn } from 'ducks/game/battle'
import { MOVE } from 'ducks/game/map'

import { getCurrentFighter, isBattleOver, getCurrentMovementOptions } from 'selectors/battle'

function* playerTurnSaga(fighter) {
  while (true) {
    const action = yield take(CHOSE_ACTION)

    switch (action.payload) {
      case 'MOVE':
        const locations = yield select(getCurrentMovementOptions)
        yield put(setPossibleLocations(locations))
        yield take(MOVE.COMPLETE)
        yield put(executeAction('MOVE'))
        break
      case 'ACT':
        yield put(executeAction('ACT'))
        break
      case 'END_TURN':
        yield put(executeAction())
        yield put(endTurn())
        return
      default:
        yield put(executeAction())
    }
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
  let battleOver = false
  while (!battleOver) {
    const fighter = yield select(getCurrentFighter)
    console.log(fighter)

    yield call(fighterTurnSaga, fighter)

    // battleOver = yield select(isBattleOver)
  }
}

export default battleSaga
