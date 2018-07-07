import { combineReducers } from 'redux'

import battle from './battle'
import characters from './characters'
import hud from './hud'
import map from './map'
import movementPath from './movementPath'

export default combineReducers({
  battle,
  characters,
  hud,
  map,
  movementPath,
})
