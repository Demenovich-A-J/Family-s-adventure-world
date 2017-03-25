import React from 'react'
import { Table, TableHeader } from 'react-mdl'

import './Quests.scss'

export const QuestList = (props) => (
  <Table
    className='full-width'
    shadow={1}
    rows={props.familyQuests}
  >
    <TableHeader
      name='name'
    >
        Name
    </TableHeader>
    <TableHeader
      name='description'
    >
        Description
    </TableHeader>
    <TableHeader
      name='expirience'
    >
        Expirience
    </TableHeader>
    <TableHeader
      name='coins'
      cellFormatter={(coins) => `$${coins.toFixed(2)}`}
    >
        Coins
    </TableHeader>
    <TableHeader
      name='requiredLevel'
    >
        Required Level
    </TableHeader>
    <TableHeader
      name='createdOn'
    >
        Created
    </TableHeader>
  </Table>
)

QuestList.propTypes = {
  familyQuests: React.PropTypes.array.isRequired
}

export default QuestList
