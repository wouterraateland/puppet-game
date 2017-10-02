import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import windowReducer from 'reducers/window'

const rootReducer = combineReducers({
  window: windowReducer,
  router: routerReducer,
})

export default rootReducer
