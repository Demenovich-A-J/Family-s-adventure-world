import {
	connect
} from 'react-redux'

import Login from '../components/Login'

import { actions } from '../modules/login'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
	onLoginChanged: actions.loginChangeHandler,
	onPasswordChanged: actions.passwordChangeHandler,
	onFormSubmit: actions.formSubmitHandler,
	onIsRememberChange: actions.isRememberChangeHandelr
}

const mapStateToProps = (state) => ({
	loading: state.login.loading,
	valid: state.login.valid,
	user: {
		login: state.login.login,
		password: state.login.password
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
