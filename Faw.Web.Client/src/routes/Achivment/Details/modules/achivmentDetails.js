import axios from 'axios'
import _ from 'lodash'
import { actions as reduxFormActions } from 'react-redux-form'

export const SET_ACHIVMENT_SUBMITTING = 'SET_ACHIVMENT_SUBMITTING'
export const SET_ACHIVMENT_LOADING = 'SET_ACHIVMENT_LOADING'

export const GET_ACHIVMENT = 'GET_ACHIVMENT'

export const SUBMIT_ACHIVMENT_INFO = 'SUBMIT_ACHIVMENT_INFO'

export const SET_EDIT_MODE = 'SET_EDIT_MODE'

export const SET_ACTIVE_STEP = 'SET_ACTIVE_STEP'

export const SET_MAX_STEP = 'SET_MAX_STEP'

export const SET_SELECTED_MODEL_NAME = 'SET_SELECTED_MODEL_NAME'

export const SET_SELECTED_CONNECTOR = 'SET_SELECTED_CONNECTOR'

export const SET_SELECTED_COMPARER = 'SET_SELECTED_COMPARER'

export const SET_LEFT_PROPERTY_NAME = 'SET_LEFT_PROPERTY_NAME'

export const SET_LEFT_PROPERTY_VALUE = 'SET_LEFT_PROPERTY_VALUE'

export const SET_LEFT_PROPERTY_TYPE = 'SET_LEFT_PROPERTY_TYPE'

export const SET_RIGHT_PROPERTY_NAME = 'SET_RIGHT_PROPERTY_NAME'

export const SET_RIGHT_PROPERTY_VALUE = 'SET_RIGHT_PROPERTY_VALUE'

export const SET_RIGHT_PROPERTY_TYPE = 'SET_RIGHT_PROPERTY_TYPE'

export const setRightPropertyType = (type) => {
  return {
    type: SET_RIGHT_PROPERTY_TYPE,
    payload: type
  }
}

export const setRightPropertyValue = (value) => {
  return {
    type: SET_RIGHT_PROPERTY_VALUE,
    payload: value
  }
}

export const setRightPropertyName = (name) => {
  return {
    type: SET_RIGHT_PROPERTY_NAME,
    payload: name
  }
}

export const setLeftPropertyType = (type) => {
  return {
    type: SET_LEFT_PROPERTY_TYPE,
    payload: type
  }
}

export const setLeftPropertyValue = (value) => {
  return {
    type: SET_LEFT_PROPERTY_VALUE,
    payload: value
  }
}

export const setLeftPropertyName = (name) => {
  return {
    type: SET_LEFT_PROPERTY_NAME,
    payload: name
  }
}

export const setSelectedComparer = (comparer) => {
  return {
    type: SET_SELECTED_COMPARER,
    payload: comparer
  }
}

export const setSelectedConnector = (connector) => {
  return {
    type: SET_SELECTED_CONNECTOR,
    payload: connector
  }
}

export const setSelectedModelName = (name) => {
  return {
    type: SET_SELECTED_MODEL_NAME,
    payload: name
  }
}

export const setMaxStep = (max) => {
  return {
    type: SET_MAX_STEP,
    payload: max
  }
}

export const setActiveStep = (activeStep) => {
  return {
    type: SET_ACTIVE_STEP,
    payload: activeStep
  }
}

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

export const previousStep = (e) => {
  return (dispatch, getState) => {
    let state = getState().achivmentDetails

    if (state.activeStep !== 0) {
      dispatch(setActiveStep(state.activeStep - 1))
    }
  }
}

export const nextStep = (e) => {
  return (dispatch, getState) => {
    let state = getState().achivmentDetails
    let activeStep = state.activeStep
    let max = state.max

    activeStep++

    if (activeStep > max) {
      max = activeStep
    }

    dispatch(setActiveStep(activeStep))
    dispatch(setMaxStep(max))
  }
}

export const restart = (e) => {
  return (dispatch, getState) => {
    dispatch(setActiveStep(0))
    dispatch(setMaxStep(0))
  }
}

export const onStepTitleClick = (index) => {
  return (dispatch, getState) => {
    let state = getState().achivmentDetails

    if (index <= state.max) {
      dispatch(setActiveStep(index))
    }
  }
}

