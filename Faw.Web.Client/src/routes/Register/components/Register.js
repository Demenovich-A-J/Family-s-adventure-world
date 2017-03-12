import React from 'react'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Radio,
  Button
} from 'react-bootstrap'

import './Register.scss'

export const Register = (props) => (
  <Form id='registerForm' onSubmit={props.onFormSubmit}>
    <FormGroup>
      <FormControl
        type='text'
        placeholder='First Name'
        onChange={props.onFirstNameChanged} />
    </FormGroup>
    <FormGroup>
      <FormControl
        type='text'
        placeholder='Last Name'
        onChange={props.onLastNameChanged} />
    </FormGroup>
    <FormGroup>
      <FormControl type='email' placeholder='Email' onChange={props.onEmailChanged} />
    </FormGroup>
    <FormGroup>
      <FormControl type='text' placeholder='Login' onChange={props.onLoginChanged} />
    </FormGroup>
    <FormGroup>
      <ControlLabel>Gender</ControlLabel>
      <div>
        {(() => {
          if (props.genders) {
            return props
              .genders
              .map((gender, index) => ((index === 0)
                ? (
                  <Radio
                    inline
                    key={index}
                    name='gender'
                    onChange={props.onGenderChanged}
                    value={gender}
                    defaultChecked>
                    {gender}
                  </Radio>
                )
                : (
                  <Radio
                    inline
                    key={index}
                    name='gender'
                    onChange={props.onGenderChanged}
                    value={gender}>
                    {gender}
                  </Radio>
                )))
          }
        })()}
      </div>
    </FormGroup>
    <FormGroup>
      <FormControl
        type='date'
        placeholder='Birth Date'
        onChange={props.onBirthDateChanged} />
    </FormGroup>
    <FormGroup>
      <FormControl
        type='password'
        placeholder='Password'
        onChange={props.onPasswordChanged} />
    </FormGroup>
    <FormGroup>
      <FormControl
        type='password'
        placeholder='Repeat Password'
        onChange={props.onRepeatPasswordChanged} />
    </FormGroup>
    <Button type='submit' bsStyle='primary' disabled={props.loading} block>
      {props.loading
        ? 'Register...'
        : 'Register'}
    </Button>
  </Form>
)

export default Register
