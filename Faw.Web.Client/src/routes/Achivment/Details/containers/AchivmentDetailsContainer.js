import { connect } from 'react-redux'
import AchivmentDetails from '../components/AchivmentDetails'
import { actions } from '../modules/achivmentDetails'

const mapDispatchToProps = {
  submitAchivmentInfo: actions.submitAchivmentInfo,
  previousStep: actions.previousStep,
  nextStep: actions.nextStep,
  restart: actions.restart,
  onStepTitleClick: actions.onStepTitleClick,
  selectModelName: actions.selectModelName,
  selectConnector: actions.selectConnector,
  selectComparer: actions.selectComparer,
  propertyNameChanged: actions.propertyNameChanged,
  propertyValueChanged: actions.propertyValueChanged,
  propertyTypeChanged: actions.propertyTypeChanged
}
const mapStateToProps = (state) => ({
  selectedModelName: state.achivmentDetails.selectedModelName,
  modelNames: state.achivmentDetails.modelNames,
  modelProperties: state.achivmentDetails.modelProperties,
  leftPropertyValue: state.achivmentDetails.leftPropertyValue,
  rightPropertyValue: state.achivmentDetails.rightPropertyValue,
  selectedComparer: state.achivmentDetails.selectedComparer,
  selectedConnector: state.achivmentDetails.selectedConnector,
  activeStep: state.achivmentDetails.activeStep,
  max: state.achivmentDetails.max,
  connectors: state.enums.connector,
  comparers: state.enums.comparer,
  valueTypes: state.enums.valueType
})

export default connect(mapStateToProps, mapDispatchToProps)(AchivmentDetails)
