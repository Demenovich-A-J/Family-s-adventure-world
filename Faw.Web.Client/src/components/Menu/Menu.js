import React from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'

import avatar from './assets/default_avatar.svg'
import './Menu.scss'

var Menu = React.createClass({
  getInitialState () {
    return {
      showAccountMenu: false
    }
  },
  navItemClick (to) {
    browserHistory.push(to)
  },
  toggleAccountMenu () {
    this.setState({
      showAccountMenu: !this.state.showAccountMenu
    })
  },
  renderNavItem (item, index) {
    return (
      <li className='-item' key={index}>
        <IndexLink to={item.to} className='-link' activeClassName='--active'>
          {item.label}
        </IndexLink>
      </li>
    )
  },
  render () {
    return (
      <div className='-content-container'>
        <a href='/' className='-logo-container'>
          <span className='-image'>Family adwenture world</span>
        </a>
        <nav className='-navigation-container'>
          <ol className='-list'>
            {
              this.props.navItems && this.props.navItems.map(this.renderNavItem)
            }
            <li className='-item'>
              <div onClick={this.props.logoutUser} className='-link'>
                Logout
              </div>
            </li>
          </ol>
        </nav>
        <div className='-user-info-container'>
          <Link to='/user/details' className='-link' activeClassName='--active'>
            <img src={avatar} />
            <p>
              {
                this.props.userInfo.userName
              }
            </p>
          </Link>
        </div>
      </div>
    )
  }
})

export default Menu
