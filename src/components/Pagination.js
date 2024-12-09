import React from 'react'

function Pagination({ setPageNumber, showingResults, pageNumber, totalRecords, pageSize }) {
  const totalPages = Math.ceil(totalRecords / pageSize);
  return (
    <div className='flex justify-between items-center gap-1 sm:flex-col' >
      <p className='text-sm text-themeBlack-200'>Showing {showingResults} of {totalRecords} entries</p>
      <div className='flex justify-end items-center gap-2 sm:w-full sm:justify-between'>
            <button onClick={() => setPageNumber(pageNumber-1)} disabled={pageNumber <= 1} className='sm:flex-1 outline-none text-sm disabled:bg-themeGrey-500 text-themeBlack-200 border-[1px] border-themeGrey-70 rounded-lg px-3 py-1'>
                    Previous
            </button>
            <div className='sm:flex-1 flex justify-center items-center'>
            <p className='text-sm text-white bg-themePink px-2 py-1'>{pageNumber}</p>
            </div>
            <button onClick={() => setPageNumber(pageNumber+1)} disabled={pageNumber >= totalPages} className='sm:flex-1 outline-none text-sm disabled:bg-themeGrey-500 text-themeBlack-200 border-[1px] border-themeGrey-70 rounded-lg px-3 py-1'>
                    Next
            </button>
      </div>
    </div>
  )
}

export default Pagination
