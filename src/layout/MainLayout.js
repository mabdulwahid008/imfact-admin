import React from 'react'
import SideBar from '../components/SideBar'
import Navbar from '../components/Navbar'

function MainLayout({ children }) {
    return (
        <div className='flex justify-start items-start'>
            <div className='flex w-1/6 fixed top-0 left-0 z-10'>
                <SideBar />
            </div>

            <div className='flex flex-1 ml-[16.6%] z-0 h-full'>
                <Navbar />

                <div className='px-10 w-full pt-32 pb-10 min-h-screen'>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default MainLayout
