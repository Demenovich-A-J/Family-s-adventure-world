import { injectReducer } from 'store/reducers'
import { fetchQuests } from 'routes/routeEnter'
import requireAuthorization from 'infrastructure/requireAuthorization'
import { modelReducer, formReducer } from 'react-redux-form'

export default (store) => ({
  path: '/quests',
  onEnter: fetchQuests(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const quests = requireAuthorization(require('./containers/QuestsContainer').default)
      const reducer = require('./modules/quests').default
      var model = require('./modules/questForm').default

      injectReducer(store, {
        key: 'quests',
        reducer
      })

      injectReducer(store, {
        key: 'questInfo',
        reducer: modelReducer('questInfo', model)
      })

      injectReducer(store, {
        key: 'questInfoForm',
        reducer: formReducer('questInfo', model)
      })
      /*  Return getComponent   */
      cb(null, quests)

    /* Webpack named bundle   */
    }, 'quests')
  }
})
