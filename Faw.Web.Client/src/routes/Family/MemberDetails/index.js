import { injectReducer } from 'store/reducers'
import { fetchFamilyMemberDetails } from 'routes/routeEnter'
import requireAuthorization from 'infrastructure/requireAuthorization'

export default (store) => ({
  path: '/family/member/details/:userId',
  onEnter: fetchFamilyMemberDetails(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MemberDetailsContainer = requireAuthorization(require('./containers/MemberDetailsContainer').default)
      const reducer = require('./modules/memberDetails').default
      injectReducer(store, {
        key: 'memberDetails',
        reducer
      })

      cb(null, MemberDetailsContainer)
    }, 'memberDetails')
  }
})
