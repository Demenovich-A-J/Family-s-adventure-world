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
         : 'Edit family' + ' - ' + props.familyEditInfo.name
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
          value={props.familyEditInfo.name}
        />
        <Textfield
          onChange={props.onFamilyGoalChanged}
          className='full-width'
          label='Goal'
          type='text'
          rows={3}
          floatingLabel
          pattern='.*'
          value={props.familyEditInfo.goal}
        />
        <Textfield
          onChange={props.onFamilyDescriptionChanged}
          className='full-width'
          label='Description'
          type='text'
          floatingLabel
          pattern='.*'
          rows={3}
          value={props.familyEditInfo.description}
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
  familyEditInfo: React.PropTypes.object.isRequired,
  familyExist: React.PropTypes.bool.isRequired,
  onFamilyGoalChanged: React.PropTypes.func.isRequired,
  onFamilyDescriptionChanged: React.PropTypes.func.isRequired
}

export default FamilyForm
