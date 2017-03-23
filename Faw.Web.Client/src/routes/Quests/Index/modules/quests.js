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

// ------------------------------------ Actions
// ------------------------------------
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

export const actions = {
  closeCreateQuestDialogHandler,
  openCreateQuestDialogHandler,
  onSubmitCreateQuestFormHandler,
  editInfoNameChangeHandler,
  editInfoDescriptionChangeHandler,
  editInfoIsPublicChangeHandler,
  editInfoRequieredLevelChangeHandler
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_CHANGED]:
    (state, action) => Object.assign({}, state, { loading: action.payload }),
  [OPEN_CREATE_QUEST_DIALOG_CHANGED]:
    (state, action) => Object.assign({}, state, { openCreateQuestDialog: action.payload }),
  [EDIT_QUEST_ID_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { questId: action.payload } }),
  [EDIT_QUEST_NAME_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { name: action.payload } }),
  [EDIT_QUEST_DESCRIPTION_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { description: action.payload } }),
  [EDIT_QUEST_IS_PUBLIC_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { isPublic: action.payload } }),
  [EDIT_QUEST_REQUIERED_LEVEL_CHANGED]:
    (state, action) => _.merge({}, state, { editQuestInfo: { requiredLevel: action.payload } })
}

const initialState = {
  loading: false,
  openCreateQuestDialog: true,
  editQuestInfo: {
    questId: null,
    name: null,
    description: null,
    isPublic: false,
    requiredLevel: 0
  }
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
