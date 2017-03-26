import React from 'react'
import { Grid, Cell } from 'react-mdl'

import './NotFound.scss'

export const NotFound = (props) => (
  <Grid>
    <Cell col={12}>
      Bro, we did`t found such route. Sorry...
    </Cell>
  </Grid>
)

NotFound.propTypes = {
}

export default NotFound
