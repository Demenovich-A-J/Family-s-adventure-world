import React from 'react'
import { Form, Control } from 'react-redux-form'

import {
  Textfield
} from 'react-mdl'

import InputFile from 'components/InputFile'

export const QuestForm = (props) => (
  <Form
    model='questInfo'
    onSubmit={props.onSubmit}
    getRef={props.getRef}
  >
    <Control
      model='.name'
      component={Textfield}
      controlProps={{
        label: 'Name',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: props.questFormSubmitting || props.questInfoLoading
      }}
    />
    <Control
      model='.imageUrl'
      component={InputFile}
      controlProps={{
        label: 'Quest image',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: props.questFormSubmitting || props.questInfoLoading
      }}
    />
    <Control
      model='.description'
      component={Textfield}
      controlProps={{
        label: 'Description',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        rows: 3,
        disabled: props.questFormSubmitting || props.questInfoLoading
      }}
    />
    <Control
      model='.coins'
      component={Textfield}
      controlProps={{
        label: 'Coins',
        floatingLabel: true,
        type: 'number',
        className: 'full-width',
        disabled: props.questFormSubmitting || props.questInfoLoading
      }}
    />
    <Control
      model='.requiredLevel'
      component={Textfield}
      controlProps={{
        label: 'Required Level',
        floatingLabel: true,
        type: 'number',
        className: 'full-width',
        disabled: props.questFormSubmitting || props.questInfoLoading
      }}
    />
  </Form>
)

QuestForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  getRef: React.PropTypes.func.isRequired,
  questFormSubmitting: React.PropTypes.bool.isRequired,
  questInfoLoading: React.PropTypes.bool.isRequired
}

export default QuestForm
