import axios from 'axios'
import { browserHistory } from 'react-router'

export const setBaseUrl = () => {
  Object.assign(axios.defaults, {
    baseURL: API_URL
  })
}

export const setBaererToken = (token) => {
  Object.assign(axios.defaults, {
    headers: {
      common: {
        authorization: 'Bearer ' + token
      }
    }
  })
}

export const resetBaererToken = () => {
  Object.assign(axios.defaults, {
    headers: {
      common: {
        authorization: null
      }
    }
  })
}

export const setUnAuthorizedHandler = () => {
  axios.interceptors.response.use(null, function (error) {
    if (error.response.status === 401) {
      browserHistory.push('/Account/Login')
      return Promise.reject(error)
    }
  })
}
const axiosUtil = {
  setBaseUrl,
  setBaererToken,
  resetBaererToken,
  setUnAuthorizedHandler
}

export default axiosUtil
