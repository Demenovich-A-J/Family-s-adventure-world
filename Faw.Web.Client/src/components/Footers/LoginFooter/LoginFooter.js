import React from 'react'
import { IndexLink } from 'react-router'
import { Button } from 'react-bootstrap'

import './LoginFooter.scss'

export const LoginFooter = (props) => {
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

LoginFooter.propTypes = {
  props: React.PropTypes.object.isRequired
}

export default LoginFooter
