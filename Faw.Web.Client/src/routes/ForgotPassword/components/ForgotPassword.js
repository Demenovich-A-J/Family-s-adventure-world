import React from 'react'
import { Button, Textfield } from 'react-mdl'

import './ForgotPassword.scss'

export const ForgotPassword = (props) => (
  <form id='registerForm' onSubmit={props.onFormSubmit}>
    <Textfield
      type='text'
      label='Email'
      onChange={props.onEmailChange} />
    <Button type='submit' className='full-width' disabled={props.loading} raised primary ripple>
      {
        props.loading ? 'Reset Password...' : 'Reset Password'
      }
    </Button>
  </form>
)

ForgotPassword.propTypes = {
  onFormSubmit: React.PropTypes.func.isRequired,
  onEmailChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired
}

export default ForgotPassword
