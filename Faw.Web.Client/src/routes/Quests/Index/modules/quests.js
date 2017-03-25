import axios from 'axios'
import _ from 'lodash'

// ------------------------------------ Constants
// ------------------------------------
export const LOADING_CHANGED = 'LOADING_CHANGED'
export const OPEN_CREATE_QUEST_DIALOG_CHANGED = 'OPEN_CREATE_QUEST_DIALOG_CHANGED'
export const EDIT_QUEST_ID_CHANGED = 'EDIT_QUEST_ID_CHANGED'
export const EDIT_QUEST_NAME_CHANGED = 'EDIT_QUEST_NAME_CHANGED'
export const EDIT_QUEST_DESCRIPTION_CHANGED = 'EDIT_QUEST_DESCRIPTION_CHANGED'
export const EDIT_QUEST_IS_PUBLIC_CHANGED = 'EDIT_QUEST_IS_PUBLIC_CHANGED'
export const EDIT_QUEST_REQUIERED_LEVEL_CHANGED = 'EDIT_QUEST_REQUIERED_LEVEL_CHANGED'
export const QUEST_TAB_CHANGED = 'QUEST_TAB_CHANGED'
export const FAMILY_QUESTS_CHANGED = 'FAMILY_QUESTS_CHANGED'
export const EDIT_QUEST_COINS_CHANGED = 'EDIT_QUEST_COINS_CHANGED'

// ------------------------------------ Actions
// ------------------------------------
export const setFamilyQuest = (familyQuests) => {
  return {
    type: FAMILY_QUESTS_CHANGED,
    payload: familyQuests
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

// ------------------------------------ Functions
// ------------------------------------

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
        RequiredLevel: editQuestInfo.requiredLevel
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
  setFamilyQuest
}

// ------------------------------------ Action Handlers
// ------------------------------------
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
  [FAMILY_QUESTS_CHANGED]:
    (state, action) => _.assign({}, state, { familyQuests: action.payload })
}

const initialState = {
  loading: false,
  openCreateQuestDialog: true,
  familyQuests: [],
  editQuestInfo: {
    questId: null,
    name: null,
    description: null,
    isPublic: false,
    requiredLevel: 0,
    coins: 0
  },
  tabId: 0
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
