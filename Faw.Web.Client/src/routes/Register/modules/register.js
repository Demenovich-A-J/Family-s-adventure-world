import axios from 'axios'
import _ from 'lodash'

import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { browserHistory } from 'react-router'

export const SET_GENDER = 'SET_GENDER'
export const FIRST_NAME_CHANGED = 'FIRST_NAME_CHANGED'
export const LAST_NAME_CHANGED = 'LAST_NAME_CHANGED'
export const EMAIL_CHANGED = 'EMAIL_CHANGED'
export const LOGIN_CHANGED = 'LOGIN_CHANGED'
export const GENDER_CHANGED = 'GENDER_CHANGED'
export const BIRTH_DATE_CHANGED = 'BIRTH_DATE_CHANGED'
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'
export const REPEAT_PASSWORD_CHANGED = 'REPEAT_PASSWORD_CHANGED'
export const SET_REGISTER_LOADING = 'SET_REGISTER_LOADING'

export const setGender = (gender) => {
  return { type: SET_GENDER, payload: gender }
}

export const loginChangeHandler = (e) => {
  return { type: LOGIN_CHANGED, payload: e.target.value }
}

export const firstNameChangeHandler = (e) => {
  return { type: FIRST_NAME_CHANGED, payload: e.target.value }
}

export const lastNameChangeHandler = (e) => {
  return { type: LAST_NAME_CHANGED, payload: e.target.value }
}

export const emailChangeHandler = (e) => {
  return { type: EMAIL_CHANGED, payload: e.target.value }
}

export const genderChangeHandler = (e) => {
  return { type: GENDER_CHANGED, payload: e.target.value }
}

export const birthChangeHandler = (e) => {
  return { type: BIRTH_DATE_CHANGED, payload: e.target.value }
}

export const passwordChangeHandler = (e) => {
  return { type: PASSWORD_CHANGED, payload: e.target.value }
}

export const repeatPasswordChangeHandler = (e) => {
  return { type: REPEAT_PASSWORD_CHANGED, payload: e.target.value }
}

export const registerLoadingHandler = (loading) => {
  return { type: SET_REGISTER_LOADING, payload: loading }
}

// ------------------------------------ Functions
// ------------------------------------

export const formSubmitHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(showLoading())
    dispatch(registerLoadingHandler(true))

    var data = getState().register

    axios({
      method: 'Post',
      url: '/Account/Register',
      data: {
        FirstName: data.firstName,
        LastName: data.lastName,
        Gender: data.gender,
        BirthDate: data.birthDate,
        Account: {
          Login: data.login,
          Email: data.email,
          Password: data.password,
          RepeatPassword: data.repeatPassword
        }
      }
    }).then(function (response) {
      dispatch(hideLoading())
      dispatch(registerLoadingHandler(false))
      browserHistory.push('/Account/Login')
    }).catch(function (error) {
      console.log(error)
      dispatch(hideLoading())
      dispatch(registerLoadingHandler(false))
    })
  }
}

export const actions = {
  firstNameChangeHandler,
  lastNameChangeHandler,
  emailChangeHandler,
  loginChangeHandler,
  genderChangeHandler,
  birthChangeHandler,
  passwordChangeHandler,
  repeatPasswordChangeHandler,
  formSubmitHandler,
  setGender
}

const ACTION_HANDLERS = {
  [SET_GENDER]:
    (state, action) => _.assign({}, state, { gender: action.payload }),
  [FIRST_NAME_CHANGED]:
    (state, action) => _.assign({}, state, { firstName: action.payload }),
  [LAST_NAME_CHANGED]:
    (state, action) => _.assign({}, state, { lastName: action.payload }),
  [EMAIL_CHANGED]:
    (state, action) => _.assign({}, state, { email: action.payload }),
  [LOGIN_CHANGED]:
    (state, action) => _.assign({}, state, { login: action.payload }),
  [GENDER_CHANGED]:
    (state, action) => _.assign({}, state, { gender: action.payload }),
  [BIRTH_DATE_CHANGED]:
    (state, action) => _.assign({}, state, { birthDate: action.payload }),
  [PASSWORD_CHANGED]:
    (state, action) => _.assign({}, state, { password: action.payload }),
  [REPEAT_PASSWORD_CHANGED]:
    (state, action) => _.assign({}, state, { repeatPassword: action.payload }),
  [SET_REGISTER_LOADING]:
    (state, action) => _.assign({}, state, { loading: action.payload })
}

const initialState = {
  firstName: '',
  lastName: '',
  login: '',
  email: '',
  gender: '',
  birthDate: null,
  password: '',
  repeatPassword: '',
  loading: false
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
