import { createReducer } from 'utilities/ducks'

// Action types
export const TAKE_DAMAGE = 'fighter/TAKE_DAMAGE'
export const MOVE = 'fighter/MOVE'
export const ACT = 'figther/ACT'

// Action creators
export const takeDamage = (id, damage) => ({
  type: TAKE_DAMAGE,
  id, damage
})

export const move = (id, path) => ({
  type: MOVE,
  id, path,
})

export const act = (id, rest) => ({
  type: ACT,
  id, rest,
})

// Reducers
export const reducer = createReducer({}, {
  [TAKE_DAMAGE]: (state, { damage }) => ({
    ...state,
    health: state.health - damage
  }),
  [MOVE]: (state, action) => ({
    ...state
  }),
  [ACT]: (state, action) => ({
    ...state
  })
})

export default reducer
