import { injectReducer } from '../../../store/reducers'
import { fetchQuests } from '../../routeEnter'

export default (store) => ({
  path: '/quests',
  onEnter: fetchQuests(store),
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const quests = require('./containers/QuestsContainer').default
      const reducer = require('./modules/quests').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, {
        key: 'quests',
        reducer
      })

      /*  Return getComponent   */
      cb(null, quests)

    /* Webpack named bundle   */
    }, 'quests')
  }
})
