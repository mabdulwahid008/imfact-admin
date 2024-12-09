import React from 'react'

function SearchBar({ searchText, setSearchText }) {
  return (
    <div className='flex justify-end items-center gap-1'>
        <label className='text-sm text-themeBlack-200 sm:hidden'>Search:</label>
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Search' className='border-[1px] px-2 py-2 sm:max-w-[150px] rounded-md text-themeBlack-200 text-sm border-themeGrey-70 outline-none' />
    </div>
  )
}

export default SearchBar
