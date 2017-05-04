import { injectReducer } from 'store/reducers'
import { fetchQuestDetails } from 'routes/routeEnter'
import requireAuthorization from 'infrastructure/requireAuthorization'

export default (store) => ({
  path: '/quest/details/:questId(/:isUserQuest)',
  onEnter: fetchQuestDetails(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const questDetails = requireAuthorization(require('./containers/DetailsContainer').default)
      const reducer = require('./modules/details').default

      injectReducer(store, {
        key: 'questDetails',
        reducer
      })

      cb(null, questDetails)
    }, 'questDetails')
  }
})
