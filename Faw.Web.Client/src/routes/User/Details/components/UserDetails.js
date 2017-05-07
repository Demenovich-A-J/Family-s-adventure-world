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
  Button,
  Textfield,
  RadioGroup,
  Radio
} from 'react-mdl'
import Loading from 'components/Loading'

import './UserDetails.scss'
import avatar from './assets/default_avatar.svg'

const getLevelBuffer = (exp, expToGet) => {
  return exp / expToGet * 100
}

export const UserDetails = (props) => (
  <Grid className='faw-user-details-container'>
    <Cell col={8} className='mdl-shadow--2dp'>
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
                  <span>Current level {props.user.playerInfo.level}</span>
                </div>
                <ProgressBar
                  progress={
                    getLevelBuffer(
                      props.user.playerInfo.exp,
                      props.user.playerInfo.expForNext)
                  } />
              </div>
            </Cell>
            <Cell col={8}>
              <Textfield
                className='full-width'
                type='text'
                label='User name'
                floatingLabel
                disabled={!props.editMode}
                defaultValue={props.user.userName}
              />
              <div className='-genders-container'>
                {
                  !props.editMode || props.gendersLoading
                  ? (
                    <Radio
                      name='gender'
                      value={props.user.gender}
                      disabled={!props.editMode}
                      defaultChecked
                    >
                      {props.user.gender}
                    </Radio>
                  )
                  : (
                    <RadioGroup
                      name='genders'
                      container='ul'
                      childContainer='li'
                      value={props.user.gender}
                      >
                      {
                        props.genders &&
                        props.genders.map((gender, index) => (
                          <Radio
                            key={index}
                            name='gender'
                            value={gender}>
                            {gender}
                          </Radio>
                        ))
                      }
                    </RadioGroup>
                  )
                }
              </div>
              <Textfield
                className='full-width'
                type='text'
                label='Birth Date'
                floatingLabel
                disabled={!props.editMode}
                defaultValue={props.user.birthDate}
              />
              <Textfield
                className='full-width'
                type='text'
                label='Country'
                floatingLabel
                disabled={!props.editMode}
                defaultValue={props.user.country}
              />
              <Textfield
                className='full-width'
                type='text'
                label='City'
                floatingLabel
                disabled={!props.editMode}
                defaultValue={props.user.city}
              />
              <Textfield
                className='full-width'
                type='text'
                label='Description'
                floatingLabel
                rows={3}
                disabled={!props.editMode}
                defaultValue={props.user.description}
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
    <Cell col={4} className='mdl-shadow--2dp'>
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
  </Grid>
)

UserDetails.propTypes = {
  userLoading: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired,
  userAchivments: React.PropTypes.array.isRequired,
  userAchivmentsLoading: React.PropTypes.bool.isRequired,
  editMode: React.PropTypes.bool.isRequired,
  editButtonClick: React.PropTypes.func.isRequired,
  cancelButtonClick: React.PropTypes.func.isRequired,
  gendersLoading: React.PropTypes.bool.isRequired,
  genders: React.PropTypes.array.isRequired
}

export default UserDetails
