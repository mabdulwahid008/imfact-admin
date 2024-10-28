import React from 'react'

function Pagination({ showingResults, pageNumber, totalRecords, pageSize }) {
  return (
    <div className='flex justify-between items-center gap-1' >
      <p className='text-sm text-themeBlack-200'>Showing {showingResults} of {totalRecords} entries</p>
      <div className='flex justify-end items-center gap-2'>
            <button disabled={pageNumber <= 1} className='outline-none text-sm text-themeBlack-200 border-[1px] border-themeGrey-70 rounded-lg px-3 py-1'>
                    Previous
            </button>
            <p className='text-sm text-white bg-themePink px-2 py-1'>1</p>
            <button disabled={totalRecords & pageSize === 0} className='outline-none text-sm text-themeBlack-200 border-[1px] border-themeGrey-70 rounded-lg px-3 py-1'>
                    Next
            </button>
      </div>
    </div>
  )
}

export default Pagination
