import { connect } from 'react-redux'

import Quests from '../components/Quests'

import { actions } from '../modules/quests'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  closeCreateQuestDialogHandler: actions.closeCreateQuestDialogHandler,
  openCreateQuestDialogHandler: actions.openCreateQuestDialogHandler,
  onSubmitCreateQuestFormHandler: actions.onSubmitCreateQuestFormHandler,
  editInfoNameChangeHandler: actions.editInfoNameChangeHandler,
  editInfoDescriptionChangeHandler: actions.editInfoDescriptionChangeHandler,
  editInfoIsPublicChangeHandler: actions.editInfoIsPublicChangeHandler,
  editInfoRequieredLevelChangeHandler: actions.editInfoRequieredLevelChangeHandler,
  editInfoCoinsChangeHandler: actions.editInfoCoinsChangeHandler,
  questTabHandler: actions.questTabHandler,
  setFamilyQuest: actions.setFamilyQuest
}

const mapStateToProps = (state) => ({
  loading: state.quests.loading,
  openCreateQuestDialog: state.quests.openCreateQuestDialog,
  tabId: state.quests.tabId,
  familyQuests: state.quests.familyQuests,
  familyQuestsLoading: state.quests.familyQuestsLoading,
  userQuestsLoading: state.quests.userQuestsLoading,
  userQuests: state.quests.userQuests
})

export default connect(mapStateToProps, mapDispatchToProps)(Quests)
