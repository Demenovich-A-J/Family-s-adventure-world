import { injectReducer } from 'store/reducers'
// import { fetchUserFamily } from 'routes/routeEnter'
import requireAuthorization from 'infrastructure/requireAuthorization'

export default (store) => ({
  path: '/family',
  // onEnter: fetchUserFamily(store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const family = requireAuthorization(require('./containers/FamilyContainer').default)
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
