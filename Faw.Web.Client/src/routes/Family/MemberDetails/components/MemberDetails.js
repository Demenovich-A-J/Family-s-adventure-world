import React from 'react'
import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Icon, Button, ProgressBar } from 'react-mdl'
import { AutoComplete } from 'react-mdl-extra'
import MemberQuestList from './MemberQuestList'

import avatar from './assets/default_avatar.svg'
import './MemberDetails.scss'

export const MemberDetails = (props) => (
  <Grid className='faw-member-details-container mdl-shadow--2dp'>
    <Cell col={8}>
      <h4 className='-section-title'>User details</h4>
      {
        props.userInfoLoading
        ? (
          <ProgressBar indeterminate />
        )
        : (
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
          </Grid>
        )
      }
      <Grid>
        <Cell col={12}>
          <h5 className='-section-title'>Quest assignment</h5>
          <AutoComplete
            label={'Search quest to assign'}
            items={props.availableQuests}
            valueIndex={'id'}
            dataIndex={'name'}
            className='-quest-autocomplete'
            value={props.availableQuestSelectedId}
            onChange={props.onAvailableQuestSelectChanged}
            disabled={props.availableQuestsLoading || props.userQuestAssigning || props.availableQuests.length === 0}
          />
          <div className='-assign-button-container clearfix'>
            <Button raised primary ripple className='-assign-button'
              disabled={props.availableQuestsLoading || props.userQuestAssigning || props.availableQuests.length === 0}
              onClick={props.onAssignButtonClick}>
              Assign
            </Button>
          </div>
        </Cell>
      </Grid>
      {
        props.userQuestsLoading
        ? (
          <ProgressBar indeterminate />
        )
        : (
          <Grid>
            <Cell col={12}>
              <h5 className='-section-title'>User quests list</h5>
            </Cell>
            <MemberQuestList userQuests={props.userQuests} />
          </Grid>
        )
      }
    </Cell>
    <Cell col={4}>
      <h4 className='-section-title'>Recent Achivments list</h4>
      {
        props.userAchivmentsLoading
        ? (
          <ProgressBar indeterminate />
        )
        : (
          <div className='-achivments-container'>
            <List>
              {
                props.userAchivments && props.userAchivments.map((userAchivment, index) => (
                  <ListItem threeLine key={index}>
                    <ListItemContent
                      avatar={
                        <img src={userAchivment.imageUrl} />
                      }
                      subtitle={userAchivment.description}>
                      {userAchivment.name}
                    </ListItemContent>
                    <ListItemAction>
                      <a href='#'><Icon name='star' /></a>
                    </ListItemAction>
                  </ListItem>
                ))
              }
            </List>
          </div>
        )
      }
    </Cell>
  </Grid>
)

MemberDetails.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  userAchivments: React.PropTypes.array.isRequired,
  availableQuests: React.PropTypes.array.isRequired,
  userInfoLoading: React.PropTypes.bool.isRequired,
  userAchivmentsLoading: React.PropTypes.bool.isRequired,
  userQuestsLoading: React.PropTypes.bool.isRequired,
  availableQuestsLoading: React.PropTypes.bool.isRequired,
  userQuestAssigning: React.PropTypes.bool.isRequired,
  availableQuestSelectedId: React.PropTypes.string.isRequired,
  onAvailableQuestSelectChanged: React.PropTypes.func.isRequired,
  onAssignButtonClick: React.PropTypes.func.isRequired,
  userQuests: React.PropTypes.array.isRequired
}

export default MemberDetails
