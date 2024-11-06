import React from 'react'

function Pagination({ setPageNumber, showingResults, pageNumber, totalRecords, pageSize }) {
  const totalPages = Math.ceil(totalRecords / pageSize);
  return (
    <div className='flex justify-between items-center gap-1' >
      <p className='text-sm text-themeBlack-200'>Showing {showingResults} of {totalRecords} entries</p>
      <div className='flex justify-end items-center gap-2'>
            <button onClick={() => setPageNumber(pageNumber-1)} disabled={pageNumber <= 1} className='outline-none text-sm disabled:bg-themeGrey-500 text-themeBlack-200 border-[1px] border-themeGrey-70 rounded-lg px-3 py-1'>
                    Previous
            </button>
            <p className='text-sm text-white bg-themePink px-2 py-1'>{pageNumber}</p>
            <button onClick={() => setPageNumber(pageNumber+1)} disabled={pageNumber >= totalPages} className='outline-none text-sm disabled:bg-themeGrey-500 text-themeBlack-200 border-[1px] border-themeGrey-70 rounded-lg px-3 py-1'>
                    Next
            </button>
      </div>
    </div>
  )
}

export default Pagination
