import { takeLatest, put, call } from 'redux-saga/effects'
import uuidv4 from 'uuid/v4'

import { LOAD_MAP, loadMapSuccess } from 'ducks/game/map'
import { startBattle } from 'ducks/game/battle'

async function fetchMapData(mapName) {
  return await import(`assets/maps/${mapName}.json`)
}

function* loadMap({ payload }) {
  const mapData = yield call(fetchMapData, payload)

  const objects = mapData.objects.map(object => ({
    ...object,
    id: uuidv4(),
  }))

  yield put(loadMapSuccess({
    size: mapData.size,
    tiles: mapData.tiles,
    objects
  }))

  yield put(startBattle())
}

export default function* () {
  yield takeLatest(LOAD_MAP.REQUEST, loadMap)
}
