import React from 'react'
import {
  Grid,
  Cell,
  Tabs,
  Tab
} from 'react-mdl'
import CreateQuestDialog from './CreateQuestDialog'
import UserQuestList from './UserQuestList'
import QuestList from './QuestList'

import './Quests.scss'

function showTabContent (tabId, quests) {
  switch (tabId) {
    case 0:
      return (<div />)
    case 1:
      return (<UserQuestList />)
    case 2:
      return (<QuestList familyQuests={quests} />)
    default:
      return (<div />)
  }
}

export const Quests = (props) => (
  <Grid className='faw-quests-container'>
    <Cell col={12} className='mdl-shadow--2dp'>
      <Tabs activeTab={props.tabId} onChange={props.questTabHandler} ripple>
        <Tab>All</Tab>
        <Tab>User</Tab>
        <Tab>Family</Tab>
      </Tabs>
    </Cell>
    <Cell col={12}>
      {
        showTabContent(props.tabId, props.familyQuests)
      }
    </Cell>
    <Cell col={12}>
      <UserQuestList />
    </Cell>
    <Cell col={12}>
      <CreateQuestDialog
        closeCreateQuestDialogHandler={props.closeCreateQuestDialogHandler}
        onSubmitCreateQuestFormHandler={props.onSubmitCreateQuestFormHandler}
        openCreateQuestDialog={props.openCreateQuestDialog}
        editInfoNameChangeHandler={props.editInfoNameChangeHandler}
        editInfoDescriptionChangeHandler={props.editInfoDescriptionChangeHandler}
        editInfoIsPublicChangeHandler={props.editInfoIsPublicChangeHandler}
        editInfoRequieredLevelChangeHandler={props.editInfoRequieredLevelChangeHandler}
        editInfoCoinsChangeHandler={props.editInfoCoinsChangeHandler}
      />
    </Cell>
  </Grid>
)

Quests.propTypes = {
  closeCreateQuestDialogHandler: React.PropTypes.func.isRequired,
  openCreateQuestDialogHandler: React.PropTypes.func.isRequired,
  onSubmitCreateQuestFormHandler: React.PropTypes.func.isRequired,
  openCreateQuestDialog: React.PropTypes.bool.isRequired,
  editInfoNameChangeHandler: React.PropTypes.func.isRequired,
  editInfoDescriptionChangeHandler: React.PropTypes.func.isRequired,
  editInfoIsPublicChangeHandler: React.PropTypes.func.isRequired,
  editInfoRequieredLevelChangeHandler: React.PropTypes.func.isRequired,
  editInfoCoinsChangeHandler: React.PropTypes.func.isRequired,
  questTabHandler: React.PropTypes.func.isRequired,
  tabId: React.PropTypes.number.isRequired,
  familyQuests: React.PropTypes.array.isRequired
}

export default Quests
