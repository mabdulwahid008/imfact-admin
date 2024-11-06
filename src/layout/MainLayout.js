import React from 'react'
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'

function MainLayout({ children }) {
    return (
        <div className='flex justify-start items-start bg-[#f4f6f9]'>
            <div className='flex w-1/6 fixed top-0 left-0 z-10'>
                <SideBar />
            </div>

            <div className='flex flex-1 ml-[16.6%] z-0'>
                <Navbar />

                <div className='px-10 py-10 w-full mt-24'>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default MainLayout
