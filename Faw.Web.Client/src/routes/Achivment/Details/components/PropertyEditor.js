import React from 'react'
import { Cell, Textfield } from 'react-mdl'
import { SelectField, Option } from 'react-mdl-extra'

export const PropertyEditor = (props) => {
  let names = props.propertyNames[props.selectedModelName]
  let propertyRef = null
  let typeRef = null

  return (
    <Cell col={4} className='-property-editor'>
      <input type='hidden' id='side' value={props.side} />
      {
        !props.valueMode
        ? (
          <SelectField
            className='-property-name'
            label={'Property'}
            floatingLabel
            value={props.propertyValue.propertyName}
            onChange={(val) => {
              props.propertyNameChanged(val, propertyRef)
            }}
            ref={ref => { if (ref) { propertyRef = ref.input.inputRef } }}
          >
            {
              names && names.map((name, index) => (
                <Option key={index} value={name}>{name}</Option>
              ))
            }
          </SelectField>
        )
        : (
          <div>
            <Textfield
              className='-property-value'
              label='Property value'
              floatingLabel
              value={props.propertyValue.propertyValue}
              onChange={props.propertyValueChanged} />
            <SelectField
              className='-property-type'
              label={'Type'}
              floatingLabel
              value={props.propertyValue.valueType}
              onChange={(val) => {
                props.propertyTypeChanged(val, typeRef)
              }}
              ref={ref => {
                if (ref) {
                  typeRef = ref.input.inputRef
                }
              }
           }
          >
              {
              props.valueTypes && props.valueTypes.map((name, index) => (
                <Option key={index} value={name}>{name}</Option>
              ))
            }
            </SelectField>
          </div>
        )
      }
    </Cell>
  )
}

PropertyEditor.propTypes = {
  propertyNames: React.PropTypes.object.isRequired,
  propertyValueChanged: React.PropTypes.func.isRequired,
  propertyNameChanged: React.PropTypes.func.isRequired,
  propertyTypeChanged: React.PropTypes.func.isRequired,
  valueMode: React.PropTypes.bool.isRequired,
  propertyValue: React.PropTypes.object.isRequired,
  selectedModelName: React.PropTypes.string,
  side: React.PropTypes.string.isRequired,
  valueTypes: React.PropTypes.array.isRequired
}

export default PropertyEditor
