import React from 'react'
import { Textfield, IconButton } from 'react-mdl'
import _ from 'lodash'

import './InputFile.scss'

export const InputFile = (props) => {
  let inputFile = null

  function handleClick (e) {
    e.preventDefault()

    inputFile.inputRef.click()
  }

  function handleChange (e, changeHanlder) {
    e.preventDefault()

    var event = new Event('change')

    changeHanlder(_.merge({}, event, {
      target: {
        type: 'text',
        value: e.target.files[0].name
      }
    }))
  }

  function getValue (value) {
    return _.isObject(value) ? value.files[0].name : value
  }

  return (
    <div className='faw-file-input-container'>
      <Textfield
        type='text'
        label={props.label}
        floatingLabel
        disabled={props.disabled}
        value={getValue(props.value)}
        readOnly
      />
      <IconButton
        className='mdl-button--file'
        name='attach_file'
        disabled={props.disabled}
        colored onClick={handleClick} />
      <Textfield
        type='file'
        label={props.label}
        className='file-input'
        ref={input => { inputFile = input }}
        onChange={(e) => {
          handleChange(e, props.onChange)
        }}
    />
    </div>
  )
}

InputFile.propTypes = {
  disabled: React.PropTypes.bool,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default InputFile
