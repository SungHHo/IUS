import React from 'react'

import "../../styles/SearchBar.css"

function SearchBar({ setQuery }) {
  
  const queryFix = (e) => {
    const str = e.currentTarget.value;
    setQuery(str);
  }

  return (
    <div id="search-bar">
      <div class="icon">#</div>
      <input autoFocus={true} type='text' onChange={queryFix}/>
    </div>
  )
}

export default SearchBar