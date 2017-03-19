import { injectReducer } from '../../../store/reducers'
import { fetchUserFamily } from '../../routeEnter'

export default (store) => ({
  path: '/family',
  onEnter: fetchUserFamily(store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const family = require('./containers/FamilyContainer').default
      const reducer = require('./modules/family').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'family',
        reducer
      })

      /*  Return getComponent   */
      cb(null, family)

    /* Webpack named bundle   */
    }, 'family')
  }
})
