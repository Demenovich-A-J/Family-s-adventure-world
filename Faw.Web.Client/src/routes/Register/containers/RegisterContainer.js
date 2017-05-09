import { connect } from 'react-redux'

import Register from '../components/Register'

import { actions } from '../modules/register'

const mapDispatchToProps = {
  onFirstNameChanged: actions.firstNameChangeHandler,
  onLastNameChanged: actions.lastNameChangeHandler,
  onEmailChanged: actions.emailChangeHandler,
  onLoginChanged: actions.loginChangeHandler,
  onGenderChanged: actions.genderChangeHandler,
  onBirthDateChanged: actions.birthChangeHandler,
  onPasswordChanged: actions.passwordChangeHandler,
  onRepeatPasswordChanged: actions.repeatPasswordChangeHandler,
  onFormSubmit: actions.formSubmitHandler
}

const mapStateToProps = (state) => ({
  genders: state.enums.genders,
  loading: state.register.loading,
  gender: state.register.gender
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
