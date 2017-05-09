import { injectReducer } from 'store/reducers'
import { modelReducer, formReducer } from 'react-redux-form'
import { fetchAchivment } from 'routes/routeEnter'

export default (store) => ({
  path: '/achivments/details(/:achivmentId)',
  onEnter: fetchAchivment(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const achivmentDetails = require('./containers/AchivmentDetailsContainer').default
      const reducer = require('./modules/achivmentDetails').default
      var model = require('./modules/achivmentDetailsForm').default

      injectReducer(store, {
        key: 'achivmentDetails',
        reducer
      })

      injectReducer(store, {
        key: 'achivmentDetailsInfo',
        reducer: modelReducer('achivmentDetailsInfo', model)
      })

      injectReducer(store, {
        key: 'achivmentDetailsInfoForm',
        reducer: formReducer('achivmentDetailsInfo', model)
      })
      cb(null, achivmentDetails)
    }, 'achivmentDetails')
  }
})
