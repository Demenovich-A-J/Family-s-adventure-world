import { connect } from 'react-redux'
import UserDetails from '../components/UserDetails'
import { actions } from '../modules/userDetails'

const mapDispatchToProps = {
	// action: actions.SomeAction,
}
const mapStateToProps = (state) => ({
	// variable: state.componentName.variableName,
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
