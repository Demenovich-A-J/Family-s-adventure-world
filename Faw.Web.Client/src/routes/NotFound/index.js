// import { injectReducer } from '../../store/reducers'

// export default (store) => ({
//   path: '*',
//   getComponent (nextState, cb) {
//     require.ensure([], (require) => {
//       const NotFound = require('./containers/NotFoundContainer').default
//       const reducer = require('./modules/notFound').default
//       injectReducer(store, {
//         key: 'notFound',
//         reducer
//       })

//       cb(null, NotFound)
//     }, 'notFound')
//   }
// })

import NotFound from './components/NotFound'

// Sync route definition
export default {
  component : NotFound
}
