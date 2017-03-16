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

Register.propTypes = {
  onPasswordChanged: React.PropTypes.func.isRequired,
  onFormSubmit: React.PropTypes.func.isRequired,
  onFirstNameChanged: React.PropTypes.func.isRequired,
  onLastNameChanged: React.PropTypes.func.isRequired,
  onEmailChanged: React.PropTypes.func.isRequired,
  onLoginChanged: React.PropTypes.func.isRequired,
  onBirthDateChanged: React.PropTypes.func.isRequired,
  onRepeatPasswordChanged: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired,
  genders: React.PropTypes.bool.isRequired
}

export default Register
