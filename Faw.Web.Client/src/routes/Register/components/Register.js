import React from 'react'
import {
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Radio,
	Button
} from 'react-bootstrap'

import './Register.scss'

export const Register = (props) => (
	<Form id="registerForm">
		<FormGroup>
			<FormControl type="text" placeholder="First Name"/>
		</FormGroup>
		<FormGroup>
			<FormControl type="text" placeholder="Last Name"/>
		</FormGroup>
		<FormGroup>
			<FormControl type="email" placeholder="Email"/>
		</FormGroup>
		<FormGroup>
			<FormControl type="text" placeholder="Login"/>
		</FormGroup>
		<FormGroup>
			<ControlLabel>Gender</ControlLabel>
			<div>
				{
					props.genders && props.genders.map((gender, index) => (
						<Radio inline key={ index } name="gender">
							{ gender }
						</Radio>
					))
				}
			</div>
		</FormGroup>
		<FormGroup>
			<FormControl type="date" placeholder="Birth Date"/>
		</FormGroup>
		<FormGroup>
			<FormControl type="password" placeholder="Password"/>
		</FormGroup>
		<FormGroup>
			<FormControl type="password" placeholder="Repeat Password"/>
		</FormGroup>
		<Button type="submit" bsStyle="primary" block>
			Register
		</Button>
	</Form>
)

export default Register
