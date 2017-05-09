import React from 'react'
import { Form, Control, Field } from 'react-redux-form'

import {
  Textfield
} from 'react-mdl'

import InputFile from 'components/InputFile'

export const AchivmentDetailsForm = (props) => (
  <Form
    model='achivmentDetailsInfo'
  >
    <Control
      model='.name'
      component={Textfield}
      controlProps={{
        label: 'Name',
        floatingLabel: true,
        type: 'text',
        className: 'full-width'
      }}
    />
    <Control
      model='.imageUrl'
      component={InputFile}
      controlProps={{
        label: 'Image',
        floatingLabel: true,
        type: 'text',
        className: 'full-width'
      }}
    />
    <Field model='.enabled' dynamic={false}>
      <label className='mdl-checkbox mdl-js-checkbox' htmlFor='enabled'>
        <input type='checkbox' id='enabled' className='mdl-checkbox__input' />
        <span className='mdl-checkbox__label'>Enabled</span>
      </label>
    </Field>
    <Control
      model='.description'
      component={Textfield}
      controlProps={{
        label: 'Description',
        floatingLabel: true,
        type: 'text',
        rows: 3,
        className: 'full-width'
      }}
    />
  </Form>
)

AchivmentDetailsForm.propTypes = {
}

export default AchivmentDetailsForm
