import { connect } from 'react-redux'

import Family from '../components/Family'

import { actions } from '../modules/family'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  loading: state.family.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Family)
