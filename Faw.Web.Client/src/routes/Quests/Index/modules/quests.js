import axios from 'axios'
import _ from 'lodash'
import { actions as reduxFormActions } from 'react-redux-form'
import questFormInitialState from './questForm'

export const LOADING_CHANGED = 'LOADING_CHANGED'
export const OPEN_CREATE_QUEST_DIALOG_CHANGED = 'OPEN_CREATE_QUEST_DIALOG_CHANGED'

export const QUEST_TAB_CHANGED = 'QUEST_TAB_CHANGED'

export const GET_QUEST_INFO = 'GET_QUEST_INFO'

export const GET_FAMILY_QUESTS = 'GET_FAMILY_QUESTS'
export const SET_FAMILY_QUESTS = 'SET_FAMILY_QUESTS'

export const GET_USER_QUESTS = 'GET_USER_QUESTS'
export const SET_USER_QUESTS = 'SET_USER_QUESTS'

export const SET_FAMILY_QUESTS_LOADING = 'SET_FAMILY_QUESTS_LOADING'
export const SET_USER_QUESTS_LOADING = 'SET_USER_QUESTS_LOADING'
export const SET_QUEST_INFO_LOADING = 'SET_QUEST_INFO_LOADING'

export const SAVE_QUEST_INFO = 'SAVE_QUEST_INFO'

export const SET_QUEST_FORM_SUBMITTING = 'SET_QUEST_FORM_SUBMITTING'

export const getQuestInfo = () => {
  return {
    type: GET_QUEST_INFO
  }
}

export const setQuestInfoLoading = (loading) => {
  return {
    type: SET_QUEST_INFO_LOADING,
    payload: loading
  }
}

export const setQuestFormSubmitting = (submiting) => {
  return {
    type: SET_QUEST_FORM_SUBMITTING,
    payload: submiting
  }
}

export const saveQuestInfo = () => {
  return {
    type: SAVE_QUEST_INFO
  }
}

export const getFamilyQuests = () => {
  return {
    type: GET_FAMILY_QUESTS
  }
}

export const setFamilyQuests = (familyQuests) => {
  return {
    type: SET_FAMILY_QUESTS,
    payload: familyQuests
  }
}

export const setFamilyQuestsLoading = (loading) => {
  return {
    type: SET_FAMILY_QUESTS_LOADING,
    payload: loading
  }
}

export const getUserQuests = () => {
  return {
    type: GET_USER_QUESTS
  }
}

export const setUserQuests = (userQuests) => {
  return {
    type: SET_USER_QUESTS,
    payload: userQuests
  }
}

export const setUserQuestsLoading = (loading) => {
  return {
    type: SET_USER_QUESTS_LOADING,
    payload: loading
  }
}

export const setQuestTab = (questTab) => {
  return {
    type: QUEST_TAB_CHANGED,
    payload: questTab
  }
}

export const setLoading = (loading) => {
  return {
    type: LOADING_CHANGED,
    payload: loading
  }
}

export const setOpenCreateQuestDialog = (open) => {
  return {
    type: OPEN_CREATE_QUEST_DIALOG_CHANGED,
    payload: open
  }
}

export const closeCreateQuestDialogHandler = (e) => {
  return (dispatch, getState) => {
    dispatch(reduxFormActions.load('questInfo', questFormInitialState))

    dispatch(setOpenCreateQuestDialog(false))
  }
}

export const openCreateQuestDialogHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setOpenCreateQuestDialog(true))
  }
}

export const questTabHandler = (tabId) => {
  return (dispatch, getState) => {
    dispatch(setQuestTab(tabId))
  }
}

export const onEditButtonClick = (e) => {
  return (dispatch, getState) => {
    let id = e.target.parentElement.dataset.id
    if (_.isNil(id)) {
      return
    }
    dispatch(loadQuestInfo(id))
  }
}

export const loadQuestInfo = (questId) => {
  return (dispatch, getState) => {
    dispatch(getQuestInfo())
    dispatch(setQuestInfoLoading(true))
    dispatch(setOpenCreateQuestDialog(true))

    axios({
      method: 'Get',
      url: '/Quest/FetchQuest/' + questId
    }).then(function (response) {
      if (response.data) {
        dispatch(reduxFormActions.load('questInfo', response.data))
      }

      dispatch(setQuestInfoLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setQuestInfoLoading(false))
    })
  }
}

