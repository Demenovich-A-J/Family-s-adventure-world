import React from 'react'
import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Icon, Button, ProgressBar } from 'react-mdl'
import { AutoComplete } from 'react-mdl-extra'

import avatar from './assets/default_avatar.svg'
import './MemberDetails.scss'

export const MemberDetails = (props) => (
  <Grid className='faw-member-details-container mdl-shadow--2dp'>
    <Cell col={8}>
      <h4 className='-section-title'>User details</h4>
      <Grid>
        <Cell col={4}>
          <img src={avatar} className='-user-avatar' />
          <div className='-player-info'>
            <div>
              <span>Current level {props.userInfo.playerInfo.level}</span>
            </div>
            <ProgressBar progress={props.userInfo.playerInfo.expirienceAmount} />
          </div>
        </Cell>
        <Cell col={8}>
          <p><span className='-label-name'>User Name</span> { props.userInfo.userName }</p>
          <p><span className='-label-name'>Gender</span> { props.userInfo.gender }</p>
          <p><span className='-label-name'>Birth Date</span> { props.userInfo.birthDate }</p>
        </Cell>
        <Cell col={12}>
          <h5 className='-section-title'>Quest assignment</h5>
          <AutoComplete
            label={'Search quest to assign'}
            items={[ { id: 1, name: 'Quest name' } ]}
            valueIndex={'id'}
            dataIndex={'name'}
            className='-quest-autocomplete'
          />
          <div className='-assign-button-container clearfix'>
            <Button raised primary ripple className='-assign-button'>Assign</Button>
          </div>
          <p>
          Here its will be good to add search input and assign button.
          it could be dropdouwn with quests name and auto compleate</p>
        </Cell>
        <Cell col={12}>
          <h5 className='-section-title'>User quests list</h5>
          <p>Here will be last 10 quests or paged quest with filters</p>
        </Cell>
      </Grid>
    </Cell>
    <Cell col={4}>
      <h4 className='-section-title'>Recent Achivments list</h4>
      <div className='-achivments-container'>
        <List>
          <ListItem threeLine>
            <ListItemContent
              avatar='person'
              subtitle='Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.'>
                Bryan Cranston
              </ListItemContent>
            <ListItemAction>
              <a href='#'><Icon name='star' /></a>
            </ListItemAction>
          </ListItem>
          <ListItem threeLine>
            <ListItemContent avatar='person' subtitle='Aaron Paul played the role of Jesse in Breaking Bad. He also featured in the Need For Speed Movie.'>Aaron Paul</ListItemContent>
            <ListItemAction>
              <a href='#'><Icon name='star' /></a>
            </ListItemAction>
          </ListItem>
          <ListItem threeLine>
            <ListItemContent avatar='person' subtitle='Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the character, Bob stars in his own show now, called Better Call Saul.'>Bob Odenkirk</ListItemContent>
            <ListItemAction>
              <a href='#'><Icon name='star' /></a>
            </ListItemAction>
          </ListItem>
          <ListItem threeLine>
            <ListItemContent avatar='person' subtitle='Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the character, Bob stars in his own show now, called Better Call Saul.'>Bob Odenkirk</ListItemContent>
            <ListItemAction>
              <a href='#'><Icon name='star' /></a>
            </ListItemAction>
          </ListItem>
        </List>
      </div>
    </Cell>
  </Grid>
)

MemberDetails.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

export default MemberDetails
