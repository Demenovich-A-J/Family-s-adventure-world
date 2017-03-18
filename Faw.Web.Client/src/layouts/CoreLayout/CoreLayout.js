import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import CoreHeader from '../../components/Headers/CoreHeader'
import CoreFooter from '../../components/Footers/CoreFooter'

import '../../styles/core.scss'
import './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <div className='faw-body-container'>
    <CoreHeader props={children.props} />
    <Grid className='faw-page-content-container'>
      <Row>
        <Col xs={12}>
          { children }
        </Col>
      </Row>
    </Grid>
    <CoreFooter props={children.props} />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
