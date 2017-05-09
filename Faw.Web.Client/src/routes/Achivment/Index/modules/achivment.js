import axios from 'axios'
import _ from 'lodash'

export const GET_ACHIVMENTS = 'GET_ACHIVMENTS'
export const SET_ACHIVMENTS = 'SET_ACHIVMENTS'

export const SET_ACHIVMENTS_LOADING = 'SET_ACHIVMENTS_LOADING'

export const getAchivments = () => {
  return {
    type: GET_ACHIVMENTS
  }
}

export const setAchivments = (achivments) => {
  return {
    type: SET_ACHIVMENTS,
    payload: achivments
  }
}

export const setAchivmentsLoading = (loading) => {
  return {
    type: SET_ACHIVMENTS_LOADING,
    payload: loading
  }
}

export const loadAchivments = () => {
  return (dispatch, getState) => {
    dispatch(getAchivments())
    dispatch(setAchivmentsLoading(true))
    var request = axios({
      method: 'Get',
      url: '/Achivment/Get'
    })

    request.then(function (response) {
      dispatch(setAchivments(response.data))
      dispatch(setAchivmentsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setAchivmentsLoading(false))
    })

    return request
  }
}

export const actions = {
  loadAchivments
}

const ACTION_HANDLERS = {
  [SET_ACHIVMENTS]:
    (state, action) => _.assign({}, state, { achivments: action.payload }),
  [SET_ACHIVMENTS_LOADING]:
    (state, action) => _.assign({}, state, { achivmentsLoading: action.payload })
}

const initialState = {
  achivments: [],
  achivmentsLoading: false
}

export default function newReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
