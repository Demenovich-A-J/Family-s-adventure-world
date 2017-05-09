import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: '/achivments/details(/:achivmentId)',
	// onEnter: funcToExecute(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const achivmentDetails = require('./containers/AchivmentDetailsContainer').default
      const reducer = require('./modules/achivmentDetails').default
      injectReducer(store, {
        key: 'achivmentDetails',
        reducer
      })

      cb(null, achivmentDetails)
    }, 'achivmentDetails')
  }
})
