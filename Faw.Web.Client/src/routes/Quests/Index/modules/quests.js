import axios from 'axios'

// ------------------------------------ Constants
// ------------------------------------
export const LOADING_CHANGED = 'LOADING_CHANGED'

// ------------------------------------ Actions
// ------------------------------------
export const setLoading = (loading) => {
  return {
    type: LOADING_CHANGED,
    payload: loading
  }
}

// ------------------------------------ Functions
// ------------------------------------


export const actions = {

}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_CHANGED]: (state, action) => Object.assign({}, state, { loading: action.payload }),
}

const initialState = {
  loading: false
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
