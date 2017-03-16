import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import CoreHeader from '../../components/Headers/CoreHeader'
import CoreFooter from '../../components/Footers/LoginFooter'

import '../../styles/core.scss'
import './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <div id='loginLayout'>
    <Grid>
      <div className='login-section box-shadow clearfix'>
        <Row>
          <Col xs={12}>
            <CoreHeader />
          </Col>
          <Col xs={12}>
            { children }
          </Col>
          <Col xs={12}>
            <CoreFooter props={children.props.location} />
          </Col>
        </Row>
      </div>
    </Grid>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
