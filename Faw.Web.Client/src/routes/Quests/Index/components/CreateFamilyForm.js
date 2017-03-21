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

export const CreateFamilyForm = (props) => (
  <Dialog open={props.openFamilyDialog} onCancel={props.closeFamilyDialogHandler} className='-family-dialog'>
    <DialogTitle>Create your family</DialogTitle>
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
        />
      </form>
    </DialogContent>
    <DialogActions>
      <Button type='button' onClick={props.onSubmitFamilyFormHandler}>Create</Button>
      <Button type='button' onClick={props.closeFamilyDialogHandler}>Cancel</Button>
    </DialogActions>
  </Dialog>
)

CreateFamilyForm.propTypes = {
  closeFamilyDialogHandler: React.PropTypes.func.isRequired,
  onFamilyNameChanged : React.PropTypes.func.isRequired,
  onSubmitFamilyFormHandler: React.PropTypes.func.isRequired,
  openFamilyDialog: React.PropTypes.bool.isRequired
}

export default CreateFamilyForm
