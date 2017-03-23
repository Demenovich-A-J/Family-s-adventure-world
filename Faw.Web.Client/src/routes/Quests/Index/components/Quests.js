import React from 'react'
import {
  Grid,
  Cell,
  Tabs,
  Tab
} from 'react-mdl'
import CreateQuestDialog from './CreateQuestDialog'

import './Quests.scss'

export const Quests = (props) => (
  <Grid className='faw-quests-container'>
    <Cell col={12} className='mdl-shadow--2dp'>
      <Tabs activeTab={1} ripple>
        <Tab>All</Tab>
        <Tab>User</Tab>
        <Tab>Family</Tab>
      </Tabs>
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
  editInfoRequieredLevelChangeHandler: React.PropTypes.func.isRequired
}

export default Quests
