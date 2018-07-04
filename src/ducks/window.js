import { createReducer } from 'utilities/ducks'

// Action types
export const RESIZE = 'window/RESIZE'
export const SCROLL = 'window/SCROLL'

// Action creators
export const resize = (width, height) => ({
  type: RESIZE,
  width, height,
})

export const scroll = (scrollLeft, scrollTop) => ({
  type: SCROLL,
  scrollLeft, scrollTop
})

// Reducers
const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  scrollLeft: window.scrollLeft,
  scrollTop: window.scrollTop,
}

const reducer = createReducer(initialState, {
  [RESIZE]: (state, { width, height }) => ({
    ...state,
    width, height,
  }),
  [SCROLL]: (state, { scrollLeft, scrollTop }) => ({
    ...state,
    scrollLeft, scrollTop,
  }),
})

export default reducer
