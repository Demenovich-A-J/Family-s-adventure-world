import axios from 'axios'
import _ from 'lodash'

export const GET_FAMILY_MEMBER_DETAILS = 'GET_FAMILY_MEMBER_DETAILS'
export const SET_FAMILY_MEMBER_DETAILS = 'SET_FAMILY_MEMBER_DETAILS'

export const GET_FAMILY_MEMBER_ACHIVMENTS = 'GET_FAMILY_MEMBER_ACHIVMENTS'
export const SET_FAMILY_MEMBER_ACHIVMENTS = 'SET_FAMILY_MEMBER_ACHIVMENTS'

export const GET_FAMILY_MEMBER_QUESTS = 'GET_FAMILY_MEMBER_QUESTS'
export const SET_FAMILY_MEMBER_QUESTS = 'SET_FAMILY_MEMBER_QUESTS'

export const GET_AVAILABLE_QUESTS = 'GET_AVAILABLE_QUESTS'
export const SET_AVAILABLE_QUESTS = 'SET_AVAILABLE_QUESTS'

export const SET_FAMILY_MEMBER_DETAILS_LOADING = 'SET_FAMILY_MEMBER_DETAILS_LOADING'
export const SET_FAMILY_MEMBER_ACHIVMENTS_LOADING = 'SET_FAMILY_MEMBER_ACHIVMENTS_LOADING'
export const SET_FAMILY_MEMBER_QUESTS_LOADING = 'SET_FAMILY_MEMBER_QUESTS_LOADING'
export const SET_AVAILABLE_QUESTS_LOADING = 'SET_AVAILABLE_QUESTS_LOADING'

export const SET_AVAILABLE_QUEST_SELECTED_ID = 'SET_AVAILABLE_QUEST_SELECTED_ID'

export const SET_QUEST_FOR_USER = 'SET_QUEST_FOR_USER'
export const SET_QUEST_ASSIGNING = 'SET_QUEST_ASSIGNING'

export const setQuestForUser = () => {
  return {
    type: SET_QUEST_FOR_USER
  }
}

export const setUserQuestAssigning = (assigning) => {
  return {
    type: SET_QUEST_ASSIGNING,
    payload: assigning
  }
}

export const setAvailableQuestsSelectedId = (selectedId) => {
  return {
    type: SET_AVAILABLE_QUEST_SELECTED_ID,
    payload: selectedId
  }
}

export const getAvailableQuests = () => {
  return {
    type: GET_AVAILABLE_QUESTS
  }
}

export const setAvailableQuests = (availableQuest) => {
  return {
    type: SET_AVAILABLE_QUESTS,
    payload: availableQuest
  }
}

export const setAvailableQuestsLoading = (loading) => {
  return {
    type: SET_AVAILABLE_QUESTS_LOADING,
    payload: loading
  }
}

export const getFamilyMemeberDetails = () => {
  return {
    type: GET_FAMILY_MEMBER_DETAILS
  }
}

export const setFamilyMemeberDetails = (memberInfo) => {
  return {
    type: SET_FAMILY_MEMBER_DETAILS,
    payload: memberInfo
  }
}

export const setFamilyMemeberDetailsLoading = (loading) => {
  return {
    type: SET_FAMILY_MEMBER_DETAILS_LOADING,
    payload: loading
  }
}

export const getFamilyMemeberAchivments = () => {
  return {
    type: GET_FAMILY_MEMBER_ACHIVMENTS
  }
}

export const setFamilyMemeberAchivments = (memberAchivments) => {
  return {
    type: SET_FAMILY_MEMBER_ACHIVMENTS,
    payload: memberAchivments
  }
}

export const setFamilyMemeberAchivmentsLoading = (loading) => {
  return {
    type: SET_FAMILY_MEMBER_ACHIVMENTS_LOADING,
    payload: loading
  }
}

export const getFamilyMemeberQuests = () => {
  return {
    type: GET_FAMILY_MEMBER_QUESTS
  }
}

