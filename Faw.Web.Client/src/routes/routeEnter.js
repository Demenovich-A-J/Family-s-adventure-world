import axios from 'axios'
import _ from 'lodash'

import { fetchUserFamilyInfo } from 'store/familyInfo'
import { loadGenders } from 'store/enums'

import { setGender } from './Register/modules/register'

import { loadUserQuests, loadFamilyQuests } from './Quests/Index/modules/quests'
import { loadQuestDetails } from './Quests/Details/modules/details'

import { loadFamilyMemberDetails } from './Family/MemberDetails/modules/memberDetails'

import { loadUserDetails } from './User/Details/modules/userDetails'

import { loadAchivments } from './Achivment/Index/modules/achivment'
import { loadAchivment } from './Achivment/Details/modules/achivmentDetails'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const loadGendersOnEnter = (store) => (nextState, replace) => {
  store.dispatch(loadGenders()).then(
    function (response) {
      store.dispatch(setGender(response.data.genders[0]))
    }
  )
}

export const checkResetStatusOnEnter = (store) => (nextState, replace) => {
  store.dispatch(showLoading())
  axios({ method: 'Get', url: '/Account/ResetPassword/' })
  .then(function (response) {
    store.dispatch(hideLoading())
  }).catch(function (error) {
    console.log(error)
    store.dispatch(hideLoading())
  })
}

export const loadFamily = (store) => (nextState, replace) => {
  store.dispatch(fetchUserFamilyInfo())
}

export const fetchQuests = (store) => (nextState, replace) => {
  var state = store.getState()

  if (!state.user.isAuthenticated) {
    return
  }

  store.dispatch(loadFamilyQuests(state.familyInfo.familyId))
  store.dispatch(loadUserQuests(state.user.userInfo.userId))
}

export const fetchFamilyMemberDetails = (store) => (nextState, replace) => {
  store.dispatch(loadFamilyMemberDetails(nextState.params.userId))
}

export const fetchQuestDetails = (store) => (nextState, replace) => {
  store.dispatch(loadQuestDetails(nextState.params.questId, nextState.params.isUserQuest))
}

export const fetchUserDetails = (store) => (nextState, replace) => {
  store.dispatch(loadUserDetails(nextState.params.userId))
  store.dispatch(loadGenders())
}

export const fetchAchivments = (store) => (nextState, replace) => {
  store.dispatch(loadAchivments())
}

export const fetchAchivment = (store) => (nextState, replace) => {
  if (!_.isNil(nextState.params.achivmentId)) {
    store.dispatch(loadAchivment(nextState.params.achivmentId))
  }
}
