import React from 'react'
import { DataTable, TableHeader, Button, IconButton } from 'react-mdl'
import { Link } from 'react-router'

import './Quests.scss'

const renderDetailsLink = (name, row) => {
  return <Link to={'/quest/details/' + row.questId} className='-link'> {name} </Link>
}

const renderEditAction = (actions, onEditButtonClick) => {
  return actions && actions.map((a, i) => (
    <IconButton key={i} name={a.icon} icon={a.icon} data-id={a.id} colored onClick={onEditButtonClick} />
  ))
}

export const QuestList = (props) => (
  <DataTable
    className='full-width'
    shadow={0}
    rows={props.familyQuests}
  >
    <TableHeader
      name='name'
      cellFormatter={(name, row) => renderDetailsLink(name, row)}
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
      cellFormatter={(actions, row) => renderEditAction(actions, props.onEditButtonClick)}
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
