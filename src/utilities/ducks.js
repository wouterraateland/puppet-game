export const createReducer = (initialState, handlers) =>
  (state = initialState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state

export const createAsyncActionType = (prefix, steps=['REQUEST', 'SUCCESS', 'FAILURE']) =>
  steps.reduce(
    (acc, suffix) => ({ ...acc, [suffix]: `${prefix}_${suffix}` }),
    {})
