import React from 'react'
import { Form, Control } from 'react-redux-form'

import {
  Textfield
} from 'react-mdl'

export const FamilyForm = (props) => (
  <Form
    model='familyEditInfo'
  >
    <Control
      model='.name'
      component={Textfield}
      controlProps={{
        label: 'Name',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: false
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
        disabled: false,
        rows: 3
      }}
    />
    <Control
      model='.goal'
      component={Textfield}
      controlProps={{
        label: 'Goal',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: false,
        rows: 3
      }}
    />
  </Form>
)

FamilyForm.propTypes = {
}

export default FamilyForm
