import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import LoginHeader from '../../components/Headers/LoginHeader'
import LoginFooter from '../../components/Footers/LoginFooter'

import '../../styles/core.scss'
import './LoginLayout.scss'

export const LoginLayout = ({ children }) => (
	<div id='loginLayout'>
		<Grid>
			<div className='login-section box-shadow clearfix'>
				<Row>
					<Col xs={12}>
						<LoginHeader />
					</Col>
					<Col xs={12}>
						{ children }
					</Col>
					<Col xs={12}>
						<LoginFooter props={children.props.location} />
					</Col>
				</Row>
			</div>
		</Grid>
	</div>
)

LoginLayout.propTypes = {
	children: React.PropTypes.element.isRequired
}

export default LoginLayout
