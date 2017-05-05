import axios from 'axios'

import { fetchUserFamilyInfo } from 'store/familyInfo'

import { setGendersInfo, setGender } from './Register/modules/register'

import { loadUserQuests, loadFamilyQuests } from './Quests/Index/modules/quests'
import { loadQuestDetails } from './Quests/Details/modules/details'

import { loadFamilyMemberDetails } from './Family/MemberDetails/modules/memberDetails'

import { loadUserDetails } from './User/Details/modules/userDetails'

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const loadGendersOnEnter = (store) => (nextState, replace) => {
  store.dispatch(showLoading())

  if (!store.getState().user.isAuthenticated) {
    return
  }

  axios({ method: 'Get', url: '/Account/FetchGendersInfo' })
  .then(function (response) {
    store.dispatch(hideLoading())
    store.dispatch(setGendersInfo(response.data))
    store.dispatch(setGender(response.data.genders[0]))
  }).catch(function (error) {
    console.log(error)
    store.dispatch(hideLoading())
  })
}

export const checkResetStatusOnEnter = (store) => (nextState, replace) => {
  store.dispatch(showLoading())
  axios({ method: 'Get', url: '/Account/ResetPassword/' })
  .then(function (response) {
    store.dispatch(hideLoading())
    store.dispatch(setGendersInfo(response.data))
  }).catch(function (error) {
    console.log(error)
    store.dispatch(hideLoading())
  })
}

export const fetchQuests = (store) => (nextState, replace) => {
  var state = store.getState()

  if (!state.user.isAuthenticated) {
    return
  }

  store.dispatch(loadFamilyQuests(state.familyInfo.family.familyId))
  store.dispatch(loadUserQuests(state.user.userInfo.userId))
}

export const fetchUserFamily = (store) => (nextState, replace) => {
  store.dispatch(fetchUserFamilyInfo())
}

export const fetchFamilyMemberDetails = (store) => (nextState, replace) => {
  store.dispatch(loadFamilyMemberDetails(nextState.params.userId))
}

export const fetchQuestDetails = (store) => (nextState, replace) => {
  store.dispatch(loadQuestDetails(nextState.params.questId, nextState.params.isUserQuest))
}

export const fetchUserDetails = (store) => (nextState, replace) => {
  store.dispatch(loadUserDetails(nextState.params.userId))
}
