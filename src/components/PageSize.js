import React from 'react';

function PageSize({ pageSize, setPageSize }) {
    return (
        <div className='flex gap-1'>
            <p className='text-sm text-themeBlack-200'>Show</p>
            <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            className='border-[1px] rounded-md text-themeBlack-200 text-sm border-themeGrey-70 outline-none shadow-sm'>
                <option>25</option>
                <option>50</option>
                <option>75</option>
                <option>100</option>
            </select>
            <p className='text-sm text-themeBlack-200 sm:hidden'>entries</p>
        </div>
    );
}

export default PageSize;
