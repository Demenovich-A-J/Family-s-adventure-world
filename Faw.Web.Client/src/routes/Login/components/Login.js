import React from 'react'
import './Login.scss'
// import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap'
import { Textfield, Checkbox, Button } from 'react-mdl'

export const Login = (props) => (
  <form id='loginForm' onSubmit={props.onFormSubmit}>
    <Textfield
      onChange={props.onLoginChanged}
      className='full-width'
      label='Login'
      floatingLabel
      pattern='.*'
      error='Login is required'
    />
    <Textfield
      onChange={props.onPasswordChanged}
      className='full-width'
      label='Password'
      type='password'
      floatingLabel
      pattern='.*'
      error='Password is required'
    />
    <Checkbox label='Remember me' ripple defaultChecked onChange={props.onIsRememberChange} />
    <Button raised primary ripple disabled={props.loading} className='full-width login-button'>
      {
        props.loading ? 'Login...' : 'Login'
      }
    </Button>
  </form>
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
