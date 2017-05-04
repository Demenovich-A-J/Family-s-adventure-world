import React from 'react'
import { Card, CardTitle, CardText, CardActions, Button, Grid, Cell } from 'react-mdl'
import { browserHistory } from 'react-router'

import './QuestDetails.scss'

function getStatusClass (status) {
  switch (status) {
    case 'Assigned':
      return 'text-info'
    case 'InProgress':
      return 'text-warning'
    case 'Completed':
      return 'text-success'
    case 'Verified':
      return 'text-success'
    default:
      return 'text-info'
  }
}

var QuestDetails = (props) => (
  <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
    <CardTitle>
      <h2 className='mdl-card__title-text'>
        { props.quest.name }
      </h2>
    </CardTitle>
    <div className='mdl-card__media'>
      <img className='article-image' src='http://www.getmdl.io/assets/demos/dog.png' />
    </div>
    <CardText>
      <strong>Includes &nbsp;</strong>
      <span>Quest details information</span>
    </CardText>
    <Grid className='quest-info'>
      <Cell col={12} className='mdl-typography--headline' component='h3' >
        Quest Information
      </Cell>
      <Cell col={6}>
        {
           props.isUserQuest
           ? (
             <p>
               <span>
                 <b>Status :&nbsp;</b>
               </span>
               <span className={getStatusClass(props.quest.status)}>
                 { props.quest.status }
               </span>
             </p>
             )
             : (
               <div />
             )
           }
        <p>
          <span>
            <b>Required Level :&nbsp;</b>
          </span>
          { props.quest.requiredLevel }
        </p>
        <p>
          <span>
            <b>Expirience :&nbsp;</b>
          </span>
          { props.quest.expirience }
        </p>
        <p>
          <span>
            <b>Coins :&nbsp;</b>
          </span>
          { props.quest.coins }
        </p>
      </Cell>
      <Cell col={6}>
        { props.quest.description }
      </Cell>
    </Grid>
    <CardActions border>
      <Button colored onClick={browserHistory.goBack}>Back</Button>
    </CardActions>
  </Card>
)

QuestDetails.propTypes = {
  quest: React.PropTypes.object.isRequired,
  isUserQuest: React.PropTypes.bool.isRequired
}

export default QuestDetails
