import React from 'react'
import { IndexLink, Link } from 'react-router'

import './CoreHeader.scss'

export const CoreHeader = (props) => (
  <div className='faw-header-container mdl-shadow--4dp'>
    <div className='-content-container container'>
      <a href='/' className='-logo-container'>
        <span className='-image'>Family adwenture world</span>
      </a>
      <nav className='-navigation-container'>
        <ol className='-list'>
          <li className='-item'>
            <IndexLink to='/' className='-link' activeClassName='--active'>
              Home
            </IndexLink>
          </li>
          <li className='-item'>
            <Link to='/family' className='-link' activeClassName='--active'>
              Family
            </Link>
          </li>
          <li className='-item'>
            <Link to='/quests' className='-link' activeClassName='--active'>
              Quests
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  </div>
)

CoreHeader.propTypes = {
}

export default CoreHeader
