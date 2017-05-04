import React from 'react'
import _ from 'lodash'
import Loading from 'components/Loading'

import './Family.scss'

function row (name, email, id, clickHandler) {
  return <div className='-search-item' key={id} data-id={id} onClick={clickHandler}>{ name } ({ email })</div>
}

export const SearchResult = (props) => {
  if (!_.isEmpty(props.searchResults)) {
    return (
      <div className='-search-result-container mdl-shadow--3dp'>
        {
         props.searchResults && props.searchResults.map((result, index) => (
           row(result.name, result.email, result.userId, props.searchItemClickHandler)
         ))
        }
      </div>
    )
  } else if (props.searchingUsers) {
    return (
      <div className='-search-result-container mdl-shadow--3dp'>
        <Loading height={35} />
      </div>
    )
  } else {
    return (<div />)
  }
}

SearchResult.propTypes = {
  searchResults: React.PropTypes.array,
  searchItemClickHandler: React.PropTypes.func.isRequired,
  searchingUsers: React.PropTypes.bool.isRequired
}

export default SearchResult
