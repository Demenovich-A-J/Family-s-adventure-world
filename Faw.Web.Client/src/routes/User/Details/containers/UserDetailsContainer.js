import { connect } from 'react-redux'
import UserDetails from '../components/UserDetails'
import { actions } from '../modules/userDetails'

const mapDispatchToProps = {
  editButtonClick: actions.editButtonClick,
  cancelButtonClick: actions.cancelButtonClick,
  saveButtonClick: actions.saveButtonClick
}
const mapStateToProps = (state) => ({
  userLoading: state.userDetails.userLoading,
  user: state.userDetailsInfo,
  userAchivments: state.userDetails.userAchivments,
  playerInfo: state.userDetails.playerInfo,
  userAchivmentsLoading: state.userDetails.userAchivmentsLoading,
  editMode: state.userDetails.editMode,
  genders: state.enums.genders,
  userGender: state.userDetailsInfo.gender
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails)
