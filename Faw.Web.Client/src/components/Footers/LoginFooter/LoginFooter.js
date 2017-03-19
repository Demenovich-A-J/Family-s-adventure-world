import React from 'react'
import { IndexLink } from 'react-router'
import { Button } from 'react-mdl'

import './LoginFooter.scss'

export const LoginFooter = (props) => {
  return (
    <div className='login-footer-section'>
      <div className={props.props.pathname !== '/Account/Login' ? 'hidden' : ''}>
        <div className='text-center'>
          Not registred? &nbsp;
          <IndexLink to='/Account/Register'>
            <Button ripple primary>Register</Button>
          </IndexLink>
        </div>
        <div className='text-center'>
          <IndexLink to='/Account/ForgotPassword'>
            <Button ripple primary>Forgot password?</Button>
          </IndexLink>
        </div>
      </div>
      <div className={props.props.pathname === '/Account/Login' ? 'hidden' : ''}>
        <div>
          <IndexLink to='/Account/Login'>
            <Button className='full-width' raised ripple>Back</Button>
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
