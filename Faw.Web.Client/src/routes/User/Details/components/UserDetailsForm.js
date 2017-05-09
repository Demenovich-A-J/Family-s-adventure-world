import React from 'react'
import { Form, Control } from 'react-redux-form'

import {
  Textfield,
  Radio,
  RadioGroup
} from 'react-mdl'

export const UserDetailsForm = (props) => (
  <Form
    model='userDetailsInfo'
  >
    <Control
      model='.firstName'
      component={Textfield}
      controlProps={{
        label: 'First Name',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: !props.editMode
      }}
    />
    <Control
      model='.lastName'
      component={Textfield}
      controlProps={{
        label: 'Last Name',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: !props.editMode
      }}
    />
    <div className='-genders-container'>
      {
        <RadioGroup
          name='gender'
          container='ul'
          childContainer='li'
          value={props.userGender}
          >
          {
            props.genders &&
            props.genders.map((gender, index) => (
              <label key={index}>
                <Control.radio
                  model='.gender'
                  component={Radio}
                  controlProps={{
                    disabled: !props.editMode,
                    value: gender
                  }}
                  value={gender}>
                  {gender}
                </Control.radio>
              </label>
              ))
            }
        </RadioGroup>
        }
    </div>
    <Control
      model='.birthDate'
      component={Textfield}
      controlProps={{
        label: 'Birth Date',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: !props.editMode
      }}
    />
    <Control
      model='.country'
      component={Textfield}
      controlProps={{
        label: 'Country',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: !props.editMode
      }}
    />
    <Control
      model='.city'
      component={Textfield}
      controlProps={{
        label: 'City',
        floatingLabel: true,
        type: 'text',
        className: 'full-width',
        disabled: !props.editMode
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
        disabled: !props.editMode
      }}
    />
  </Form>
)

UserDetailsForm.propTypes = {
  editMode: React.PropTypes.bool.isRequired,
  genders: React.PropTypes.array.isRequired,
  userGender: React.PropTypes.string
}

export default UserDetailsForm
