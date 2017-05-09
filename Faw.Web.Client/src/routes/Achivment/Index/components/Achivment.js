import React from 'react'
import { Grid, Cell } from 'react-mdl'
import AchivmentList from './AchivmentList'

import './Achivment.scss'

export const Achivment = (props) => (
  <Grid>
    <Cell col={12} shadow={0}>
      <AchivmentList
        achivments={props.achivments}
      />
    </Cell>
  </Grid>
)

Achivment.propTypes = {
  achivments: React.PropTypes.array.isRequired
}

export default Achivment
