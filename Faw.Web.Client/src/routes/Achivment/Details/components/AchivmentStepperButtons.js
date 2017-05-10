import React from 'react'
import { Button } from 'react-mdl'

export const AchivmentStepperButtons = (props) => {
  const activeStep = props.activeStep || props.activeStep || 0
  const showPrev = activeStep > 0 && activeStep < props.length
  const showNext = activeStep < props.length
  const showLast = activeStep === props.length

  return (
    <div className='-stepper-navigation'>
      {showPrev && <Button onClick={props.previousStep}>Prev</Button>}
      {showNext && <Button primary onClick={props.nextStep}>Next</Button>}
      {showLast && <Button onClick={props.restart}>Restart</Button>}
      {showLast && <Button primary>Finish</Button>}
    </div>
  )
}

AchivmentStepperButtons.propTypes = {
  activeStep: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
  previousStep: React.PropTypes.func.isRequired,
  nextStep: React.PropTypes.func.isRequired,
  restart: React.PropTypes.func.isRequired,
  selectedModelName: React.PropTypes.string
}

export default AchivmentStepperButtons
