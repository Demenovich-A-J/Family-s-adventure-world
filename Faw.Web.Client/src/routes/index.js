// We only need to import the modules necessary for initial render import
// CoreLayout from '../layouts/CoreLayout/CoreLayout'
import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'

import Home from './Home'

import LoginRoute from './Login'
import RegisterRoute from './Register'
import ForgotPasswordRoute from './ForgotPassword'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home
    // childRoutes: [
    //   CounterRoute(store)
    // ]
  },
  {
    path: '/Account',
    component: LoginLayout,
    childRoutes: [
      LoginRoute(store),
      RegisterRoute(store),
      ForgotPasswordRoute(store)
    ]
  }
])

export default createRoutes
