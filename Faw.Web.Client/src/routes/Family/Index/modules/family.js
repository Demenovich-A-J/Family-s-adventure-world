import axios from 'axios'
import _ from 'lodash'
import { fetchUserFamilyInfo } from 'store/familyInfo'
import { actions as reduxFormActions } from 'react-redux-form'

// ------------------------------------ Constants
// ------------------------------------
export const LOADING_CHANGED = 'LOADING_CHANGED'
export const OPEN_FAMILY_DIALOG_CHANGED = 'OPEN_FAMILY_DIALOG_CHANGED'
export const SEARCH_TEXT_CHANGED = 'SEARCH_TEXT_CHANGED'
export const SEARCH_RESULTS_CHANGED = 'SEARCH_RESULTS_CHANGED'
export const SEARCHING_USERS_CHANGED = 'SEARCHING_USERS_CHANGED'

export const SET_FAMILY_INFO_LOADING = 'SET_FAMILY_INFO_LOADING'

export const setFamilyInfoLoading = (loading) => {
  return {
    type: SET_FAMILY_INFO_LOADING,
    payload: loading
  }
}

export const setLoading = (loading) => {
  return {
    type: LOADING_CHANGED,
    payload: loading
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

export const openFamilyDialog = (e) => {
  e.preventDefault()

  return (dispatch, getState) => {
    var state = getState()
    var familyInfo = state.familyInfo

    if (!_.isNil(familyInfo)) {
      dispatch(setFamilyEditInfo())
    } else {
      dispatch(reduxFormActions.change('familyEditInfo.createdById', state.user.userInfo.userId))
    }

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
  console.log(e)
  return (dispatch, getState) => {
    dispatch(setLoading(true))

    axios({
      method: 'Post',
      url: '/Family/AddFamilyMember/',
      data: {
        UserId: e.target.dataset.id,
        FamilyId: getState().familyInfo.familyId
      }
    }).then(function (response) {
      dispatch(setLoading(false))
      dispatch(setSearchResults([]))
      dispatch(setSearchText(''))

      dispatch(setFamilyInfoLoading(true))

      dispatch(fetchUserFamilyInfo()).then(() => {
        dispatch(setFamilyInfoLoading(false))
      }).catch(() => {
        dispatch(setFamilyInfoLoading(false))
      })
    }).catch(function (error) {
      console.log(error)
      dispatch(setLoading(false))
    })
  }
}

export const onSearchInputBlur = (e) => {
  return (dispatch, getState) => {
    // dispatch(setSearchResults([]))
  }
}

export const searchInputClickHandler = (e) => {
  return (dispatch, getState) => {
    dispatch(searchInputHandler(e))
  }
}

export const submitFamilyForm = (e) => {
  return (dispatch, getState) => {
    var state = getState()
    var method = 'Post'
    var url = '/Family/Edit'

    if (state.familyInfo === null) {
      method = 'Post'
      url = '/Family/Create'
    }

    var sendRequest = axios({
      method: method,
      url: url,
      data: state.familyEditInfo
    }).then(function (response) {
      dispatch(fetchUserFamilyInfo())
      dispatch(setOpenFamilyDialog(false))
      dispatch(setLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setLoading(false))
    })

    dispatch(reduxFormActions.submit('familyEditInfo', sendRequest))
  }
}

export const setFamilyEditInfo = () => {
  return (dispatch, getState) => {
    var familyInfo = getState().familyInfo
    dispatch(reduxFormActions.load('familyEditInfo', {
      familyId: familyInfo.familyId,
      name: familyInfo.name,
      description: familyInfo.description,
      goal: familyInfo.goal,
      createdById: familyInfo.createdById
    }))
  }
}

export const actions = {
  openFamilyDialog,
  closeFamilyDialog,
  searchInputHandler,
  searchItemClickHandler,
  onSearchInputBlur,
  searchInputClickHandler,
  submitFamilyForm
}

const ACTION_HANDLERS = {
  [LOADING_CHANGED]: (state, action) => _.assign({}, state, { loading: action.payload }),
  [OPEN_FAMILY_DIALOG_CHANGED]: (state, action) => _.assign({}, state, { openFamilyDialog: action.payload }),
  [SEARCH_TEXT_CHANGED]: (state, action) => _.assign({}, state, { searchText: action.payload }),
  [SEARCH_RESULTS_CHANGED]: (state, action) => _.assign({}, state, { searchResults: action.payload }),
  [SEARCHING_USERS_CHANGED]: (state, action) => _.assign({}, state, { searchingUsers: action.payload }),
  [SET_FAMILY_INFO_LOADING]:
    (state, action) => _.assign({}, state, { familyInfoLoading: action.payload })

}

const initialState = {
  loading: false,
  openFamilyDialog: false,
  searchText: null,
  searchResults: null,
  searchingUsers: false,
  familyInfoLoading: false
}

export default function questsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
