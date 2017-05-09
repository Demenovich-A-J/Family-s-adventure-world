import { injectReducer } from 'store/reducers'
import { fetchUserDetails } from 'routes/routeEnter'
import requireAuthorization from 'infrastructure/requireAuthorization'
import { modelReducer, formReducer } from 'react-redux-form'

export default (store) => ({
  path: '/user/details/:userId',
  onEnter: fetchUserDetails(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const quests = requireAuthorization(require('./containers/UserDetailsContainer').default)
      const reducer = require('./modules/userDetails').default
      var model = require('./modules/userDetailsInfoForm').default

      injectReducer(store, {
        key: 'userDetails',
        reducer
      })

      injectReducer(store, {
        key: 'userDetailsInfo',
        reducer: modelReducer('userDetailsInfo', model)
      })

      injectReducer(store, {
        key: 'userDetailsInfoForm',
        reducer: formReducer('userDetailsInfo', model)
      })
      /*  Return getComponent   */
      cb(null, quests)

    /* Webpack named bundle   */
    }, 'userDetails')
  }
})
