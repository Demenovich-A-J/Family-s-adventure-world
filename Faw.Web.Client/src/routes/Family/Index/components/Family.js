import React from 'react'
import {
  Grid,
  Cell,
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Textfield
} from 'react-mdl'
import CreateFamilyForm from './CreateFamilyForm'
import SearchResult from './SearchResult'

import './Family.scss'

export const Family = (props) => (
  <Grid className='faw-family-container'>
    <Cell col={12} className='mdl-shadow--2dp'>
      <Grid className='no-paddings'>
        <Cell col={5}>
          <div className='-user-search-container'>
            <Textfield
              disabled={!props.family}
              className='search-member'
              label='Expandable Input'
              expandable
              expandableIcon='search'
              onChange={props.onSearchInputHandler}
            />
            <SearchResult searchResults={props.searchResults} searchItemClickHandler={props.searchItemClickHandler} />
          </div>
        </Cell>
        <Cell col={5}>
          {
            props.family !== null
            ? (
              <div className='-famali-name-container'>
                {props.family.name}
              </div>
            )
            : (
              <Button raised accent ripple onClick={props.openFamilyDialogHandler}>Create Family</Button>
            )
          }
        </Cell>
        <Cell col={2}>
          <div className='action-button'>
            <IconButton name='more_vert' id='demo-menu-lower-right' />
            <Menu target='demo-menu-lower-right' align='right'>
              <MenuItem disabled={!props.family}>Invite new member</MenuItem>
            </Menu>
          </div>
        </Cell>
      </Grid>
    </Cell>
    {
      props.family !== null && props.family.familyMembers && props.family.familyMembers.map((familyMember, index) => (
        <Cell col={3} key={index}>
          <Card shadow={1} className='-member-card'>
            <CardTitle expand>
              {familyMember.name}
            </CardTitle>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aenan convallis.
            </CardText>
            <CardActions border>
              <Button colored>Details</Button>
            </CardActions>
          </Card>
        </Cell>
      ))
    }
    {
      !props.family
      ? (
        <Cell col={12} className='text-center'>
          <h1>Looks like you have not create family.</h1>
          <h4>Use button above to create your best family</h4>
          <i className='material-icons' style={{ fontSize: '200px' }}>sentiment_dissatisfied</i>
        </Cell>
      )
      : (
        <div />
      )
    }
    {
      !props.family
      ? (
        <CreateFamilyForm
          onFamilyNameChanged={props.onFamilyNameChanged}
          openFamilyDialog={props.openFamilyDialog}
          closeFamilyDialogHandler={props.closeFamilyDialogHandler}
          onSubmitFamilyFormHandler={props.onSubmitFamilyFormHandler}
        />
      )
      : (
        <div />
      )
    }
  </Grid>
)

Family.propTypes = {
  openFamilyDialogHandler: React.PropTypes.func.isRequired,
  closeFamilyDialogHandler: React.PropTypes.func.isRequired,
  onSubmitFamilyFormHandler: React.PropTypes.func.isRequired,
  onFamilyNameChanged: React.PropTypes.func.isRequired,
  onSearchInputHandler: React.PropTypes.func.isRequired,
  searchItemClickHandler: React.PropTypes.func.isRequired,
  openFamilyDialog: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  family: React.PropTypes.object,
  searchResults: React.PropTypes.array
}

export default Family
