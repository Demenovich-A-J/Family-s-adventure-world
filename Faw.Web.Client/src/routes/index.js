// We only need to import the modules necessary for initial render import
// CoreLayout from '../layouts/CoreLayout/CoreLayout'
import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import NotFoundLayoyt from '../layouts/NotFoundLayout/NotFoundLayout'

import Home from './Home'

import LoginRoute from './Login'
import RegisterRoute from './Register'
import ForgotPasswordRoute from './ForgotPassword'

import FamilyRoute from './Family/Index'
import FamilyMemberDetailsRoute from './Family/MemberDetails'


import QuestsRoute from './Quests/Index'

import NotFound from './NotFound'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      FamilyRoute(store),
      FamilyMemberDetailsRoute(store),
      QuestsRoute(store)
    ]
  },
  {
    path: '/Account',
    component: LoginLayout,
    childRoutes: [
      LoginRoute(store),
      RegisterRoute(store),
      ForgotPasswordRoute(store)
    ]
  },
  {
    path: '*',
    component: NotFoundLayoyt,
    indexRoute: NotFound,
    childRoutes: [
    ]
  }
])

export default createRoutes
