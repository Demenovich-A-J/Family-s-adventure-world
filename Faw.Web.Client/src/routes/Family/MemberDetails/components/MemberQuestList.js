import React from 'react'
import { Grid, Cell } from 'react-mdl'

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

export const MemberQuestList = (props) => (
  <Cell col={12} id='userQuestList'>
    {
      props.userQuests && props.userQuests.map((userQuest, index) => (
        <Grid className='user-quest-row' key={index}>
          <Cell col={4}>
            <b>{'Name : '}</b>
            {userQuest.name}
          </Cell>
          <Cell col={4}>
            <b>{'Expirience : '}</b>
            {userQuest.expirience}
          </Cell>
          <Cell col={4}>
            <b>{'Required Level : '}</b>
            {userQuest.requiredLevel}
          </Cell>
          <Cell col={4}>
            <b>{'Status : '}</b>
            <span className={getStatusClass(userQuest.status)}>
              {userQuest.status}
            </span>
          </Cell>
          <Cell col={4}>
            <b>{'Coins : '}</b>
            {`$${userQuest.coins.toFixed(2)}`}
          </Cell>
          <Cell col={4}>
            <b>{'Created : '}</b>
            {userQuest.createdOn}
          </Cell>
          <Cell col={12}>
            <b>{'Description : '}</b>
            {userQuest.description}
          </Cell>
        </Grid>
      ))
    }
  </Cell>
)

MemberQuestList.propTypes = {
  userQuests: React.PropTypes.array.isRequired
}

export default MemberQuestList