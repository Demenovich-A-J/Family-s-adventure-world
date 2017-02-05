import React from 'react'
import './LoginFooter.scss'
import {IndexLink, Link} from 'react-router'
import { Button } from 'react-bootstrap'

export const LoginFooter = (props) => {
	return (
		<div className='login-footer-section'>
			<div className={ props.props.pathname !== '/Account/Login'? 'hidden' : '' }>
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
			<div className={ props.props.pathname === '/Account/Login'? 'hidden' : '' }>
				<div>
					<IndexLink to='/Account/Login'>
						<Button bsStyle='default' block>Back</Button>
					</IndexLink>
				</div>
			</div>
		</div>
	)
}

export default LoginFooter
