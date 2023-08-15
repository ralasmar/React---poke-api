import React from 'react'

export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    //check if there is prev/next page and if so have the button 
    <div>
        {goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button>}
        {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  )
}
