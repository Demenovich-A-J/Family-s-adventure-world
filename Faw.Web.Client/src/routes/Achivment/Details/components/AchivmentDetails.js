import React from 'react'
import { Grid, Cell, Button } from 'react-mdl'
import { Stepper, Step, SelectField, Option } from 'react-mdl-extra'
import AchivmentDetailsForm from './AchivmentDetailsForm'
import PropertyEditor from './PropertyEditor'
import AchivmentStepperButtons from './AchivmentStepperButtons'

import './AchivmentDetails.scss'

export const AchivmentDetails = (props) => (
  <Grid className='faw-achivment-details-conatiner'>
    <Cell col={8} shadow={0}>
      <Cell col={12} className='-section-title mdl-typography--headline' component='h4'>
        Achivment Details
      </Cell>
      <Cell col={12}>
        <AchivmentDetailsForm />
        <Button raised ripple primary onClick={props.submitAchivmentInfo}>Save</Button>
      </Cell>
    </Cell>
    <Cell col={4} shadow={0}>
      <Cell col={12} className='-section-title mdl-typography--headline' component='h4'>
        Achivment condition
      </Cell>
      <Cell col={12}>
        {'Show result here'}
      </Cell>
    </Cell>
    <Cell col={12}>
      <Stepper
        activeStep={props.activeStep}
        onStepTitleClick={props.onStepTitleClick}
      >
        <Step title={'Introduction'}>
          <div className='-stepper-content'>
            <h4>Welcom to achivment condition stepper</h4>
            <p>Here you can configure achivment expression step by step</p>
            <AchivmentStepperButtons
              length={2}
              activeStep={props.activeStep}
              previousStep={props.previousStep}
              nextStep={props.nextStep}
              restart={props.restart}
              selectedModelName={props.selectedModelName}
            />
          </div>
        </Step>
        <Step title={'Expression model selection'}>
          <div className='-stepper-content'>
            <p>Select model name to use for expression</p>
            <SelectField
              floatingLabel
              label={'Select model name'}
              value={props.selectedModelName}
              onChange={props.selectModelName}
            >
              {
                props.modelNames && props.modelNames.map((name, index) => (
                  <Option key={index} value={name}>{name}</Option>
                ))
              }
            </SelectField>
            <SelectField
              floatingLabel
              label={'Conncetor'}
              value={props.selectedConnector}
              onChange={props.selectConnector}
              className='-connector-select'
            >
              <Option value={null} disabled>-- Select value --</Option>
              {
                props.connectors && props.connectors.map((name, index) => (
                  <Option key={index} value={name}>{name}</Option>
                ))
              }
            </SelectField>
            <AchivmentStepperButtons
              length={2}
              activeStep={props.activeStep}
              previousStep={props.previousStep}
              nextStep={props.nextStep}
              restart={props.restart}
              selectedModelName={props.selectedModelName}
            />
          </div>
        </Step>
        <Step title={'Condition setup'}>
          <div className='-stepper-content'>
            <Grid className='-stepper-editor'>
              <Cell col={12}>
                <p>Fill folowing inputs to add condition</p>
              </Cell>
              <PropertyEditor
                propertyNames={props.modelProperties}
                propertyNameChanged={props.propertyNameChanged}
                propertyValueChanged={props.propertyValueChanged}
                propertyTypeChanged={props.propertyTypeChanged}
                valueMode={false}
                propertyValue={props.leftPropertyValue}
                selectedModelName={props.selectedModelName}
                side={'left'}
                valueTypes={props.valueTypes}
                />
              <Cell col={4}>
                <SelectField
                  floatingLabel
                  label={'Comparer'}
                  value={props.selectedComparer}
                  onChange={props.selectComparer}
                  className='-comparer-select'
                >
                  {
                    props.comparers && props.comparers.map((name, index) => (
                      <Option key={index} value={name}>{name}</Option>
                    ))
                  }
                </SelectField>
              </Cell>
              <PropertyEditor
                propertyNames={props.modelProperties}
                propertyNameChanged={props.propertyNameChanged}
                propertyValueChanged={props.propertyValueChanged}
                propertyTypeChanged={props.propertyTypeChanged}
                valueMode
                propertyValue={props.rightPropertyValue}
                selectedModelName={props.selectedModelName}
                side={'right'}
                valueTypes={props.valueTypes}
                />
            </Grid>
            <AchivmentStepperButtons
              length={2}
              activeStep={props.activeStep}
              previousStep={props.previousStep}
              nextStep={props.nextStep}
              restart={props.restart}
              selectedModelName={props.selectedModelName}
            />
          </div>
        </Step>
      </Stepper>
    </Cell>
  </Grid>
)

AchivmentDetails.propTypes = {
  submitAchivmentInfo: React.PropTypes.func.isRequired,
  modelNames: React.PropTypes.array.isRequired,
  modelProperties: React.PropTypes.object.isRequired,
  leftPropertyValue: React.PropTypes.object.isRequired,
  rightPropertyValue: React.PropTypes.object.isRequired,
  selectedModelName: React.PropTypes.string,
  selectedComparer: React.PropTypes.string,
  selectedConnector: React.PropTypes.string,
  activeStep: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  previousStep: React.PropTypes.func.isRequired,
  nextStep: React.PropTypes.func.isRequired,
  restart: React.PropTypes.func.isRequired,
  onStepTitleClick: React.PropTypes.func.isRequired,
  selectModelName: React.PropTypes.func.isRequired,
  connectors: React.PropTypes.array.isRequired,
  selectConnector: React.PropTypes.func.isRequired,
  selectComparer:  React.PropTypes.func.isRequired,
  propertyNameChanged: React.PropTypes.func.isRequired,
  propertyValueChanged: React.PropTypes.func.isRequired,
  propertyTypeChanged: React.PropTypes.func.isRequired,
  valueTypes: React.PropTypes.array.isRequired,
  comparers: React.PropTypes.array.isRequired
}

export default AchivmentDetails
