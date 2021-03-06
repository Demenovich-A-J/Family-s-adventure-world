import { combineReducers } from 'redux'
import locationReducer from './location'
import userReducer from './user'
import familyInfoReducer from './familyInfo'
import enums from './enums'

import { loadingBarReducer } from 'react-redux-loading-bar'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    familyInfo: familyInfoReducer,
    loadingBar: loadingBarReducer,
    enums: enums,
    ...asyncReducers
  })
}

export const injectReducer = (store, {
  key,
  reducer
}) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
