import axios from 'axios'
import _ from 'lodash'

export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'

export const SET_USER_LOADING = 'SET_USER_LOADING'

export const getUser = (user) => {
  return {
    type: GET_USER
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const setUserLoading = (userLoading) => {
  return {
    type: SET_USER_LOADING,
    payload: userLoading
  }
}

export const loadUserDetails = (userId) => {
  return (dispatch, getState) => {
    setUserLoading(true)

    axios({
      method: 'Get',
      url: 'User/GetUser/' + userId
    }).then(function (response) {
      if (response.data) {
        dispatch(setUser(response.data))
      }

      dispatch(setUserLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setUserLoading(false))
    })
  }
}

export const actions = {
  loadUserDetails
}

const ACTION_HANDLERS = {
  [SET_USER]:
    (state, action) => _.assign({}, state, { user: action.payload }),
  [SET_USER_LOADING]:
    (state, action) => _.assign({}, state, { userLoading: action.payload })
}

const initialState = {
  user: {},
  userLoading: true
}

export default function userDetailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
