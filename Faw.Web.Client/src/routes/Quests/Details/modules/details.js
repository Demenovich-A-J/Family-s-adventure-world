import axios from 'axios'
import _ from 'lodash'

export const GET_QUEST_DETAILS = 'GET_QUEST_DETAILS'
export const SET_QUEST_DETAILS = 'SET_QUEST_DETAILS'

export const SET_QUEST_DETAILS_LOADING = 'SET_QUEST_DETAILS_LOADING'

export const SET_IS_USER_QUEST = 'SET_IS_USER_QUEST'

export const setIsUserQuest = (isUserQuest) => {
  return {
    type: SET_IS_USER_QUEST,
    payload: isUserQuest
  }
}

export const getQuestDetails = () => {
  return {
    type: GET_QUEST_DETAILS
  }
}

export const setQuestDetails = (quest) => {
  return {
    type: SET_QUEST_DETAILS,
    payload: quest
  }
}

export const setQuestDetailsLoading = (loading) => {
  return {
    type: SET_QUEST_DETAILS_LOADING,
    payload: loading
  }
}

export const loadQuestDetails = (questId, isUserQuest = false) => {
  return (dispatch, getState) => {
    dispatch(getQuestDetails())
    dispatch(setQuestDetailsLoading(true))
    dispatch(setIsUserQuest(isUserQuest))

    var url = ''

    if (isUserQuest) {
      url = '/Quest/FetchUserQuest/'
    } else {
      url = '/Quest/FetchQuest/'
    }

    axios({
      method: 'Get',
      url: url + questId
    }).then(function (response) {
      if (response.data) {
        dispatch(setQuestDetails(response.data))
      }

      dispatch(setQuestDetailsLoading(false))
    }).catch(function (error) {
      console.log(error)
      dispatch(setQuestDetailsLoading(false))
    })
  }
}

export const actions = {
  loadQuestDetails
}

const ACTION_HANDLERS = {
  [SET_QUEST_DETAILS]:
    (state, action) => _.assign({}, state, { quest: action.payload }),
  [SET_QUEST_DETAILS_LOADING]:
    (state, action) => _.assign({}, state, { questDetailsLoading: action.payload }),
  [SET_IS_USER_QUEST]:
   (state, action) => _.assign({}, state, { isUserQuest: action.payload })
}

const initialState = {
  quest: {},
  questDetailsLoading: true,
  isUserQuest: false
}

export default function detailsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
