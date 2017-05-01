import { connect } from 'react-redux'
import MemberDetails from '../components/MemberDetails'
import { actions } from '../modules/memberDetails'

const mapDispatchToProps = {
  // action: actions.SomeAction,
  onAvailableQuestSelectChanged: actions.onAvailableQuestSelectChanged,
  onAssignButtonClick: actions.onAssignButtonClick
}
const mapStateToProps = (state) => ({
  userInfo: state.memberDetails.userInfo,
  userAchivments: state.memberDetails.userAchivments,
  userInfoLoading: state.memberDetails.userInfoLoading,
  userAchivmentsLoading: state.memberDetails.userAchivmentsLoading,
  userQuestsLoading: state.memberDetails.userQuestsLoading,
  availableQuests: state.memberDetails.availableQuests,
  availableQuestsLoading: state.memberDetails.availableQuestsLoading,
  availableQuestSelectedId: state.memberDetails.availableQuestSelectedId,
  userQuestAssigning: state.memberDetails.userQuestAssigning,
  userQuests: state.memberDetails.userQuests
  // variable: state.memberDetails.variableName
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails)
