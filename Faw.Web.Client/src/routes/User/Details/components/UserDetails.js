import React from 'react'
import {
  Grid,
  List,
  ListItemContent,
  Cell,
  ListItemAction,
  Icon,
  ListItem,
  ProgressBar,
  Button
} from 'react-mdl'
import Loading from 'components/Loading'
import UserDetailsForm from './UserDetailsForm'

import './UserDetails.scss'
import avatar from 'assets/default_avatar.svg'
import achivment from 'assets/default_achivment.svg'

const getLevelBuffer = (exp, expToGet) => {
  return exp / expToGet * 100
}

export const UserDetails = (props) => (
  <Grid className='faw-user-details-container'>
    <Cell col={8} shadow={0}>
      <Cell col={12} className='-section-title mdl-typography--headline' component='h4'>
        User details
      </Cell>
      {
        props.userLoading
        ? (
          <Loading />
        )
        : (
          <Grid>
            <Cell col={4}>
              <img src={avatar} className='-user-avatar' />
              <div className='-player-info'>
                <div>
                  <span>Current level {props.playerInfo.level}</span>
                </div>
                <ProgressBar
                  progress={
                    getLevelBuffer(
                      props.playerInfo.exp,
                      props.playerInfo.expForNext)
                  } />
              </div>
            </Cell>
            <Cell col={8}>
              <UserDetailsForm
                editMode={props.editMode}
                genders={props.genders}
                userGender={props.userGender}
              />
            </Cell>
          </Grid>
        )
      }
      <Cell col={12}>
        <div className='-edit-button-container clearfix'>
          {
            props.editMode
            ? (
              <div className='-button-group clearfix'>
                <Button raised primary ripple className='-edit-button btn-danger pull-right'
                  disabled={props.userLoading}
                  onClick={props.cancelButtonClick}
                >
                  Cancel
                </Button>
                <Button raised primary ripple className='-edit-button btn-success pull-right'
                  disabled={props.userLoading}
                  onClick={props.saveButtonClick}
                >
                  Save
                </Button>
              </div>
            )
            : (
              <Button raised primary ripple className='-edit-button pull-right'
                disabled={props.userLoading}
                onClick={props.editButtonClick}
              >
                Edit Profile
              </Button>
            )
          }
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
                        <img src={achivment} />
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

UserDetails.propTypes = {
  userLoading: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  playerInfo: React.PropTypes.object.isRequired,
  userAchivments: React.PropTypes.array.isRequired,
  userAchivmentsLoading: React.PropTypes.bool.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  editButtonClick: React.PropTypes.func.isRequired,
  cancelButtonClick: React.PropTypes.func.isRequired,
  genders: React.PropTypes.array.isRequired,
  userGender: React.PropTypes.string,
  saveButtonClick: React.PropTypes.func.isRequired
}

export default UserDetails
