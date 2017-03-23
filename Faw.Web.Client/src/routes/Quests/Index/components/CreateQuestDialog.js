import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Textfield,
  Checkbox
} from 'react-mdl'

import './Quests.scss'

export const CreateQuestDialog = (props) => (
  <Dialog open={props.openCreateQuestDialog} onCancel={props.closeCreateQuestDialogHandler} className='-create-quest-dialog'>
    <DialogTitle>Create family quest</DialogTitle>
    <DialogContent>
      <form>
        <Textfield
          className='full-width'
          label='Name'
          type='text'
          floatingLabel
          onChange={props.editInfoNameChangeHandler}
        />
        <Textfield
          className='full-width'
          label='Description'
          type='text'
          rows={3}
          floatingLabel
          onChange={props.editInfoDescriptionChangeHandler}
        />
        <Checkbox label='Is public' ripple defaultChecked onChange={props.editInfoIsPublicChangeHandler} />
        <Textfield
          onChange={props.editInfoRequieredLevelChangeHandler}
          className='full-width'
          label='Required Level'
          type='number'
          floatingLabel
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button type='button' onClick={props.onSubmitCreateQuestFormHandler}>Create</Button>
      <Button type='button' onClick={props.closeCreateQuestDialogHandler}>Cancel</Button>
    </DialogActions>
  </Dialog>
)

CreateQuestDialog.propTypes = {
  closeCreateQuestDialogHandler: React.PropTypes.func.isRequired,
  onSubmitCreateQuestFormHandler: React.PropTypes.func.isRequired,
  openCreateQuestDialog: React.PropTypes.bool.isRequired,
  editInfoNameChangeHandler: React.PropTypes.func.isRequired,
  editInfoDescriptionChangeHandler: React.PropTypes.func.isRequired,
  editInfoIsPublicChangeHandler: React.PropTypes.func.isRequired,
  editInfoRequieredLevelChangeHandler: React.PropTypes.func.isRequired
}

export default CreateQuestDialog
