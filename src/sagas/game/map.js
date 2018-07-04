import { takeLatest, put, call } from 'redux-saga/effects'
import uuidv4 from 'uuid/v4'

import * as Map from 'ducks/game/map'

async function fetchMapData(mapName) {
  return await import(`assets/maps/${mapName}.json`)
}

function* loadMap(action) {
  const mapData = yield call(fetchMapData, action.mapName)

  const objects = mapData.objects.map(object => ({
    ...object,
    id: uuidv4(),
  }))

  yield put(Map.loadSuccessfull(mapData.size, mapData.tiles, objects))
}

export default function* () {
  yield takeLatest(Map.LOAD.REQUEST, loadMap)
}
