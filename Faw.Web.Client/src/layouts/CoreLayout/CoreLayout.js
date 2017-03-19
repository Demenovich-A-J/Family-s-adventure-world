import React from 'react'
import { Layout, Content } from 'react-mdl'
import CoreHeader from '../../components/Headers/CoreHeader'
import CoreFooter from '../../components/Footers/CoreFooter'

import '../../styles/core.scss'
import './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <Layout className='faw-body-container'>
    <CoreHeader props={children.props} />
    <Content className='faw-page-content-container container'>
      { children }
    </Content>
    <CoreFooter props={children.props} />
  </Layout>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
