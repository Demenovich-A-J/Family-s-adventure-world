import React from 'react'
import Menu from 'containers/MenuContainer'

import './CoreHeader.scss'

export const CoreHeader = (props) => (
  <div className='faw-header-container mdl-shadow--4dp'>
    <div className='container'>
      <Menu />
    </div>
  </div>
)

CoreHeader.propTypes = {
}

export default CoreHeader
