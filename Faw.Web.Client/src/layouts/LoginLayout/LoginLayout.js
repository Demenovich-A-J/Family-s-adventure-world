import React from 'react'
import '../../styles/core.scss'

export const LoginLayout = ({ children }) => (
	<div>
		{ children }
	</div>
)

LoginLayout.propTypes = {
	children: React.PropTypes.element.isRequired
}

export default LoginLayout
