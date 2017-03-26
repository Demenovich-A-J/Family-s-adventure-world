import React from 'react'
import Menu from '../components/Menu'
import { fetchUserInfo, logoutUser } from 'store/user'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import _ from 'lodash'

const MenuContainer = React.createClass({
  navItemsSwitcher : {
    null : [
    ],
    'View' : [
      { to: '/', label:'Home' },
      { to: '/family', label:'Family' },
      { to: '/quests', label:'Quests' }
    ]
  },
  getNavItems () {
    var navItems = []
    var switcher = this.navItemsSwitcher

    if (_.isNil(this.props.userInfo)) {
      return navItems
    }

    _.forEach(this.props.userInfo.claims, function (claim) {
      navItems = navItems.concat(switcher[claim.Name])
    })

    return navItems
  },
  resetPassword () {
    browserHistory.push('/Account/ResetPassword')
  },
  getInitialState () {
    this.props.getUserInfo()
    return {}
  },
  render () {
    if (_.isNil(this.props.userInfo)) {
      return (<div />)
    }

    return (
      <Menu
        isAuthenticated={this.props.isAuthenticated}
        userInfo={this.props.userInfo}
        navItems={this.getNavItems()}
        logoutUser={this.props.logoutUser}
        changePassword={this.resetPassword} />
    )
  }
})

const mapDispatchToProps = {
  getUserInfo: fetchUserInfo,
  logoutUser
}

const mapStateToProps = (state) => ({
  userInfo        : state.user.userInfo,
  isAuthenticated : state.user.isAuthenticated,
  authInfo        : state.user.authInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
