import { injectReducer } from '../../../store/reducers'

export default (store) => ({
  path: '/achivments',
	// onEnter: funcToExecute(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const achivment = require('./containers/AchivmentContainer').default
      const reducer = require('./modules/achivment').default
      injectReducer(store, {
        key: 'achivment',
        reducer
      })

      cb(null, achivment)
    }, 'achivment')
  }
})
