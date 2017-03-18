import axios from 'axios'

// ------------------------------------ Constants
// ------------------------------------
export const EMAIL_CHANGED = 'EMAIL_CHANGED'
export const LOADING_CHANGED = 'LOADING_CHANGED'

// ------------------------------------ Actions
// ------------------------------------
export const emailChangeHandler = (e) => {
  return {
    type: EMAIL_CHANGED,
    payload: e.target.value
  }
}

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
  emailChangeHandler,
  formSubmitHandler
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EMAIL_CHANGED]: (state, action) => Object.assign({}, state, { email: action.payload }),
  [LOADING_CHANGED]: (state, action) => Object.assign({}, state, { loading: action.payload })
}

const initialState = {
  email: '',
  loading: false
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
