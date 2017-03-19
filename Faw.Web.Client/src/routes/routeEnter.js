import { setGendersInfo, setGender } from './Register/modules/register'
import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const loadGendersOnEnter = (store) => (nextState, replace) => {
  store.dispatch(showLoading())
  axios({ method: 'Get', url: '/Account/FetchGendersInfo' }).then(function (response) {
    store.dispatch(hideLoading())
    store.dispatch(setGendersInfo(response.data))
    store.dispatch(setGender(response.data.genders[0]))
  })
}

export const checkResetStatusOnEnter = (store) => (nextState, replace) => {
  store.dispatch(showLoading())
  axios({ method: 'Get', url: '/Account/ResetPassword/' }).then(function (response) {
    store.dispatch(hideLoading())
    store.dispatch(setGendersInfo(response.data))
  })
}
