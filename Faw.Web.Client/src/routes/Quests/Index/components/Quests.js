import React from 'react'
import {
  Grid,
  Cell,
  Tabs,
  Tab,
  FABButton,
  Icon,
  ProgressBar
} from 'react-mdl'
import CreateQuestDialog from './CreateQuestDialog'
import UserQuestList from './UserQuestList'
import QuestList from './QuestList'

import './Quests.scss'

function showTabContent (tabId, quests, onEditButtonClick) {
  switch (tabId) {
    case 0:
      return (<UserQuestList userQuests={quests} />)
    case 1:
      return (<QuestList familyQuests={quests} onEditButtonClick={onEditButtonClick} />)
    default:
      return (<div />)
  }
}

function getQuests (tabId, userQuests, familyQuests) {
  switch (tabId) {
    case 0:
      return userQuests
    case 1:
      return familyQuests
    default:
      return userQuests
  }
}

export const Quests = (props) => (
  <Grid className='faw-quests-container'>
    <Cell col={12}>
      <Tabs activeTab={props.tabId} onChange={props.questTabHandler} ripple className='mdl-shadow--2dp -quest-tabs'>
        <Tab>User</Tab>
        <Tab>Family</Tab>
      </Tabs>
      <div className='-quest-list'>
        {
          (props.familyQuestsLoading && props.tabId === 1) || (props.userQuestsLoading && props.tabId === 0)
          ? (
            <ProgressBar indeterminate />
          )
          : (
            showTabContent(
              props.tabId,
              getQuests(props.tabId, props.userQuests, props.familyQuests),
              props.onEditButtonClick)
          )
        }
        {
          props.tabId === 1
          ? (
            <div className='footer-buttons'>
              <FABButton primary ripple raised onClick={props.openCreateQuestDialogHandler}>
                <Icon name='add' />
              </FABButton>
            </div>
          )
          : (
            <div />
          )
        }
      </div>
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
  familyQuests: React.PropTypes.array.isRequired,
  familyQuestsLoading: React.PropTypes.bool.isRequired,
  userQuestsLoading: React.PropTypes.bool.isRequired,
  userQuests: React.PropTypes.array.isRequired,
  onEditButtonClick: React.PropTypes.func.isRequired
}

export default Quests
