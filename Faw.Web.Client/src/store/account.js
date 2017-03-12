import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GENDERS = 'FETCH_GENDERS'

// ------------------------------------
// Actions
// ------------------------------------

export const setGendersInfo = (genders) => {
  return {
    type: FETCH_GENDERS,
    payload: genders
  }
}

// ------------------------------------
// Functions
// ------------------------------------
export function fetchGenders () {
  return (dispatch, getState) => {
    axios({
      method: 'Get',
      url: '/Account/FetchGendersInfo'
    }).then(function (response) {
      dispatch(setGendersInfo(response.data))
    })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [FETCH_GENDERS]: (state, action) => {
    return Object.assign({}, state, action.payload)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
function getInitialState () {
  return {
    genders: null
  }
}

const initialState = getInitialState()

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
