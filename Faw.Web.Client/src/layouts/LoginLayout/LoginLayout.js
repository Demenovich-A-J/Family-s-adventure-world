import React from 'react'
import { Grid, Cell } from 'react-mdl'
import LoginHeader from '../../components/Headers/LoginHeader'
import LoginFooter from '../../components/Footers/LoginFooter'
import LoadingBar from 'react-redux-loading-bar'

import '../../styles/core.scss'
import './LoginLayout.scss'

export const LoginLayout = ({ children }) => (
  <div id='loginLayout'>
    <Grid>
      <div className='login-section mdl-shadow--2dp clearfix'>
        <Cell col={12}>
          <LoadingBar className='LoadingBar' style={{ backgroundColor: '#77b6ff', height: '2px', boxShadow: '0 0 10px rgba(119,182,255,0.7)' }} />
          <LoginHeader />
        </Cell>
        <Cell col={12}>
          { children }
        </Cell>
        <Cell col={12}>
          <LoginFooter props={children.props.location} />
        </Cell>
      </div>
    </Grid>
  </div>
)

LoginLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default LoginLayout
