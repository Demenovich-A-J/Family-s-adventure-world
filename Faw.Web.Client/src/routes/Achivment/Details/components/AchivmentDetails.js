import React from 'react'
import { Grid, Cell, Button } from 'react-mdl'
import AchivmentDetailsForm from './AchivmentDetailsForm'

import './AchivmentDetails.scss'

export const AchivmentDetails = (props) => (
  <Grid className='faw-achivment-details-conatiner'>
    <Cell col={8} shadow={0}>
      <Cell col={12}>
        <AchivmentDetailsForm />
        <Button raised colored ripple onClick={props.submitAchivmentInfo}>Save</Button>
      </Cell>
    </Cell>
  </Grid>
)

AchivmentDetails.propTypes = {
  submitAchivmentInfo: React.PropTypes.func.isRequired
}

export default AchivmentDetails
