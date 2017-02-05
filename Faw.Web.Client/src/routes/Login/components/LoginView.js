import React from 'react'
import './LoginView.scss'
import {
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Button
} from 'react-bootstrap'

export const LoginView = () => (
	<form id='loginForm'>
		<FormGroup>
			<FormControl type="text" placeholder="Login"/>
			<FormControl.Feedback/>
		</FormGroup>
		<FormGroup>
			<FormControl type="text" placeholder="Password"/>
			<FormControl.Feedback/>
		</FormGroup>
		<Button type="submit" bsStyle="primary" block>
			Login
		</Button>
	</form>
)

export default LoginView
