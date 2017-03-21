import React from 'react'
import {
  Grid,
  Cell,
  Tabs,
  Tab
} from 'react-mdl'

import './Quests.scss'

export const Quests = (props) => (
  <Grid className='faw-family-container'>
    <Cell col={12} className='mdl-shadow--2dp'>
      <Tabs activeTab={1} ripple>
        <Tab>All</Tab>
        <Tab>User</Tab>
        <Tab>Family</Tab>
      </Tabs>
    </Cell>
  </Grid>
)

Quests.propTypes = {

}

export default Quests
