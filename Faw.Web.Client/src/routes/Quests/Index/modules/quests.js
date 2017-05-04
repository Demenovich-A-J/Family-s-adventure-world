import axios from 'axios'
import _ from 'lodash'
import { browserHistory } from 'react-router'

export const LOADING_CHANGED = 'LOADING_CHANGED'
export const OPEN_CREATE_QUEST_DIALOG_CHANGED = 'OPEN_CREATE_QUEST_DIALOG_CHANGED'
export const EDIT_QUEST_ID_CHANGED = 'EDIT_QUEST_ID_CHANGED'
export const EDIT_QUEST_NAME_CHANGED = 'EDIT_QUEST_NAME_CHANGED'
export const EDIT_QUEST_DESCRIPTION_CHANGED = 'EDIT_QUEST_DESCRIPTION_CHANGED'
export const EDIT_QUEST_IS_PUBLIC_CHANGED = 'EDIT_QUEST_IS_PUBLIC_CHANGED'
export const EDIT_QUEST_REQUIERED_LEVEL_CHANGED = 'EDIT_QUEST_REQUIERED_LEVEL_CHANGED'
export const QUEST_TAB_CHANGED = 'QUEST_TAB_CHANGED'
export const EDIT_QUEST_COINS_CHANGED = 'EDIT_QUEST_COINS_CHANGED'

export const GET_FAMILY_QUESTS = 'GET_FAMILY_QUESTS'
export const SET_FAMILY_QUESTS = 'SET_FAMILY_QUESTS'

export const GET_USER_QUESTS = 'GET_USER_QUESTS'
export const SET_USER_QUESTS = 'SET_USER_QUESTS'

export const SET_FAMILY_QUESTS_LOADING = 'SET_FAMILY_QUESTS_LOADING'
export const SET_USER_QUESTS_LOADING = 'SET_USER_QUESTS_LOADING'

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

export const setQuestId = (id) => {
  return {
    type: EDIT_QUEST_ID_CHANGED,
    payload: id
  }
}

export const setQuestName = (name) => {
  return {
    type: EDIT_QUEST_NAME_CHANGED,
    payload: name
  }
}

export const setQuestDescription = (description) => {
  return {
    type: EDIT_QUEST_DESCRIPTION_CHANGED,
    payload: description
  }
}

export const setQuestIsPublic = (isPublic) => {
  return {
    type: EDIT_QUEST_IS_PUBLIC_CHANGED,
    payload: isPublic
  }
}

export const setQuestRequieredLevel = (level) => {
  return {
    type: EDIT_QUEST_REQUIERED_LEVEL_CHANGED,
    payload: level
  }
}

export const setEditQuestCoins = (coins) => {
  return {
    type: EDIT_QUEST_COINS_CHANGED,
    payload: coins
  }
}

export const closeCreateQuestDialogHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setOpenCreateQuestDialog(false))
  }
}

export const openCreateQuestDialogHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setOpenCreateQuestDialog(true))
  }
}

export const onSubmitCreateQuestFormHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    // TODO: change all loading to more concrete
    dispatch(setLoading(true))
    let url = ''
    let state = getState()
    var editQuestInfo = state.quests.editQuestInfo

    if (_.isNil(state.quests.editQuestInfo.questId)) {
      url = '/Quest/Create'
    } else {
      url = '/Quest/Update'
    }

    axios({
      method: 'Put',
      url: url,
      data: {
        CreatedById: state.user.userInfo.userId,
        Name: editQuestInfo.name,
        Description: editQuestInfo.description,
        IsPublic: editQuestInfo.IsPublic,
        RequiredLevel: editQuestInfo.requiredLevel,
        Coins: editQuestInfo.coins,
        FamilyId: state.familyInfo.family.familyId
      }
    }).then(function (response) {
      dispatch(setLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setLoading(false))
    })
  }
}

export const editInfoNameChangeHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setQuestName(e.target.value))
  }
}

export const editInfoDescriptionChangeHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setQuestDescription(e.target.value))
  }
}

export const editInfoIsPublicChangeHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setQuestIsPublic(e.target.checked))
  }
}

export const editInfoRequieredLevelChangeHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setQuestRequieredLevel(e.target.value))
  }
}

export const editInfoCoinsChangeHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setEditQuestCoins(e.target.value))
  }
}

export const questTabHandler = (tabId) => {
  return (dispatch, getState) => {
    dispatch(setQuestTab(tabId))
  }
}

export const onEditButtonClick = (e) => {
  return (dispatch, getState) => {
    console.log(e.target.parentElement.dataset.id)
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
        id: element.id
      }
    })
  })
}

export const actions = {
  closeCreateQuestDialogHandler,
  openCreateQuestDialogHandler,
  onSubmitCreateQuestFormHandler,
  editInfoNameChangeHandler,
  editInfoDescriptionChangeHandler,
  editInfoIsPublicChangeHandler,
  editInfoRequieredLevelChangeHandler,
  editInfoCoinsChangeHandler,
  questTabHandler,
  setFamilyQuests,
  loadUserQuests,
  loadFamilyQuests,
  onEditButtonClick
}

const ACTION_HANDLERS = {
  [LOADING_CHANGED]:
    (state, action) => _.assign({}, state, { loading: action.payload }),
  [OPEN_CREATE_QUEST_DIALOG_CHANGED]:
    (state, action) => _.assign({}, state, { openCreateQuestDialog: action.payload }),
  [EDIT_QUEST_ID_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { questId: action.payload } }),
  [EDIT_QUEST_NAME_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { name: action.payload } }),
  [EDIT_QUEST_DESCRIPTION_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { description: action.payload } }),
  [EDIT_QUEST_IS_PUBLIC_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { isPublic: action.payload } }),
  [EDIT_QUEST_REQUIERED_LEVEL_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { requiredLevel: action.payload } }),
  [EDIT_QUEST_COINS_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { coins: action.payload } }),
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
    (state, action) => _.assign({}, state, { userQuestsLoading: action.payload })
}

const initialState = {
  loading: false,
  openCreateQuestDialog: false,
  familyQuests: [],
  userQuests: [],
  editQuestInfo: {
    questId: null,
    name: null,
    description: null,
    isPublic: false,
    requiredLevel: 0,
    coins: 0
  },
  tabId: 1,
  familyQuestsLoading: false,
  userQuestsLoading: false
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