export const selectModelName = (name) => {
  return (dispatch, getState) => {
    dispatch(setSelectedModelName(name))
  }
}

export const selectConnector = (connector) => {
  return (dispatch, getState) => {
    dispatch(setSelectedConnector(connector))
  }
}

export const selectComparer = (comparer) => {
  return (dispatch, getState) => {
    dispatch(setSelectedComparer(comparer))
  }
}

export const propertyNameChanged = (val, input) => {
  return (dispatch, getState) => {
    var side = getSide(input)

    if (side === 'left') {
      dispatch(setLeftPropertyName(val))
    } else {
      dispatch(setRightPropertyName(val))
    }
  }
}

export const propertyValueChanged = (e) => {
  return (dispatch, getState) => {
    var side = getSide(e.target)

    if (side === 'left') {
      dispatch(setLeftPropertyValue(e.target.value))
    } else {
      dispatch(setRightPropertyValue(e.target.value))
    }
  }
}

export const propertyTypeChanged = (val, input) => {
  return (dispatch, getState) => {
    var side = getSide(input)

    if (side === 'left') {
      dispatch(setLeftPropertyType(val))
    } else {
      dispatch(setRightPropertyType(val))
    }
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

function getSide (input) {
  var searchEles = input.closest('.mdl-cell').children

  for (var i = 0; i < searchEles.length; i++) {
    if (searchEles[i].tagName === 'INPUT') {
      if (searchEles[i].id.indexOf('side') === 0) {
        return searchEles[i].value
      }
    }
  }
}

export const actions = {
  submitAchivmentInfo,
  loadAchivment,
  previousStep,
  nextStep,
  restart,
  onStepTitleClick,
  selectModelName,
  selectConnector,
  selectComparer,
  propertyNameChanged,
  propertyValueChanged,
  propertyTypeChanged
}

const ACTION_HANDLERS = {
  [SET_ACHIVMENT_SUBMITTING]:
    (state, action) => _.assign({}, state, { achivmentSubmitting: action.payload }),
  [SET_ACHIVMENT_LOADING]:
    (state, action) => _.assign({}, state, { achivmentLoading: action.payload }),
  [SET_ACTIVE_STEP]:
    (state, action) => _.assign({}, state, { activeStep: action.payload }),
  [SET_MAX_STEP]:
    (state, action) => _.assign({}, state, { max: action.payload }),
  [SET_SELECTED_MODEL_NAME]:
    (state, action) => _.assign({}, state, { selectedModelName: action.payload }),
  [SET_SELECTED_CONNECTOR]:
    (state, action) => _.assign({}, state, { selectedConnector: action.payload }),
  [SET_SELECTED_COMPARER]:
    (state, action) => _.assign({}, state, { selectedComparer: action.payload }),
  [SET_LEFT_PROPERTY_NAME]:
    (state, action) => _.merge({}, state, { leftPropertyValue: { propertyName: action.payload } }),
  [SET_LEFT_PROPERTY_VALUE]:
    (state, action) => _.merge({}, state, { leftPropertyValue: { value: action.payload } }),
  [SET_LEFT_PROPERTY_TYPE]:
    (state, action) => _.merge({}, state, { leftPropertyValue: { valueType: action.payload } }),
  [SET_RIGHT_PROPERTY_NAME]:
    (state, action) => _.merge({}, state, { rightPropertyValue: { propertyName: action.payload } }),
  [SET_RIGHT_PROPERTY_VALUE]:
    (state, action) => _.merge({}, state, { rightPropertyValue: { value: action.payload } }),
  [SET_RIGHT_PROPERTY_TYPE]:
    (state, action) => _.merge({}, state, { rightPropertyValue: { valueType: action.payload } })
}

const initialState = {
  achivmentSubmitting: false,
  editMode: true,
  achivmentLoading: false,
  activeStep: 0,
  max: 0,
  leftPropertyValue: {
    propertyName: '',
    value: '',
    valueType: ''
  },
  rightPropertyValue: {
    propertyName: '',
    value: '',
    valueType: ''
  },
  selectedModelName: 'Quest',
  selectedComparer: null,
  selectedConnector: null,
  modelNames: [
    'Quest'
  ],
  modelProperties: {
    Quest: [
      'QuestСomplexity',
      'RequiredLevel',
      'Expirience',
      'Name'
    ]
  }
}

export default function newReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
