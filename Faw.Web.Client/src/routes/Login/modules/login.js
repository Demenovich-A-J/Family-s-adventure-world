import axios from 'axios'
import { browserHistory } from 'react-router'
import axiosUtil from 'infrastructure/utils/axiosUtils'
import { saveUserAuthInfo, fetchUserInfo } from 'store/user'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

// ------------------------------------ Constants
// ------------------------------------
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_CHANGED = 'LOGIN_CHANGED'
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'
export const IS_REMEMBER_CHANGED = 'IS_REMEMBER_CHANGED'

// ------------------------------------ Actions
// ------------------------------------

export const loginChangeHandler = (e) => {
  return { type: LOGIN_CHANGED, payload: e.target.value }
}

export const passwordChangeHandler = (e) => {
  return { type: PASSWORD_CHANGED, payload: e.target.value }
}

export const loginLoadingHandler = (loading) => {
  return { type: SET_LOGIN_LOADING, payload: loading }
}

export const isRememberChangeHandelr = (e) => {
  return { type: IS_REMEMBER_CHANGED, payload: e.target.checked }
}

const loginSuccessHandler = () => {
  return { type: LOGIN_SUCCESS }
}

export const formSubmitHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(loginLoadingHandler(true))
    dispatch(showLoading())

    var data = getState().login

    axios({
      method: 'Post',
      url: '/Auth/Login',
      data: {
        Login: data.login,
        Password: data.password
      }
    }).then(function (response) {
      dispatch(loginSuccessHandler())
      axiosUtil.setBaererToken(response.data.token)

      const authInfo = {
        access_token: response.data.token,
        expires: response.data.expires
      }

      dispatch(saveUserAuthInfo(authInfo, data.isRemember))
      dispatch(fetchUserInfo())
      dispatch(loginLoadingHandler(false))
      dispatch(hideLoading())

      browserHistory.push('/')
    }).catch(function (error) {
      console.log(error)
      dispatch(hideLoading())
      dispatch(loginLoadingHandler(false))
    })
  }
}

export const actions = {
  loginChangeHandler,
  passwordChangeHandler,
  formSubmitHandler,
  isRememberChangeHandelr
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_CHANGED]: (state, action) => Object.assign({}, state, { login: action.payload }),
  [PASSWORD_CHANGED]: (state, action) => Object.assign({}, state, { password: action.payload }),
  [SET_LOGIN_LOADING]: (state, action) => Object.assign({}, state, { loading: action.payload }),
  [LOGIN_SUCCESS]: (state, action) => Object.assign({}, state, {
    login: '',
    password: ''
  }),
  [IS_REMEMBER_CHANGED]: (state, action) => Object.assign({}, state, { isRemember: action.payload })
}

// ------------------------------------ Reducer
// ------------------------------------
const initialState = {
  loading: false,
  valid: true,
  login: null,
  password: null,
  isRemember: true
}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
