import axios from 'axios'
import _ from 'lodash'

import { setGendersInfo, setGender } from './Register/modules/register'
import { fetchUserFamilyInfo } from 'store/familyInfo'
import { setFamilyQuest } from './Quests/Index/modules/quests'
import { loadFamilyMemberDetails } from './Family/MemberDetails/modules/memberDetails'

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
  store.dispatch(showLoading())
  var data = store.getState().user

  if (!data.isAuthenticated) {
    return
  }

  axios({
    method: 'Get',
    url: '/Quest/FetchQuests/' + data.userInfo.userId
  }).then(function (response) {
    store.dispatch(setFamilyQuest(response.data.quests))
    store.dispatch(hideLoading())
  }).catch(function (error) {
    console.log(error)
    store.dispatch(hideLoading())
  })
}

export const fetchUserFamily = (store) => (nextState, replace) => {
  store.dispatch(fetchUserFamilyInfo())
}

export const fetchFamilyMemberDetails = (store) => (nextState, replace) => {
  store.dispatch(loadFamilyMemberDetails(nextState.params.userId))
}
