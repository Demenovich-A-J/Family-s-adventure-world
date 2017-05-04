import axios from 'axios'
import _ from 'lodash'
import { fetchUserFamilyInfo } from 'store/familyInfo'

// ------------------------------------ Constants
// ------------------------------------
export const LOADING_CHANGED = 'LOADING_CHANGED'
export const FAMALY_NAME_CHANGED = 'FAMALY_NAME_CHANGED'
export const OPEN_FAMILY_DIALOG_CHANGED = 'OPEN_FAMILY_DIALOG_CHANGED'
export const SEARCH_TEXT_CHANGED = 'SEARCH_TEXT_CHANGED'
export const SEARCH_RESULTS_CHANGED = 'SEARCH_RESULTS_CHANGED'
export const SEARCHING_USERS_CHANGED = 'SEARCHING_USERS_CHANGED'

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

export const setOpenFamilyDialog = (open) => {
  return {
    type: OPEN_FAMILY_DIALOG_CHANGED,
    payload: open
  }
}

export const setSearchText = (val) => {
  return {
    type: SEARCH_TEXT_CHANGED,
    payload: val
  }
}

export const setSearchResults = (results) => {
  return {
    type: SEARCH_RESULTS_CHANGED,
    payload: results
  }
}

export const setSearchingUsers = (searching) => {
  return {
    type: SEARCHING_USERS_CHANGED,
    payload: searching
  }
}
// ------------------------------------ Functions
// ------------------------------------

export const formSubmitHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setLoading(true))

    var state = getState()
    var url = state.familyInfo.family !== null ? '/Family/Edit' : '/Family/Create'

    axios({
      method: 'Post',
      url: url,
      data: {
        FamilyId: state.familyInfo.family.familyId,
        Name: state.family.familyName,
        CreatedById: state.user.userInfo.userId
      }
    }).then(function (response) {
      // do we need to update family data fetched from server?
      // all required data will be updated with help of user
      // may be we need just to refetch user family info?
      dispatch(fetchUserFamilyInfo())
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

export const searchInputHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setSearchText(e.target.value))

    var text = getState().family.searchText
    if (text === '') {
      dispatch(setSearchResults([]))
      dispatch(setSearchingUsers(false))

      return
    }

    dispatch(setSearchingUsers(true))

    axios({
      method: 'Get',
      url: '/User/SearchUsersForFamily/' + text
    }).then(function (response) {
      if (response.data) {
        dispatch(setSearchResults(response.data))
      }
      dispatch(setSearchingUsers(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setSearchingUsers(false))
    })
  }
}

export const searchItemClickHandler = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    dispatch(setLoading(true))

    axios({
      method: 'Put',
      url: '/Family/AddFamilyMember/',
      data: {
        UserId: e.target.dataset.id,
        FamilyId: getState().family.family.familyId
      }
    }).then(function (response) {
      dispatch(setLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setLoading(false))
    })
  }
}

export const onSearchInputBlur = (e) => {
  return (dispatch, getState) => {
    dispatch(setSearchResults([]))
  }
}

export const searchInputClickHandler = (e) => {
  return (dispatch, getState) => {
    dispatch(searchInputHandler(e))
  }
}

export const actions = {
  formSubmitHandler,
  familyNameChangeHandler,
  openFamilyDialog,
  closeFamilyDialog,
  searchInputHandler,
  searchItemClickHandler,
  onSearchInputBlur,
  searchInputClickHandler
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOADING_CHANGED]: (state, action) => Object.assign({}, state, { loading: action.payload }),
  [FAMALY_NAME_CHANGED]: (state, action) => Object.assign({}, state, { familyName: action.payload }),
  [OPEN_FAMILY_DIALOG_CHANGED]: (state, action) => Object.assign({}, state, { openFamilyDialog: action.payload }),
  [SEARCH_TEXT_CHANGED]: (state, action) => Object.assign({}, state, { searchText: action.payload }),
  [SEARCH_RESULTS_CHANGED]: (state, action) => Object.assign({}, state, { searchResults: action.payload }),
  [SEARCHING_USERS_CHANGED]: (state, action) => Object.assign({}, state, { searchingUsers: action.payload })
}

const initialState = {
  familyName: '',
  familyInfo: null,
  loading: false,
  openFamilyDialog: false,
  searchText: null,
  searchResults: null,
  searchingUsers: false
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
