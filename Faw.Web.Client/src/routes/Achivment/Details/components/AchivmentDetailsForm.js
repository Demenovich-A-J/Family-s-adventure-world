import React from 'react'
import { Form, Control, Field } from 'react-redux-form'

import {
  Textfield
} from 'react-mdl'

import InputFile from 'components/InputFile'
import achivment from 'assets/default_achivment.svg'

export const AchivmentDetailsForm = (props) => (
  <Form
    model='achivmentDetailsInfo'
  >
    <Control
      model='.name'
      component={Textfield}
      disabled={props.disabled}
      controlProps={{
        label: 'Name',
        floatingLabel: true,
        type: 'text',
        className: 'full-width'
      }}
    />
    <div className={'-achivment-image-container'}>
      <img src={achivment} className={'-achivment-image'} />
      <Control
        model='.imageUrl'
        component={InputFile}
        disabled={props.disabled}
        controlProps={{
          label: 'Image',
          floatingLabel: true,
          type: 'text',
          className: 'full-width'
        }}
      />
    </div>
    <Field model='.enabled' dynamic={false}>
      <label className='mdl-checkbox mdl-js-checkbox' htmlFor='enabled'>
        <input type='checkbox' id='enabled'
          className='mdl-checkbox__input'
          checked={props.enabled}
          disabled={props.disabled} />
        <span className='mdl-checkbox__label'>Enabled</span>
      </label>
    </Field>
    <Control
      model='.description'
      component={Textfield}
      disabled={props.disabled}
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
  enabled: React.PropTypes.bool.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default AchivmentDetailsForm
