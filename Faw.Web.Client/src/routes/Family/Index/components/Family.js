import React from 'react'
import {
  Grid,
  Cell,
  Card,
  CardText,
  CardActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Textfield
} from 'react-mdl'
import { Link } from 'react-router'

import FamilyFormDialog from './FamilyFormDialog'
import SearchResult from './SearchResult'
import Loading from 'components/Loading'

import './Family.scss'
import avatar from 'assets/default_avatar.svg'

export const Family = (props) => (
  <Grid className='faw-family-container'>
    <Cell col={12} className='mdl-shadow--2dp'>
      <Grid className='no-paddings'>
        <Cell col={5} phone={12}>
          <div className='-user-search-container'>
            <Textfield
              disabled={!props.family}
              className='search-member'
              label='Expandable Input'
              expandable
              expandableIcon='search'
              onInput={props.onSearchInputHandler}
              onBlur={props.onSearchInputBlur}
              onClick={props.searchInputClickHandler}
            />
            <SearchResult
              searchResults={props.searchResults}
              searchItemClickHandler={props.searchItemClickHandler}
              searchingUsers={props.searchingUsers}
            />
          </div>
        </Cell>
        <Cell col={5} phone={12}>
          {
            props.familyExist
            ? (
              <div className='-famali-name-container'>
                {props.family.name}
              </div>
            )
            : (
              <Button raised accent ripple
                onClick={props.openFamilyDialogHandler}
                disabled={props.familyInfoLoading}>
                  Create Family
                </Button>
            )
          }
        </Cell>
        <Cell col={2} phone={12}>
          <div className='action-button'>
            <IconButton name='more_vert' id='demo-menu-lower-right' />
            <Menu target='demo-menu-lower-right' align='right'>
              <MenuItem disabled={!props.familyExist}
                onClick={props.openFamilyDialogHandler}
                className='mdl-menu__item--full-bleed-divider'>
                Edit family
              </MenuItem>
              <MenuItem disabled={!props.familyExist}>Invite new member</MenuItem>
            </Menu>
          </div>
        </Cell>
      </Grid>
    </Cell>
    {
      props.familyExist && props.family.familyMembers && props.family.familyMembers.map((familyMember, index) => (
        <Cell col={4} tablet={4} phone={12} key={index}>
          <Card shadow={1} className='-member-card'>
            <div className='mdl-card__media' style={{ backgroundImage: familyMember.imageUrl === '' ? avatar : familyMember.imageUrl }}>
              <span className='-member-name'>{familyMember.name}</span>
              <img className='article-image' src={familyMember.imageUrl === '' ? avatar : familyMember.imageUrl} />
            </div>
            <CardText>
              {familyMember.description}
            </CardText>
            <CardActions className='clearfix' border>
              <Link to={'/family/member/details/' + familyMember.id} className='-link' activeClassName='--active'>
                <Button colored className='pull-right'>
                  Details
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Cell>
      ))
    }
    {
      !props.familyExist && !props.familyInfoLoading
      ? (
        <Cell col={12} className='text-center'>
          <h1>Looks like you have not create family.</h1>
          <h4>Use button above to create your best family</h4>
          <i className='material-icons' style={{ fontSize: '200px' }}>sentiment_dissatisfied</i>
        </Cell>
      )
      : props.familyInfoLoading
      ? (
        <Cell col={12} className='text-center'>
          <Loading />
        </Cell>
      )
      : (
        <div />
      )
    }
    <FamilyFormDialog
      openFamilyDialog={props.openFamilyDialog}
      closeFamilyDialogHandler={props.closeFamilyDialogHandler}
      familyExist={props.familyExist}
      familyName={props.familyName}
      submitFamilyForm={props.submitFamilyForm}
    />
  </Grid>
)

Family.propTypes = {
  openFamilyDialogHandler: React.PropTypes.func.isRequired,
  closeFamilyDialogHandler: React.PropTypes.func.isRequired,
  openFamilyDialog: React.PropTypes.bool.isRequired,
  onSearchInputHandler: React.PropTypes.func.isRequired,
  searchItemClickHandler: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  family: React.PropTypes.object,
  searchResults: React.PropTypes.array,
  familyExist: React.PropTypes.bool.isRequired,
  onSearchInputBlur: React.PropTypes.func.isRequired,
  searchInputClickHandler: React.PropTypes.func.isRequired,
  searchingUsers: React.PropTypes.bool.isRequired,
  familyName: React.PropTypes.string.isRequired,
  submitFamilyForm: React.PropTypes.func.isRequired,
  familyInfoLoading: React.PropTypes.bool.isRequired
}

export default Family
