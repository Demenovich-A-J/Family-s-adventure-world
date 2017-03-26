import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function requireAuthorization (Component, allowedRoles) {
  class AuthenticatedComponent extends React.Component {
    checkAuth (isAuthenticated, roles) {
      return isAuthenticated// && (!allowedRoles || allowedRoles.some(r => roles.indexOf(r) !== -1))
    }
    componentWillMount () {
      if (!this.checkAuth(this.props.isAuthenticated, this.props.roles)) {
        browserHistory.push('/account/login')
      }
    }

    render () {
      return (<Component {...this.props} />)
    }
  }

  const mapStateToProps = (state) => ({
    roles: state.user.credentials ? state.user.credentials.roles : [],
    isAuthenticated: state.user.isAuthenticated
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
