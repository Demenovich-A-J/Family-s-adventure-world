import React from 'react'
import './Login.scss'
import { Form, FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap'

export const Login = (props) => (
  <Form id='loginForm' onSubmit={props.onFormSubmit}>
    <FormGroup>
      <FormControl type='text' placeholder='Login' onChange={props.onLoginChanged} />
    </FormGroup>
    <FormGroup>
      <FormControl
        type='password'
        placeholder='Password'
        onChange={props.onPasswordChanged} />
    </FormGroup>
    <FormGroup>
      <Checkbox onChange={props.onIsRememberChange}>Remember me</Checkbox>
    </FormGroup>
    <Button type='submit' bsStyle='primary' disabled={props.loading} block>
      {
        props.loading ? 'Login...' : 'Login'
      }
    </Button>
  </Form>
)

Login.propTypes = {
  onPasswordChanged: React.PropTypes.func.isRequired,
  onLoginChanged: React.PropTypes.func.isRequired,
  onIsRememberChange: React.PropTypes.func.isRequired,
  onFormSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  valid: React.PropTypes.bool.isRequired
}

export default Login
