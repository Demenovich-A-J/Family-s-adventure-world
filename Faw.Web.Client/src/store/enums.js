import axios from 'axios'
import _ from 'lodash'

export const GET_GENDERS = 'GET_GENDERS'
export const SET_GENDERS = 'SET_GENDERS'

export const SET_GENDERS_LOADING = 'SET_GENDERS_LOADING'

export const getGenders = () => {
  return {
    type: GET_GENDERS
  }
}

export const setGenders = (genders) => {
  return {
    type: SET_GENDERS,
    payload: genders
  }
}

export const setGendersLoading = (loading) => {
  return {
    type: SET_GENDERS_LOADING,
    payload: loading
  }
}

export const loadGenders = () => {
  return (dispatch, getState) => {
    dispatch(setGendersLoading(true))
    var request = axios({ method: 'Get', url: '/Account/FetchGendersInfo' })

    request.then(function (response) {
      dispatch(setGenders(response.data.genders))
      dispatch(setGendersLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setGendersLoading(false))
    })

    return request
  }
}

export const actions = {
}

const ACTION_HANDLERS = {
  [SET_GENDERS]:
    (state, action) => _.assign({}, state, { genders: action.payload }),
  [SET_GENDERS_LOADING]:
    (state, action) => _.assign({}, state, { gendersLoading: action.payload })
}

const initialState = {
  genders: [
    'Male',
    'Female'
  ],
  gendersLoading: false
}

export default function enumsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
