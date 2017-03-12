import axios from 'axios'

// ------------------------------------ Constants
// ------------------------------------
export const OLD_PASSWORD_CHANGED = 'OLD_PASSWORD_CHANGED'
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'
export const REPEAT_PASSWORD_CHANGED = 'REPEAT_PASSWORD_CHANGED'
export const PASSWORD_CHANGED_SUCCESS = 'PASSWORD_CHANGED_SUCCESS'

// ------------------------------------ Actions
// ------------------------------------
export const oldPasswordChangeHandler = (e) => {
  return { type: OLD_PASSWORD_CHANGED, payload: e.target.value }
}

export const passwordChangeHandler = (e) => {
  return { type: PASSWORD_CHANGED, payload: e.target.value }
}

export const repeatPasswordChangeHandler = (e) => {
  return { type: REPEAT_PASSWORD_CHANGED, payload: e.target.value }
}

export const passwordChangeSuccessHandler = () => {
  return { type: PASSWORD_CHANGED_SUCCESS }
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
      dispatch(passwordChangeSuccessHandler())
      // browserHistory.push('/Account/Login')
    }).catch(function (error) {
      console.log(error)
      // dispatch(loginLoadingHandler(false))
    })
  }
}

export const actions = {
  oldPasswordChangeHandler,
  passwordChangeHandler,
  repeatPasswordChangeHandler,
  formSubmitHandler
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OLD_PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, { oldPassword: action.payload }),
  [PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, { password: action.payload }),
  [REPEAT_PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, { repeatPassword: action.payload })
}

const initialState = {
  oldPassword: '',
  password: '',
  repeatPassword: ''
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
