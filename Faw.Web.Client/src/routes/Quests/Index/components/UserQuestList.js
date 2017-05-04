import React from 'react'
import { DataTable, TableHeader } from 'react-mdl'
import { Link } from 'react-router'

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

const renderDetailsLink = (name, row) => {
  return <Link to={'/quest/details/' + row.userQuestId + '/true'} className='-link'> {name} </Link>
}

const renderStatus = (status) => {
  return <span className={getStatusClass(status)}>{status}</span>
}

export const UserQuestList = (props) => (
  <DataTable
    className='full-width'
    shadow={0}
    rows={props.userQuests}
  >
    <TableHeader
      name='name'
      cellFormatter={(name, row) => renderDetailsLink(name, row)}
    >
        Name
    </TableHeader>
    <TableHeader
      name='status'
      cellFormatter={renderStatus}
    >
        Status
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
  </DataTable>
)

UserQuestList.propTypes = {
  userQuests: React.PropTypes.array.isRequired
}

export default UserQuestList
