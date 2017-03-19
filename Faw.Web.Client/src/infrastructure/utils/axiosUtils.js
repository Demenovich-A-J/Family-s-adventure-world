import axios from 'axios'

function setBaseUrl () {
  Object.assign(axios.defaults, {
    baseURL: API_URL
  })
}

function setBaererToken (token) {
  Object.assign(axios.defaults, {
    headers: {
      common: {
        authorization: 'Bearer ' + token
      }
    }
  })
}

const axiosUtil = {
  setBaseUrl,
  setBaererToken
}

export default axiosUtil
