import React from 'react'
import { Textfield } from 'react-mdl'
import { Control } from 'react-redux-form'

export const GetMdlSelect = (props) => (
  <Control
    model={props.model}
    component={Textfield}
    controlProps={{
      name: props.name,
      label: props.label,
      id: props.name,
      className: 'getmdl-select getmdl-select__fullwidth full-width',
      type: 'text',
      floatingLabel: true,
      disabled: props.disabled
    }}
    >
    <label htmlFor={props.name}>
      <i className='mdl-icon-toggle__label material-icons'>keyboard_arrow_down</i>
    </label>
    <ul className='mdl-menu mdl-menu--bottom-left mdl-js-menu' htmlFor={props.name}>
      {
          props.items && props.items.map((item, index) => (
            <li key={index} className='mdl-menu__item' data-val={item}>{item}</li>
          ))
        }
    </ul>
  </Control>
)

GetMdlSelect.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  model: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  items: React.PropTypes.array.isRequired
}

export default GetMdlSelect
