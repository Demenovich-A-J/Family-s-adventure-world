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

    if (!_.isNil(state.user.userInfo)) {
      axios({
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
    }
  }
}

export const actions = {
  setFamilyInfo,
  fetchUserFamilyInfo
}

const ACTION_HANDLERS = {
  [FAMILY_CHANGED]:
     (state, action) => _.assign({}, state, { family: action.payload })
}

function _getInitialState () {
  return {
    family: JSON.parse(localStorage.getItem('family'))
  }
}

const initialState = _getInitialState()

export default function familyInfoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
