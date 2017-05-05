import requireAuth from 'infrastructure/requireAuthInfo'

import LoginLayout from 'layouts/LoginLayout/LoginLayout'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import NotFoundLayoyt from 'layouts/NotFoundLayout/NotFoundLayout'

import Home from './Home'

import LoginRoute from './Login'
import RegisterRoute from './Register'
import ForgotPasswordRoute from './ForgotPassword'

import FamilyRoute from './Family/Index'
import FamilyMemberDetailsRoute from './Family/MemberDetails'

import QuestsRoute from './Quests/Index'
import QuestsDetailsRoute from './Quests/Details'

import UserDetailsRoute from './User/Details'

import NotFound from './NotFound'


/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => ([
  {
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    onEnter: requireAuth(store),
    childRoutes: [
      FamilyRoute(store),
      FamilyMemberDetailsRoute(store),
      QuestsRoute(store),
      UserDetailsRoute(store),
      QuestsDetailsRoute(store)
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
