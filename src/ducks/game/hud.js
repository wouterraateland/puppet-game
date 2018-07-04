import { createReducer } from 'utilities/ducks'

// Action types
export const SHOW_PLAYER_CONTROLS = 'hud/SHOW_PLAYER_CONTROLS'

// Action creators
export const showPlayerControls = () => ({
  type: SHOW_PLAYER_CONTROLS,
})

// Reducers
const reducer = createReducer({}, {
  [SHOW_PLAYER_CONTROLS]: state => state
})

export default reducer
