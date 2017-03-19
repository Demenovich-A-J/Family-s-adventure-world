import axios from 'axios'

// ------------------------------------ Constants
// ------------------------------------
export const LOADING_CHANGED = 'LOADING_CHANGED'
export const FAMALY_NAME_CHANGED = 'FAMALY_NAME_CHANGED'
export const OPEN_FAMILY_DIALOG_CHANGED = 'OPEN_FAMILY_DIALOG_CHANGED'
export const FAMILY_CHANGED = 'FAMILY_CHANGED'

// ------------------------------------ Actions
// ------------------------------------
export const setLoading = (loading) => {
  return {
    type: LOADING_CHANGED,
    payload: loading
  }
}

export const setFamilyName = (name) => {
  return {
    type: FAMALY_NAME_CHANGED,
    payload: name
  }
}

export const setFamily = (family) => {
  return {
    type: FAMILY_CHANGED,
    payload: family
  }
}

export const setOpenFamilyDialog = (open) => {
  return {
    type: OPEN_FAMILY_DIALOG_CHANGED,
    payload: open
  }
}

// ------------------------------------ Functions
// ------------------------------------

export const formSubmitHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setLoading(true))

    var state = getState()

    axios({
      method: 'Post',
      url: '/Family/Create',
      data: {
        Name: state.family.familyName,
        CreatedById: state.user.userInfo.userId
      }
    }).then(function (response) {
      dispatch(setFamily(response.data))
      dispatch(setOpenFamilyDialog(false))
      dispatch(setLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setLoading(false))
    })
  }
}

export const openFamilyDialog = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setOpenFamilyDialog(true))
  }
}

export const closeFamilyDialog = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    var loading = getState().family.loading

    if (!loading) {
      dispatch(setOpenFamilyDialog(false))
    }
  }
}

export const familyNameChangeHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setFamilyName(e.target.value))
  }
}

export const actions = {
  formSubmitHandler,
  familyNameChangeHandler,
  openFamilyDialog,
  closeFamilyDialog,
  setFamily
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_CHANGED]: (state, action) => Object.assign({}, state, { loading: action.payload }),
  [FAMALY_NAME_CHANGED]: (state, action) => Object.assign({}, state, { familyName: action.payload }),
  [OPEN_FAMILY_DIALOG_CHANGED]: (state, action) => Object.assign({}, state, { openFamilyDialog: action.payload }),
  [FAMILY_CHANGED]: (state, action) => Object.assign({}, state, { family: action.payload })
}

const initialState = {
  familyName: '',
  family: null,
  loading: false,
  openFamilyDialog: false
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
