import { injectReducer } from 'store/reducers'
import { loadGendersOnEnter } from 'routes/routeEnter'

export default(store) => ({
  path: '/Account/Register',
  onEnter: loadGendersOnEnter(store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const register = require('./containers/RegisterContainer').default
      const reducer = require('./modules/register').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'register',
        reducer
      })

      /*  Return getComponent   */
      cb(null, register)

      /* Webpack named bundle   */
    }, 'register')
  }
})
