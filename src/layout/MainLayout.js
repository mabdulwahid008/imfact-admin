import React from 'react'
import SideBar from '../components/SideBar'

function MainLayout({ children }) {
    return (
        <div className='flex justify-start items-start bg-[#f4f6f9]'>
            <div className='flex w-1/6 fixed top-0 left-0'>
                <SideBar />
            </div>

            <div className='flex flex-1 ml-[16.6%]'>

                <div className='px-10 py-10 w-full'>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default MainLayout
