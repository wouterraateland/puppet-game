import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import modals from './modals'
import window from './window'
import game from './game'

export const reducer = combineReducers({
  window,
  router: routerReducer,
  modals,
  game,
})

export default reducer
