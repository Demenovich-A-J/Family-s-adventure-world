import React from 'react'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'

import './ForgotPassword.scss'

export const ForgotPassword = (props) => (
  <Form id='registerForm' onSubmit={props.onFormSubmit}>
    <FormGroup>
      <FormControl type='text' placeholder='Email' onChange={props.onEmailChange} />
    </FormGroup>
    <Button type='submit' bsStyle='primary' disabled={props.loading} block>
      {
        props.loading ? 'Reset Password...' : 'Reset Password'
      }
    </Button>
  </Form>
)

ForgotPassword.propTypes = {
  onFormSubmit: React.PropTypes.func.isRequired,
  onEmailChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired
}

export default ForgotPassword
