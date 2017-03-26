import { connect } from 'react-redux'
import NotFound from '../components/NotFound'
import { actions } from '../modules/notFound'

/*  Object of action creators (can also be function that returns object).
		Keys will be passed as props to presentational components. Here we are
		implementing our wrapper around increment; the component doesn't care   */
const mapDispatchToProps = {
  // action: actions.SomeAction,
}
const mapStateToProps = (state) => ({
  // variable: state.componentName.variableName
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
