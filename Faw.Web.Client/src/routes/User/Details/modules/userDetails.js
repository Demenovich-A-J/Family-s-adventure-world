import axios from 'axios'
import _ from 'lodash'
import { actions as reduxFormActions } from 'react-redux-form'
import { fetchUserInfo } from 'store/user'

export const GET_USER = 'GET_USER'
export const SET_USER = 'SET_USER'

export const GET_USER_ACHIVMENTS = 'GET_USER_ACHIVMENTS'
export const SET_USER_ACHIVMENTS = 'SET_USER_ACHIVMENTS'

export const SET_EDIT_MODE = 'SET_EDIT_MODE'

export const SET_PLAYER_INFO = 'SET_PLAYER_INFO'

export const SET_USER_LOADING = 'SET_USER_LOADING'
export const SET_USER_ACHIVMENTS_LOADING = 'SET_USER_ACHIVMENTS_LOADING'
export const SET_USER_DETAILS_INFO_SUBMITTING = 'SET_USER_DETAILS_INFO_SUBMITTING'

export const setUserDetailsInfoSubmitting = (submitting) => {
  return {
    type: SET_USER_DETAILS_INFO_SUBMITTING,
    payload: submitting
  }
}

export const setPlayerInfo = (playerInfo) => {
  return {
    type: SET_PLAYER_INFO,
    payload: playerInfo
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

export const setUser = () => {
  return {
    type: SET_USER
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
        dispatch(setUser())
        dispatch(setPlayerInfo(response.data.playerInfo))
        dispatch(reduxFormActions.load('userDetailsInfo', {
          userId: response.data.userId,
          accountId: response.data.accountId,
          playerInfoId: response.data.playerInfoId,
          userTypeId: response.data.userTypeId,
          familyId: response.data.familyId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          role: response.data.role,
          gender: response.data.gender,
          birthDate: response.data.birthDate,
          imageUrl: response.data.imageUrl,
          description: response.data.description,
          city: response.data.city,
          country: response.data.country
        }))
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

export const saveButtonClick = (e) => {
  return (dispatch, getState) => {
    dispatch(setUserDetailsInfoSubmitting(true))

    var state = getState()

    var sendRequest = axios({
      method: 'Post',
      url: '/Account/Edit',
      data: state.userDetailsInfo
    }).then(function (response) {
      dispatch(loadUserDetails(state.userDetailsInfo.userId))
      dispatch(fetchUserInfo())
      dispatch(setEditMode(false))
      dispatch(setUserDetailsInfoSubmitting(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setUserDetailsInfoSubmitting(false))
    })

    dispatch(reduxFormActions.submit('userDetailsInfo', sendRequest))
  }
}

export const editButtonClick = (e) => {
  return (dispatch, getState) => {
    dispatch(setEditMode(true))
  }
}

export const cancelButtonClick = (e) => {
  return (dispatch, getState) => {
    // dispatch(reduxFormActions.reset('userDetailsInfo'))
    dispatch(setEditMode(false))
  }
}

export const actions = {
  loadUserDetails,
  loadFamilyMemberAchivments,
  editButtonClick,
  cancelButtonClick,
  saveButtonClick
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
  [SET_PLAYER_INFO]:
    (state, action) => _.assign({}, state, { playerInfo: action.payload }),
  [SET_USER_DETAILS_INFO_SUBMITTING]:
    (state, action) => _.assign({}, state, { userDetailsInfoSubmitting: action.payload })
}

const initialState = {
  user: {},
  userAchivments: [],
  playerInfo: {},
  userLoading: true,
  userAchivmentsLoading: true,
  editMode: false,
  userDetailsInfoSubmitting: false
}

export default function userDetailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
