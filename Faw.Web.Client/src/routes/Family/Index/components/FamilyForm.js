import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Textfield
} from 'react-mdl'

import './Family.scss'

export const FamilyForm = (props) => (
  <Dialog open={props.openFamilyDialog} onCancel={props.closeFamilyDialogHandler} className='-family-dialog'>
    <DialogTitle>
      {
        !props.familyExist
         ? 'Create your family'
         : 'Edit family' + ' - ' + props.familyName
      }
    </DialogTitle>
    <DialogContent>
      <form>
        <Textfield
          onChange={props.onFamilyNameChanged}
          className='full-width'
          label='Name'
          type='text'
          floatingLabel
          pattern='.*'
          error='Name is required'
          defaultValue={props.familyName}
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button type='button' onClick={props.onSubmitFamilyFormHandler}>
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

FamilyForm.propTypes = {
  closeFamilyDialogHandler: React.PropTypes.func.isRequired,
  onFamilyNameChanged : React.PropTypes.func.isRequired,
  onSubmitFamilyFormHandler: React.PropTypes.func.isRequired,
  openFamilyDialog: React.PropTypes.bool.isRequired,
  familyName: React.PropTypes.string.isRequired,
  familyExist: React.PropTypes.bool.isRequired
}

export default FamilyForm
