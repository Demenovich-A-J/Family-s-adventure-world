import { connect } from 'react-redux'

import Login from '../components/ForgotPassword'

import { actions } from '../modules/forgotPassword'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Login)