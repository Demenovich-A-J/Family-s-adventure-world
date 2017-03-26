import React from 'react'
import {
  Grid,
  Cell,
  Card,
  CardTitle,
  CardText,
  CardActions,
  CardMenu,
  IconButton,
  Button
} from 'react-mdl'
import { Link } from 'react-router'

import './Home.scss'

export const Home = (props) => (
  <Grid>
    <Cell col={4}>
      <Card shadow={0} style={{ width: '100%', margin: 'auto' }}>
        <CardTitle style={{ color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover' }}>
          Family
        </CardTitle>
        <CardText>
          Manage your famaly here. Your family is your house.
        </CardText>
        <CardActions border>
          <Link to='/family' className='-link' activeClassName='--active'>
            <Button colored>Manage</Button>
          </Link>
        </CardActions>
        <CardMenu style={{ color: '#fff' }}>
          <IconButton name='share' />
        </CardMenu>
      </Card>
    </Cell>
    <Cell col={8} />
  </Grid>
)

export default Home
