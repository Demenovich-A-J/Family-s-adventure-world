import axios from 'axios'
import _ from 'lodash'

export const GET_FAMILY_MEMBER_DETAILS = 'GET_FAMILY_MEMBER_DETAILS'
export const SET_FAMILY_MEMBER_DETAILS = 'SET_FAMILY_MEMBER_DETAILS'

export const GET_FAMILY_MEMBER_ACHIVMENTS = 'GET_FAMILY_MEMBER_ACHIVMENTS'
export const SET_FAMILY_MEMBER_ACHIVMENTS = 'SET_FAMILY_MEMBER_ACHIVMENTS'

export const GET_FAMILY_MEMBER_QUESTS = 'GET_FAMILY_MEMBER_QUESTS'
export const SET_FAMILY_MEMBER_QUESTS = 'SET_FAMILY_MEMBER_QUESTS'

export const SET_FAMILY_MEMBER_DETAILS_LOADING = 'SET_FAMILY_MEMBER_DETAILS_LOADING'
export const SET_FAMILY_MEMBER_ACHIVMENTS_LOADING = 'SET_FAMILY_MEMBER_ACHIVMENTS_LOADING'
export const SET_FAMILY_MEMBER_QUESTS_LOADING = 'SET_FAMILY_MEMBER_QUESTS_LOADING'


export const getFamilyMemeberDetails = () => {
  return {
    type: GET_FAMILY_MEMBER_DETAILS
  }
}

export const getFamilyMemeberAchivments = () => {
  return {
    type: GET_FAMILY_MEMBER_ACHIVMENTS
  }
}

export const getFamilyMemeberQuests = () => {
  return {
    type: GET_FAMILY_MEMBER_QUESTS
  }
}

export const setFamilyMemeberDetails = (memberInfo) => {
  return {
    type: SET_FAMILY_MEMBER_DETAILS,
    payload: memberInfo
  }
}

export const setFamilyMemeberAchivments = (memberAchivments) => {
  return {
    type: SET_FAMILY_MEMBER_ACHIVMENTS,
    payload: memberAchivments
  }
}

export const setFamilyMemeberQuests = (memberQuests) => {
  return {
    type: SET_FAMILY_MEMBER_QUESTS,
    payload: memberQuests
  }
}

export const setFamilyMemeberDetailsLoading = (loading) => {
  return {
    type: SET_FAMILY_MEMBER_DETAILS_LOADING,
    payload: loading
  }
}

export const setFamilyMemeberAchivmentsLoading = (loading) => {
  return {
    type: SET_FAMILY_MEMBER_ACHIVMENTS_LOADING,
    payload: loading
  }
}

export const setFamilyMemeberQuestsLoading = (loading) => {
  return {
    type: SET_FAMILY_MEMBER_QUESTS_LOADING,
    payload: loading
  }
}

export const loadFamilyMemberDetails = (userId) => {
  return (dispatch, getState) => {
    dispatch(getFamilyMemeberDetails())
    dispatch(setFamilyMemeberDetailsLoading(true))

    axios({
      method: 'Get',
      url: '/FamilyMember/FamilyUserInfo/' + userId
    }).then(function (response) {
      console.log(response)
      if (response.data) {
        dispatch(setFamilyMemeberDetails(response.data))
      }

      dispatch(setFamilyMemeberDetailsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setFamilyMemeberDetailsLoading(false))
    })

    dispatch(loadFamilyMemberQuests(userId))
    dispatch(loadtFamilyMemberAchivments(userId))
  }
}

export const loadFamilyMemberQuests = (userId) => {
  return (dispatch, getState) => {
    dispatch(getFamilyMemeberQuests())
    dispatch(setFamilyMemeberQuestsLoading(true))

    axios({
      method: 'Get',
      url: '/FamilyMember/FamilyUserQuests/' + userId
    }).then(function (response) {
      console.log(response)
      if (response.data) {
        dispatch(setFamilyMemeberQuests(response.data))
      }

      dispatch(setFamilyMemeberQuestsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setFamilyMemeberQuestsLoading(false))
    })
  }
}

export const loadtFamilyMemberAchivments = (userId) => {
  return (dispatch, getState) => {
    dispatch(getFamilyMemeberAchivments())
    dispatch(setFamilyMemeberAchivmentsLoading(true))

    axios({
      method: 'Get',
      url: '/FamilyMember/FamilyUserAchivments/' + userId
    }).then(function (response) {
      console.log(response)
      if (response.data) {
        dispatch(setFamilyMemeberAchivments(response.data))
      }

      dispatch(setFamilyMemeberAchivmentsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setFamilyMemeberAchivmentsLoading(false))
    })
  }
}


export const actions = {
  loadFamilyMemberDetails
}

const ACTION_HANDLERS = {
  [SET_FAMILY_MEMBER_DETAILS]:
    (state, action) => _.assign({}, state, { userInfo: action.payload }),
  [SET_FAMILY_MEMBER_ACHIVMENTS]:
    (state, action) => _.assign({}, state, { userAchivments: action.payload }),
  [SET_FAMILY_MEMBER_QUESTS]:
    (state, action) => _.assign({}, state, { userQuests: action.payload }),
  [SET_FAMILY_MEMBER_DETAILS_LOADING]:
    (state, action) => _.assign({}, state, { userInfoLoading: action.payload }),
  [SET_FAMILY_MEMBER_ACHIVMENTS_LOADING]:
    (state, action) => _.assign({}, state, { userAchivmentsLoading: action.payload }),
  [SET_FAMILY_MEMBER_QUESTS_LOADING]:
    (state, action) => _.assign({}, state, { userQuestsLoading: action.payload })
}

const initialState = {
  userInfo: {},
  userAchivments: {},
  userQuests: {},
  userInfoLoading: true,
  userAchivmentsLoading: true,
  userQuestsLoading: true
}

export default function memberDetailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
