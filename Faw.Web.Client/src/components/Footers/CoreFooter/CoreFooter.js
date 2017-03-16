import React from 'react'
import { IndexLink } from 'react-router'
import { Button } from 'react-bootstrap'

import './CoreFooter.scss'

export const CoreFooter = (props) => {
  return (
    <div className='login-footer-section'>
      <div className={props.props.pathname !== '/Account/Login' ? 'hidden' : ''}>
        <div className='text-center'>
          Not registred? &nbsp;
          <IndexLink to='/Account/Register'>
            Register
          </IndexLink>
        </div>
        <div className='text-center'>
          <IndexLink to='/Account/ForgotPassword'>
             Forgot password?
           </IndexLink>
        </div>
      </div>
      <div className={props.props.pathname === '/Account/Login' ? 'hidden' : ''}>
        <div>
          <IndexLink to='/Account/Login'>
            <Button bsStyle='default' block>Back</Button>
          </IndexLink>
        </div>
      </div>
    </div>
  )
}

CoreFooter.propTypes = {
  props: React.PropTypes.element.isRequired
}

export default CoreFooter
