import React from 'react'
import { Button, Textfield, RadioGroup, Radio } from 'react-mdl'

import './Register.scss'

export const Register = (props) => (
  <form id='registerForm' onSubmit={props.onFormSubmit}>
    <Textfield
      className='full-width'
      type='text'
      label='First Name'
      disabled={props.loading}
      onChange={props.onFirstNameChanged} />
    <Textfield
      className='full-width'
      type='text'
      label='Last Name'
      disabled={props.loading}
      onChange={props.onLastNameChanged} />
    <Textfield
      className='full-width'
      type='email'
      label='Email'
      disabled={props.loading}
      onChange={props.onEmailChanged} />
    <Textfield
      className='full-width'
      type='text'
      label='Login'
      disabled={props.loading}
      onChange={props.onLoginChanged} />
    <label>Gender</label>
    <div className='-genders-container'>
      {
        <RadioGroup
          name='genders'
          container='ul'
          childContainer='li'
          value={props.gender}
          onChange={props.onGenderChanged}>
          {
            props.genders &&
            props.genders.map((gender, index) => (
              <Radio
                key={index}
                name='gender'
                onChange={props.onGenderChanged}
                value={gender}>
                {gender}
              </Radio>
            ))
          }
        </RadioGroup>
      }
    </div>
    <Textfield
      className='full-width'
      type='date'
      label='Birth Date'
      disabled={props.loading}
      onChange={props.onBirthDateChanged} />
    <Textfield
      className='full-width'
      type='password'
      label='Password'
      disabled={props.loading}
      onChange={props.onPasswordChanged} />
    <Textfield
      className='full-width'
      type='password'
      label='Repeat Password'
      disabled={props.loading}
      onChange={props.onRepeatPasswordChanged} />
    <Button type='submit' className='full-width' disabled={props.loading} raised primary ripple>
      {props.loading
        ? 'Register...'
        : 'Register'}
    </Button>
  </form>
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
  onGenderChanged: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  genders: React.PropTypes.array.isRequired,
  gender: React.PropTypes.string.isRequired
}

export default Register
