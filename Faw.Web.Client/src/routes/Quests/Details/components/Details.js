import React from 'react'
import { Grid, Cell } from 'react-mdl'

import QuestDetails from 'components/QuestDetails'
import Loading from 'components/Loading'

import './Details.scss'

export const Details = (props) => (
  <Grid>
    <Cell col={12}>
      {
        props.questDetailsLoading
        ? (
          <Loading />
        )
        : (
          <QuestDetails quest={props.quest} isUserQuest={props.isUserQuest} />
        )
      }
    </Cell>
  </Grid>
)

Details.propTypes = {
  quest: React.PropTypes.object.isRequired,
  questDetailsLoading: React.PropTypes.bool.isRequired,
  isUserQuest: React.PropTypes.bool.isRequired
}

export default Details
