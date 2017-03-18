import { connect } from 'react-redux'

import ForgotPassword from '../components/ForgotPassword'

import { actions } from '../modules/forgotPassword'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  onFormSubmit: actions.formSubmitHandler,
  onEmailChange: actions.emailChangeHandler
}

const mapStateToProps = (state) => ({
  loading: state.forgotPassword.loading,
  email: state.forgotPassword.email
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
