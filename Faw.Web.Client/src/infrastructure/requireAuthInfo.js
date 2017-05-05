function requireAuth (store) {
  return (nextState, replace) => {
    let { authInfo, isAuthenticated } = store.getState().user

    if (!authInfo || new Date(authInfo.expires) < Date.now() || !isAuthenticated) {
      replace({ pathname: '/Account/Login', query: { return_to: nextState.location.pathname } })
    }
  }
}

export default requireAuth
