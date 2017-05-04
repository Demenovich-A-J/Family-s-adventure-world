import React from 'react'
import { Spinner } from 'react-mdl'

import './Loading.scss'

var Loading = (props) => (
  <div className='loading-container' style={{ height: props.height, minHeight: props.height, width: props.width }}>
    <Spinner style={{ height: props.height, width: props.height }} />
  </div>
)

Loading.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number
}

export default Loading
