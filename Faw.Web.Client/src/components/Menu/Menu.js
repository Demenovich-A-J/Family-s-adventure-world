import React from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { Menu as MdlMenu, MenuItem } from 'react-mdl'

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
          </ol>
        </nav>
        <div className='-user-info-container'>
          <p>
            {
              this.props.userInfo.userName
            }
          </p>
          <img id='-user-info-image' src={avatar} />
          <MdlMenu target='-user-info-image' align='right' ripple>
            <Link to={'/user/details/' + this.props.userInfo.userId} className='-link' activeClassName='--active'>
              <MenuItem className='mdl-menu__item--full-bleed-divider'>
                {
                  this.props.userInfo.userName
                }
              </MenuItem>
            </Link>
            <MenuItem onClick={this.props.logoutUser}>Logout</MenuItem>
          </MdlMenu>
          <div className='-user-info-hover-container mdl-shadow--6dp' />
        </div>
      </div>
    )
  }
})

export default Menu
