import { connect } from 'react-redux'
import MemberDetails from '../components/MemberDetails'
import { actions } from '../modules/memberDetails'

const mapDispatchToProps = {
  // action: actions.SomeAction,
}
const mapStateToProps = (state) => ({
  userInfoLoading: state.memberDetails.userInfoLoading,
  userInfo: state.memberDetails.userInfo
  // variable: state.memberDetails.variableName
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails)
