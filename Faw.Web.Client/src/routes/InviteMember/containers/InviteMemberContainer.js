import { connect } from 'react-redux'

import InviteMember from '../components/InviteMember'

import { actions } from '../modules/inviteMember'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  loading: state.family.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(InviteMember)
