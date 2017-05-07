import { connect } from 'react-redux'
import UserDetails from '../components/UserDetails'
import { actions } from '../modules/userDetails'

const mapDispatchToProps = {
  editButtonClick: actions.editButtonClick,
  cancelButtonClick: actions.cancelButtonClick
}
const mapStateToProps = (state) => ({
  userLoading: state.userDetails.userLoading,
  user: state.userDetails.user,
  userAchivments: state.userDetails.userAchivments,
  userAchivmentsLoading: state.userDetails.userAchivmentsLoading,
  editMode: state.userDetails.editMode,
  gendersLoading: state.userDetails.gendersLoading,
  genders: state.userDetails.genders
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
