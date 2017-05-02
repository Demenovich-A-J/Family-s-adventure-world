import { injectReducer } from '../../../store/reducers'
import { fetchQuests } from '../../routeEnter'
import requireAuthorization from '../../../infrastructure/requireAuthorization'

export default (store) => ({
  path: '/user/details/:userId',
  // onEnter: fetchQuests(store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const quests = requireAuthorization(require('./containers/UserDetailsContainer').default)
      const reducer = require('./modules/userDetails').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'userDetails',
        reducer
      })

      /*  Return getComponent   */
      cb(null, quests)

    /* Webpack named bundle   */
    }, 'userDetails')
  }
})