export const setFamilyMemeberQuests = (memberQuests) => {
  return {
    type: SET_FAMILY_MEMBER_QUESTS,
    payload: memberQuests
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
      if (response.data) {
        dispatch(setFamilyMemeberDetails(response.data))
      }

      dispatch(setFamilyMemeberDetailsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setFamilyMemeberDetailsLoading(false))
    })

    dispatch(loadFamilyMemberQuests(userId))
    dispatch(loadFamilyMemberAchivments(userId))
    dispatch(loadAvailableQuests(userId))
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

export const loadFamilyMemberAchivments = (userId) => {
  return (dispatch, getState) => {
    dispatch(getFamilyMemeberAchivments())
    dispatch(setFamilyMemeberAchivmentsLoading(true))

    axios({
      method: 'Get',
      url: '/FamilyMember/FamilyUserAchivments/' + userId
    }).then(function (response) {
      if (response.data) {
        dispatch(setFamilyMemeberAchivments(response.data.achivmentList))
      }

      dispatch(setFamilyMemeberAchivmentsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setFamilyMemeberAchivmentsLoading(false))
    })
  }
}

export const loadAvailableQuests = (userId) => {
  return (dispatch, getState) => {
    dispatch(getAvailableQuests())
    dispatch(setAvailableQuestsLoading(true))

    axios({
      method: 'Get',
      url: '/Quest/UserAvailableQuests/' + getState().familyInfo.familyId + '/' + userId
    }).then(function (response) {
      if (response.data) {
        dispatch(setAvailableQuests(response.data.quests))
      }

      dispatch(setAvailableQuestsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setAvailableQuestsLoading(false))
    })
  }
}

export const assignQuestToFamilyMember = () => {
  return (dispatch, getState) => {
    dispatch(setQuestForUser())
    dispatch(setUserQuestAssigning(true))
    var state = getState()
    var userId = state.memberDetails.userInfo.userId

    axios({
      method: 'Put',
      url: '/Quest/AssignUserQuest',
      data: {
        UserId: userId,
        QuestId: state.memberDetails.availableQuestSelectedId
      }
    }).then(function (response) {
      dispatch(loadAvailableQuests(userId))
      dispatch(loadFamilyMemberQuests(userId))
      dispatch(setAvailableQuestsSelectedId(''))
      dispatch(setUserQuestAssigning(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setUserQuestAssigning(false))
    })
  }
}

export const onAvailableQuestSelectChanged = (id) => {
  return (dispatch, getState) => {
    dispatch(setAvailableQuestsSelectedId(id))
  }
}

export const onAssignButtonClick = (e) => {
  return (dispatch, getState) => {
    var availableQuestSelectedId = getState().memberDetails.availableQuestSelectedId

    if (availableQuestSelectedId === '') {
      return
    }
    dispatch(assignQuestToFamilyMember())
  }
}

export const actions = {
  loadFamilyMemberDetails,
  onAvailableQuestSelectChanged,
  onAssignButtonClick
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
    (state, action) => _.assign({}, state, { userQuestsLoading: action.payload }),
  [SET_AVAILABLE_QUESTS]:
    (state, action) => _.assign({}, state, { availableQuests: action.payload }),
  [SET_AVAILABLE_QUESTS_LOADING]:
    (state, action) => _.assign({}, state, { availableQuestsLoading: action.payload }),
  [SET_AVAILABLE_QUEST_SELECTED_ID]:
    (state, action) => _.assign({}, state, { availableQuestSelectedId: action.payload }),
  [SET_QUEST_ASSIGNING]:
    (state, action) => _.assign({}, state, { userQuestAssigning: action.payload })
}

const initialState = {
  userInfo: {},
  userAchivments: [],
  userQuests: [],
  availableQuests: [],
  userInfoLoading: true,
  userAchivmentsLoading: true,
  userQuestsLoading: true,
  availableQuestsLoading: true,
  availableQuestSelectedId: '',
  userQuestAssigning: false
}

export default function memberDetailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
