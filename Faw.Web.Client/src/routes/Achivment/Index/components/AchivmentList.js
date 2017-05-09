import React from 'react'
import { DataTable, TableHeader } from 'react-mdl'
import { Link } from 'react-router'

const renderDetailsLink = (name, row) => {
  return <Link to={'/achivments/details/' + row.achivmentId} className='-link'> {name} </Link>
}

export const AchivmentList = (props) => (
  <DataTable
    className='full-width'
    shadow={0}
    rows={props.achivments}
  >
    <TableHeader
      name='name'
      cellFormatter={(name, row) => renderDetailsLink(name, row)}
    >
        Name
    </TableHeader>
    <TableHeader
      name='description'
    >
        description
    </TableHeader>
    <TableHeader
      name='createdOn'
    >
        Created
    </TableHeader>
    <TableHeader
      name='updatedOn'
    >
        Updated
    </TableHeader>
  </DataTable>
)

AchivmentList.propTypes = {
  achivments: React.PropTypes.array.isRequired
}

export default AchivmentList
