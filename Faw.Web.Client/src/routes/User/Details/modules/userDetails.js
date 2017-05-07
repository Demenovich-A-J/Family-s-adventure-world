import axios from 'axios'
import _ from 'lodash'

export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'

export const GET_USER_ACHIVMENTS = 'GET_USER_ACHIVMENTS'
export const SET_USER_ACHIVMENTS = 'SET_USER_ACHIVMENTS'

export const GET_GENDERS = 'GET_GENDERS'
export const SET_GENDERS = 'SET_GENDERS'

export const SET_EDIT_MODE = 'SET_EDIT_MODE'

export const SET_USER_LOADING = 'SET_USER_LOADING'
export const SET_USER_ACHIVMENTS_LOADING = 'SET_USER_ACHIVMENTS_LOADING'
export const SET_GENDERS_LOADING = 'SET_GENDERS_LOADING'

export const getGenders = (edit) => {
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

export const setEditMode = (edit) => {
  return {
    type: SET_EDIT_MODE,
    payload: edit
  }
}

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

export const getUserAchivments = () => {
  return {
    type: GET_USER_ACHIVMENTS
  }
}

export const setUserAchivments = (userAchivments) => {
  return {
    type: SET_USER_ACHIVMENTS,
    payload: userAchivments
  }
}

export const setUserAchivmentsLoading = (loading) => {
  return {
    type: SET_USER_ACHIVMENTS_LOADING,
    payload: loading
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

    dispatch(loadFamilyMemberAchivments(userId))
  }
}

export const loadFamilyMemberAchivments = (userId) => {
  return (dispatch, getState) => {
    dispatch(getUserAchivments())
    dispatch(setUserAchivmentsLoading(true))

    axios({
      method: 'Get',
      url: '/FamilyMember/FamilyUserAchivments/' + userId
    }).then(function (response) {
      if (response.data) {
        dispatch(setUserAchivments(response.data.achivmentList))
      }

      dispatch(setUserAchivmentsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setUserAchivmentsLoading(false))
    })
  }
}

export const loadGenders = () => {
  return (dispatch, getState) => {
    dispatch(getGenders())
    dispatch(setGendersLoading(true))

    axios({
      method: 'Get',
      url: '/Account/FetchGendersInfo'
    })
    .then(function (response) {
      dispatch(setGenders(response.data.genders))
      // dispatch(setGender(response.data.genders[0]))
      dispatch(setGendersLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setGendersLoading(false))
    })
  }
}

export const editButtonClick = (e) => {
  return (dispatch, getState) => {
    dispatch(setEditMode(true))
    dispatch(loadGenders())
  }
}

export const cancelButtonClick = (e) => {
  return (dispatch, getState) => {
    dispatch(setEditMode(false))
  }
}

export const actions = {
  loadUserDetails,
  loadFamilyMemberAchivments,
  editButtonClick,
  cancelButtonClick
}

const ACTION_HANDLERS = {
  [SET_USER]:
    (state, action) => _.assign({}, state, { user: action.payload }),
  [SET_USER_LOADING]:
    (state, action) => _.assign({}, state, { userLoading: action.payload }),
  [SET_USER_ACHIVMENTS_LOADING]:
    (state, action) => _.assign({}, state, { userAchivmentsLoading: action.payload }),
  [SET_USER_ACHIVMENTS]:
    (state, action) => _.assign({}, state, { userAchivments: action.payload }),
  [SET_EDIT_MODE]:
    (state, action) => _.assign({}, state, { editMode: action.payload }),
  [SET_GENDERS_LOADING]:
    (state, action) => _.assign({}, state, { gendersLoading: action.payload }),
  [SET_GENDERS]:
    (state, action) => _.assign({}, state, { genders: action.payload })
}

const initialState = {
  user: {},
  userAchivments: [],
  genders: [],
  userLoading: true,
  userAchivmentsLoading: true,
  gendersLoading: true,
  editMode: false
}

export default function userDetailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
