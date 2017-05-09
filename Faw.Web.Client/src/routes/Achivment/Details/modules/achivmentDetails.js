import axios from 'axios'
import _ from 'lodash'
import { actions as reduxFormActions } from 'react-redux-form'

export const SET_ACHIVMENT_SUBMITTING = 'SET_ACHIVMENT_SUBMITTING'
export const SET_ACHIVMENT_LOADING = 'SET_ACHIVMENT_LOADING'

export const GET_ACHIVMENT = 'GET_ACHIVMENT'

export const SUBMIT_ACHIVMENT_INFO = 'SUBMIT_ACHIVMENT_INFO'

export const SET_EDIT_MODE = 'SET_EDIT_MODE'

export const getAchivment = () => {
  return {
    type: GET_ACHIVMENT
  }
}

export const setAchivmentLoading = (loading) => {
  return {
    type: SET_ACHIVMENT_LOADING,
    payload: loading
  }
}

export const setAchivmentSubmitting = (submitting) => {
  return {
    type: SET_ACHIVMENT_SUBMITTING,
    payload: submitting
  }
}

export const setEditMode = (editMode) => {
  return {
    type: SET_EDIT_MODE,
    payload: editMode
  }
}

export const setSubmitAchivmentInfo = () => {
  return {
    type: SUBMIT_ACHIVMENT_INFO
  }
}

export const submitAchivmentInfoFormHandler = (model) => {
  return (dispatch, getState) => {
    dispatch(setSubmitAchivmentInfo())
    dispatch(setAchivmentSubmitting(true))

    let url = ''
    let method = ''
    let state = getState()
    let achivmentDetailsInfo = state.achivmentDetailsInfo

    if (_.isNil(achivmentDetailsInfo.achivmentId)) {
      url = '/Achivment/Create'
      method = 'Put'
    } else {
      url = '/Achivment/Update'
      method = 'Post'
    }

    axios({
      method: method,
      url: url,
      data: achivmentDetailsInfo
    }).then(function (response) {
      dispatch(setEditMode(false))
      dispatch(setAchivmentSubmitting(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setAchivmentSubmitting(false))
    })
  }
}

export const submitAchivmentInfo = () => {
  return (dispatch, getState) => {
    let url = ''
    let method = ''
    let state = getState()
    let achivmentDetailsInfo = state.achivmentDetailsInfo

    if (_.isNil(achivmentDetailsInfo.achivmentId)) {
      url = '/Achivment/Create'
      method = 'Put'
    } else {
      url = '/Achivment/Update'
      method = 'Post'
    }

    let sendRequest = axios({
      method: method,
      url: url,
      data: achivmentDetailsInfo
    }).then(function (response) {
      dispatch(setEditMode(false))
      dispatch(setAchivmentSubmitting(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setAchivmentSubmitting(false))
    })

    dispatch(reduxFormActions.submit('achivmentDetailsInfo', sendRequest))
  }
}

export const loadAchivment = (achivmentId) => {
  return (dispatch, getState) => {
    dispatch(getAchivment())
    dispatch(setAchivmentLoading(true))

    var request = axios({
      method: 'Get',
      url: '/Achivment/Get/' + achivmentId
    })

    request.then(function (response) {
      dispatch(reduxFormActions.load('achivmentDetailsInfo', response.data))
      dispatch(setAchivmentLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setAchivmentLoading(false))
    })

    return request
  }
}

export const actions = {
  submitAchivmentInfo,
  loadAchivment
}

const ACTION_HANDLERS = {
  [SET_ACHIVMENT_SUBMITTING]:
    (state, action) => _.assign({}, state, { achivmentSubmitting: action.payload }),
  [SET_ACHIVMENT_LOADING]:
    (state, action) => _.assign({}, state, { achivmentLoading: action.payload })
}

const initialState = {
  achivmentSubmitting: false,
  editMode: true,
  achivmentLoading: false
}

export default function newReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
