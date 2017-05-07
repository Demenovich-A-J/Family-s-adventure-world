import { browserHistory } from 'react-router'
import { setBaererToken, resetBaererToken, setUnAuthorizedHandler } from 'infrastructure/utils/axiosUtils'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_AUTH_INFO = 'SET_AUTH_INFO'
export const SET_USER_INFO = 'SET_USER_INFO'
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------

export const setUserAuthInfo = (authInfo, isAuthenticated) => {
  return {
    type: SET_AUTH_INFO,
    payload: {
      authInfo: authInfo,
      isAuthenticated: isAuthenticated
    }
  }
}

export const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    payload: {
      userInfo: userInfo
    }
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const actions = {
  setUserAuthInfo,
  setUserInfo,
  logout
}

// ------------------------------------
// Functions
// ------------------------------------

export function saveUserAuthInfo (authInfo, isRemember) {
  return (dispatch, getState) => {
    dispatch(setUserAuthInfo(authInfo, true))

    if (isRemember) {
      var userInfo = getState().user.authInfo
      localStorage.setItem('user', JSON.stringify(userInfo))
    }
  }
}

export function fetchUserInfo () {
  return (dispatch, getState) => {
    var state = getState()

    if (state.user.isAuthenticated) {
      var token = state.user.authInfo.access_token

      if (token != null) {
        var request = axios({
          method: 'Get',
          url: '/User/FetchUserInfo'
        })

        request.then(function (response) {
          dispatch(setUserInfo(response.data))
          localStorage.setItem('userInfo', JSON.stringify(response.data))
        })

        return request
      }
    }
  }
}

export function logoutUser () {
  return (dispatch, getState) => {
    localStorage.removeItem('user')
    localStorage.removeItem('userInfo')
    dispatch(logout())
    browserHistory.push('/Account/Login')
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_AUTH_INFO]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [SET_USER_INFO]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [LOGOUT]: (state, action) => {
    return Object.assign({}, state, {
      authInfo: null,
      userInfo: null,
      isAuthenticated: false
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
function getInitialState () {
  var authInfo = JSON.parse(localStorage.getItem('user'))
  var userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (authInfo !== null && new Date(authInfo.expires) > Date.now()) {
    setBaererToken(authInfo.access_token)
  } else {
    resetBaererToken()
  }

  setUnAuthorizedHandler()

  return {
    authInfo,
    userInfo: userInfo,
    isAuthenticated: authInfo != null
  }
}

const initialState = getInitialState()

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
