import React from 'react'
import _ from 'lodash'
import { Cell, IconButton } from 'react-mdl'

export const AchivmentExpressionList = (props) => {
  let groupedByName = _.groupBy(props.expressionProperties, 'modelName')

  return (
    <Cell col={12}>
      {
        _.isEmpty(groupedByName)
          ? (
            <div />
          )
          : (
            _.keys(groupedByName).map((key, index) => (
              <div className='expression-group-container' key={key}>
                <h5>{key}</h5>
                {
                  groupedByName[key] && groupedByName[key].map((expr, i) => (
                    <div className='expression-container clearfix' key={i}>
                      {
                        <div className='expression clearfix'>
                          <span>
                            {expr.connector && <b className='text-uppercase'>{expr.connector}&nbsp;</b>}
                            <b className='text-uppercase'>if ( </b>
                              '{expr.leftPropertyValue.propertyName}'&nbsp;
                              <span className='text-uppercase'>{expr.comparer}</span>
                              &nbsp;'{expr.rightPropertyValue.value}'<b> )
                            </b>
                          </span>
                          <div className='pull-right'>
                            <IconButton name='edit' colored
                              data-id={expr.expressionPropertyId}
                              onClick={props.editAchivmentExpression}
                              disabled={props.disabled} />
                            <IconButton name='delete' colored
                              data-id={expr.expressionPropertyId}
                              onClick={props.removeAchivmentExpression}
                              disabled={props.disabled} />
                          </div>
                        </div>
                      }
                    </div>
                   ))
                }
              </div>
           ))
        )
      }
    </Cell>
  )
}

AchivmentExpressionList.propTypes = {
  expressionProperties: React.PropTypes.array.isRequired,
  removeAchivmentExpression: React.PropTypes.func.isRequired,
  editAchivmentExpression: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
}

export default AchivmentExpressionList
