import React from 'react'
import { Grid, Cell, List, ListItem, ListItemContent, ListItemAction, Icon, Button, ProgressBar } from 'react-mdl'
import { AutoComplete } from 'react-mdl-extra'
import MemberQuestList from './MemberQuestList'
import Loading from 'components/Loading'

import avatar from 'assets/default_avatar.svg'
import './MemberDetails.scss'

const getLevelBuffer = (exp, expToGet) => {
  return exp / expToGet * 100
}

export const MemberDetails = (props) => (
  <Grid className='faw-member-details-container'>
    <Cell col={8} shadow={0}>
      <Cell col={12} className='-section-title mdl-typography--headline' component='h4'>
        User details
      </Cell>
      {
        props.userInfoLoading
        ? (
          <Loading />
        )
        : (
          <Grid>
            <Cell col={4}>
              <img src={avatar} className='-user-avatar' />
              <div className='-player-info'>
                <div>
                  <span>Current level {props.userInfo.playerInfo.level}</span>
                </div>
                <ProgressBar
                  progress={
                    getLevelBuffer(
                      props.userInfo.playerInfo.expirienceAmount,
                      props.userInfo.playerInfo.expirienceToNextLevel)
                  } />
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
      <Cell col={12} className='-section-title mdl-typography--headline' component='h5'>
        Quest assignment
      </Cell>
      <Cell col={12}>
        <AutoComplete
          label={'Search quest to assign'}
          items={props.availableQuests}
          valueIndex={'questId'}
          dataIndex={'name'}
          className='-quest-autocomplete'
          value={props.availableQuestSelectedId}
          onChange={props.onAvailableQuestSelectChanged}
          disabled={props.availableQuestsLoading || props.userQuestAssigning || props.availableQuests.length === 0}
      />
      </Cell>
      <Cell col={12}>
        <div className='-assign-button-container clearfix'>
          <Button raised primary ripple className='-assign-button'
            disabled={props.availableQuestsLoading || props.userQuestAssigning || props.availableQuests.length === 0}
            onClick={props.onAssignButtonClick}>
            Assign
          </Button>
        </div>
      </Cell>
    </Cell>
    <Cell col={4} shadow={0}>
      <Cell col={12} className='-section-title mdl-typography--headline' component='h4'>
        Recent Achivments list
      </Cell>
      {
        props.userAchivmentsLoading
        ? (
          <Loading />
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
    <Cell col={12} shadow={0} className='-quest-list-title-container'>
      <Cell col={12}className='mdl-typography--headline' component='h5'>
        User quests list
      </Cell>
    </Cell>
    <Cell col={12} className='-quest-list-container'>
      {
        props.userQuestsLoading
        ? (
          <Loading />
        )
        : (
          <MemberQuestList userQuests={props.userQuests} />
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
