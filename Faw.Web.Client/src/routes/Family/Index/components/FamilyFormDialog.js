import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from 'react-mdl'
import FamilyForm from './FamilyForm'

import './Family.scss'

export const FamilyFormDialog = (props) => (
  <Dialog open={props.openFamilyDialog} onCancel={props.closeFamilyDialogHandler} className='-family-dialog'>
    <DialogTitle>
      {
        !props.familyExist
         ? 'Create your family'
         : 'Edit family' + ' - ' + props.familyName
      }
    </DialogTitle>
    <DialogContent>
      <FamilyForm />
    </DialogContent>
    <DialogActions>
      <Button type='button' onClick={props.submitFamilyForm}>
        {
          !props.familyExist
          ? 'Create'
          : 'Update'
        }
      </Button>
      <Button type='button' onClick={props.closeFamilyDialogHandler}>Cancel</Button>
    </DialogActions>
  </Dialog>
)

FamilyFormDialog.propTypes = {
  closeFamilyDialogHandler: React.PropTypes.func.isRequired,
  submitFamilyForm: React.PropTypes.func.isRequired,
  openFamilyDialog: React.PropTypes.bool.isRequired,
  familyExist: React.PropTypes.bool.isRequired,
  familyName: React.PropTypes.string.isRequired
}

export default FamilyFormDialog
