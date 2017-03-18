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

export const formSubmitHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    var data = getState().register

    axios({
      method: 'Post',
      url: '/Account/ResetPassword',
      data: {
        OldPassword: data.firstName,
        Password: data.lastName,
        RepeatPassword: data.gender
      }
    }).then(function (response) {
      // browserHistory.push('/Account/Login')
    }).catch(function (error) {
      console.log(error)
      // dispatch(loginLoadingHandler(false))
    })
  }
}

export const actions = {
  formSubmitHandler
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_CHANGED]: (state, action) => Object.assign({}, state, { loading: action.payload })
}

const initialState = {
  loading: false
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
