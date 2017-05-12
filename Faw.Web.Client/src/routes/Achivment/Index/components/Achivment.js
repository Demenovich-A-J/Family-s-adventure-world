import React from 'react'
import { Grid, Cell, FABButton, Icon } from 'react-mdl'
import AchivmentList from './AchivmentList'
import { Link } from 'react-router'

import './Achivment.scss'

export const Achivment = (props) => (
  <Grid>
    <Cell col={12} className='-achivment-list'>
      <AchivmentList
        achivments={props.achivments}
      />
      {
        <div className='footer-buttons'>
          <Link to='/achivments/details' className='-link' activeClassName='--active'>
            <FABButton primary ripple raised>
              <Icon name='add' />
            </FABButton>
          </Link>
        </div>
        }
    </Cell>
  </Grid>
)

Achivment.propTypes = {
  achivments: React.PropTypes.array.isRequired
}

export default Achivment
