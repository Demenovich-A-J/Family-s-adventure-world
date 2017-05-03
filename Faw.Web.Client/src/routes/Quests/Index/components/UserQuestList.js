import React from 'react'
import { Cell, Grid } from 'react-mdl'

import './Quests.scss'

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

export const UserQuestList = (props) => (
  <table id='userQuestList'
    className='mdl-data-table mdl-js-data-table mdl-data-table--selectable full-width mdl-shadow--2dp'>
    <thead>
      <tr>
        <th className='mdl-data-table__cell--non-numeric' />
        <th className='mdl-data-table__cell--non-numeric'>
          Name
        </th>
        <th className='mdl-data-table__cell--non-numeric'>
          Status
        </th>
        <th className='mdl-data-table__cell--non-numeric'>
          Expirience
        </th>
        <th className='mdl-data-table__cell--non-numeric'>
          Coins
        </th>
        <th className='mdl-data-table__cell--non-numeric'>
          Created
        </th>
      </tr>
    </thead>
    <tbody>
      {
        props.userQuests && props.userQuests.map((userQuest, index) => (
          <tr key={index}>
            <td>
              <img src='' className='quest-image' />
            </td>
            <td className='mdl-data-table__cell--non-numeric'>
              {userQuest.name}
            </td>
            <td className={getStatusClass(userQuest.status) + ' mdl-data-table__cell--non-numeric'}>
              {userQuest.status}
            </td>
            <td className='mdl-data-table__cell--non-numeric'>
              {userQuest.expirience}
            </td>
            <td className='mdl-data-table__cell--non-numeric'>
              {`$${userQuest.coins.toFixed(2)}`}
            </td>
            <td className='mdl-data-table__cell--non-numeric'>
              {userQuest.createdOn}
            </td>
          </tr>
          ))
        }
    </tbody>
  </table>
)

UserQuestList.propTypes = {
  userQuests: React.PropTypes.array.isRequired
}

export default UserQuestList
