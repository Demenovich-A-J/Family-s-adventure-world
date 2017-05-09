import { connect } from 'react-redux'

import Quests from '../components/Quests'

import { actions } from '../modules/quests'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  closeCreateQuestDialogHandler: actions.closeCreateQuestDialogHandler,
  openCreateQuestDialogHandler: actions.openCreateQuestDialogHandler,
  submitQuestFormHandler: actions.submitQuestFormHandler,
  questTabHandler: actions.questTabHandler,
  setFamilyQuest: actions.setFamilyQuest,
  onEditButtonClick: actions.onEditButtonClick
}

const mapStateToProps = (state) => ({
  loading: state.quests.loading,
  openCreateQuestDialog: state.quests.openCreateQuestDialog,
  tabId: state.quests.tabId,
  familyQuests: state.quests.familyQuests,
  familyQuestsLoading: state.quests.familyQuestsLoading,
  userQuestsLoading: state.quests.userQuestsLoading,
  userQuests: state.quests.userQuests,
  editQuestInfo: state.quests.editQuestInfo,
  questFormSubmitting: state.quests.questFormSubmitting,
  questInfoLoading: state.quests.questInfoLoading,
  isQuestInfoEdit: state.questInfo.questId !== null,
  questComplexity: state.enums.questСomplexity,
  questInfoComplexity: state.questInfo.questСomplexity
})

export default connect(mapStateToProps, mapDispatchToProps)(Quests)
