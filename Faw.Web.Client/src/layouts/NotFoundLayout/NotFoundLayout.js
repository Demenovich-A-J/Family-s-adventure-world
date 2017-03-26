import React from 'react'
import { Grid } from 'react-mdl'

import './NotFoundLayout.scss'

export const NotFoundLayout = ({ children }) => (
  <Grid>
    { children }
  </Grid>
)

NotFoundLayout.propTypes = {
  children: React.PropTypes.object.isRequired
}

export default NotFoundLayout
