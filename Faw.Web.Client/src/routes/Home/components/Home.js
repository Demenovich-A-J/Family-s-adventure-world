import React from 'react'
import {
  Grid,
  Cell,
  DataTable,
  TableHeader
} from 'react-mdl'

import './Home.scss'

export const Home = (props) => (
  <Grid>
    <Cell col={8}>
      <DataTable
        shadow={0}
        className='full-width'
        rows={[
        { name: 'Acrylic (Transparent)', memberType: 'Mom', status: 'Online' },
        { name: 'Plywood (Birch)', memberType: 'Dad', status: 'Offline' },
        { name: 'Laminate (Gold on Blue)', memberType: 'Son', status: 'Offline' }
        ]}
      >
        <TableHeader name='name' tooltip='Family member name'>Name</TableHeader>
        <TableHeader name='memberType' tooltip='Family member type'>Position</TableHeader>
        <TableHeader name='status' tooltip='Family member status'>Status</TableHeader>
      </DataTable>
    </Cell>
    <Cell col={4} />
  </Grid>
)

export default Home
