import axios from 'axios'
import _ from 'lodash'

export const actions = {
}

const ACTION_HANDLERS = {
}

const initialState = 0

export default function notFoundReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
