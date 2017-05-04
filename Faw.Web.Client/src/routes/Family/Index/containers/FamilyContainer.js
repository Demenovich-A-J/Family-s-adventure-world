import { connect } from 'react-redux'

import Family from '../components/Family'

import { actions } from '../modules/family'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  onFamilyNameChanged: actions.familyNameChangeHandler,
  openFamilyDialogHandler: actions.openFamilyDialog,
  closeFamilyDialogHandler: actions.closeFamilyDialog,
  onSubmitFamilyFormHandler: actions.formSubmitHandler,
  onSearchInputHandler: actions.searchInputHandler,
  searchItemClickHandler: actions.searchItemClickHandler,
  onSearchInputBlur: actions.onSearchInputBlur,
  searchInputClickHandler: actions.searchInputClickHandler
}

const mapStateToProps = (state) => ({
  family: state.familyInfo.family,
  familyExist: state.familyInfo.family !== null,
  familyName: state.family.familyName,
  loading: state.family.loading,
  openFamilyDialog: state.family.openFamilyDialog,
  searchResults: state.family.searchResults,
  searchingUsers: state.family.searchingUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(Family)
