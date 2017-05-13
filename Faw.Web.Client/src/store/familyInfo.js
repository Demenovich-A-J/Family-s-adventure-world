import axios from 'axios'
import _ from 'lodash'

export const FAMILY_CHANGED = 'FAMILY_CHANGED'

export const setFamilyInfo = (family) => {
  return {
    type: FAMILY_CHANGED,
    payload: family
  }
}

export function fetchUserFamilyInfo () {
  return (dispatch, getState) => {
    var state = getState()

    if (state.familyInfo) {
      var isFamilyMember = _.some(state.familyInfo.familyMembers, (fm) => fm.id === state.user.userInfo.userId)

      if (!isFamilyMember && state.familyInfo.createdById !== state.user.userInfo.userId) {
        dispatch(setFamilyInfo(null))
      }
    }

    if (!_.isNil(state.user.userInfo)) {
      var request = axios({
        method: 'Get',
        url: '/Family/FetchUserFamily/' + state.user.userInfo.userId
      }).then(function (response) {
        if (response.data) {
          dispatch(setFamilyInfo(response.data))
          localStorage.setItem('family', JSON.stringify(response.data))
        }
      }).catch(function (error) {
        console.log(error)
      })

      return request
    }
  }
}

export const actions = {
  setFamilyInfo,
  fetchUserFamilyInfo
}

const ACTION_HANDLERS = {
  [FAMILY_CHANGED]:
     (state, action) => {
       if (action.payload === null) {
         return action.payload
       } else {
         return _.assign({}, state, action.payload)
       }
     }
}

function _getInitialState () {
  return JSON.parse(localStorage.getItem('family'))
}

const initialState = _getInitialState()

export default function familyInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