export const submitQuestFormHandler = (model) => {
  return (dispatch, getState) => {
    // TODO: change all loading to more concrete
    dispatch(setQuestFormSubmitting(true))
    let url = ''
    let method = ''
    let state = getState()
    let questInfo = state.questInfo

    if (_.isNil(questInfo.questId)) {
      url = '/Quest/Create'
      method = 'Put'
    } else {
      url = '/Quest/Update'
      method = 'Post'
    }

    axios({
      method: method,
      url: url,
      data: _.extend({}, questInfo, {
        familyId: state.familyInfo.family.familyId
      })
    }).then(function (response) {
      dispatch(loadFamilyQuests(state.familyInfo.family.familyId))
      dispatch(reduxFormActions.load('questInfo', questFormInitialState))
      dispatch(setQuestFormSubmitting(false))
      dispatch(setOpenCreateQuestDialog(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setQuestFormSubmitting(false))
    })
  }
}

export const loadUserQuests = (userId) => {
  return (dispatch, getState) => {
    dispatch(getUserQuests())
    dispatch(setUserQuestsLoading(true))

    axios({
      method: 'Get',
      url: '/Quest/FetchUserQuests/' + userId
    }).then(function (response) {
      if (response.data) {
        dispatch(setUserQuests(response.data.quests))
      }

      dispatch(setUserQuestsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setUserQuestsLoading(false))
    })
  }
}

export const loadFamilyQuests = (familyId) => {
  return (dispatch, getState) => {
    dispatch(getFamilyQuests())
    dispatch(setFamilyQuestsLoading(true))

    axios({
      method: 'Get',
      url: '/Quest/FetchFamilyQuests/' + familyId
    }).then(function (response) {
      if (response.data) {
        dispatch(setFamilyQuests(response.data.quests))
      }

      dispatch(setFamilyQuestsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setFamilyQuestsLoading(false))
    })
  }
}

export const addActionsToQuests = (quests) => {
  return _.map(quests, function (element) {
    return _.extend({}, element, {
      actions : {
        type: 'edit',
        id: element.questId
      }
    })
  })
}

export const actions = {
  closeCreateQuestDialogHandler,
  openCreateQuestDialogHandler,
  submitQuestFormHandler,
  questTabHandler,
  setFamilyQuests,
  loadUserQuests,
  loadFamilyQuests,
  onEditButtonClick,
  loadQuestInfo
}

const ACTION_HANDLERS = {
  [LOADING_CHANGED]:
    (state, action) => _.assign({}, state, { loading: action.payload }),
  [OPEN_CREATE_QUEST_DIALOG_CHANGED]:
    (state, action) => _.assign({}, state, { openCreateQuestDialog: action.payload }),
  [QUEST_TAB_CHANGED]:
    (state, action) => _.assign({}, state, { tabId: action.payload }),
  [SET_FAMILY_QUESTS]:
    (state, action) => {
      return _.assign({}, state, { familyQuests: addActionsToQuests(action.payload) })
    },
  [SET_USER_QUESTS]:
    (state, action) => {
      return _.assign({}, state, { userQuests: addActionsToQuests(action.payload) })
    },
  [SET_FAMILY_QUESTS_LOADING]:
    (state, action) => _.assign({}, state, { familyQuestsLoading: action.payload }),
  [SET_USER_QUESTS_LOADING]:
    (state, action) => _.assign({}, state, { userQuestsLoading: action.payload }),
  [SET_QUEST_FORM_SUBMITTING]:
    (state, action) => _.assign({}, state, { questFormSubmitting: action.payload }),
  [SET_QUEST_INFO_LOADING]:
    (state, action) => _.assign({}, state, { questInfoLoading: action.payload })
}

export const initialState = {
  loading: false,
  openCreateQuestDialog: false,
  familyQuests: [],
  userQuests: [],
  tabId: 1,
  familyQuestsLoading: false,
  userQuestsLoading: false,
  questFormSubmitting: false,
  questInfoLoading: false
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
