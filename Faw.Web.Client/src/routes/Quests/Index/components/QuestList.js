import React from 'react'
import { DataTable, TableHeader, Button, IconButton } from 'react-mdl'

import './Quests.scss'

const renderEditAction = (actions, onEditButtonClick) => {
  return <IconButton name='edit' icon='edit' data-id={actions.id} colored onClick={onEditButtonClick} />
}

export const QuestList = (props) => (
  <DataTable
    className='full-width'
    shadow={0}
    rows={props.familyQuests}
  >
    <TableHeader
      name='name'
    >
        Name
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
    <TableHeader
      name='actions'
      cellFormatter={(actions) => {
        return renderEditAction(actions, props.onEditButtonClick)
      }}
    >
        Action
    </TableHeader>
  </DataTable>
)

QuestList.propTypes = {
  familyQuests: React.PropTypes.array.isRequired,
  onEditButtonClick: React.PropTypes.func.isRequired
}

export default QuestList
