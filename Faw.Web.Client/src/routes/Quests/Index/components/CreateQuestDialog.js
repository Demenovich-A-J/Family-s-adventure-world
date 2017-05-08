import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from 'react-mdl'
import QuestForm from './QuestForm'

import './Quests.scss'

var form = null

export const CreateQuestDialog = (props) => {
  function submitForm () {
    form.dispatchEvent(new Event('submit'))
  }

  return (
    <Dialog
      open={props.openCreateQuestDialog}
      onCancel={props.closeCreateQuestDialogHandler}
      className='-create-quest-dialog'>
      <DialogTitle>Create family quest</DialogTitle>
      <DialogContent>
        <QuestForm
          onSubmit={props.submitQuestFormHandler}
          getRef={(node) => { form = node }}
          questInfoLoading={props.questInfoLoading}
          isQuestInfoEdit={props.isQuestInfoEdit}
          questFormSubmitting={props.questFormSubmitting}
        />
      </DialogContent>
      <DialogActions>
        <Button type='button'
          onClick={submitForm}
          disabled={props.questFormSubmitting || props.questInfoLoading}>
          {
            props.isQuestInfoEdit
            ? (
              'Edit'
            )
            : (
              'Create'
            )
          }
        </Button>
        <Button type='button'
          onClick={props.closeCreateQuestDialogHandler}
          disabled={props.questFormSubmitting || props.questInfoLoading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CreateQuestDialog.propTypes = {
  closeCreateQuestDialogHandler: React.PropTypes.func.isRequired,
  submitQuestFormHandler: React.PropTypes.func.isRequired,
  openCreateQuestDialog: React.PropTypes.bool.isRequired,
  questFormSubmitting: React.PropTypes.bool.isRequired,
  questInfoLoading: React.PropTypes.bool.isRequired,
  isQuestInfoEdit: React.PropTypes.bool.isRequired
}

export default CreateQuestDialog
