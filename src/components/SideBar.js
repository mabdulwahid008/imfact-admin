import React from 'react'
import AccordionMenu from './AccordionMenu'
import { LuHome } from "react-icons/lu";

function SideBar() {
    return (
        <div className='w-full h-screen bg-themeNavyBlue pl-10 pr-5 pt-8'>
            <div className='flex justify-start items-center gap-4 mb-10'>
                <img src={'/logo.png'} className='w-8 h-8' alt="logo" />
                <h2 className='text-white font-bold text-base'>Imfact</h2>
            </div>
            <div className='flex flex-col gap-1'>

                <AccordionMenu
                    icon={<LuHome className='text-lg' />}
                    routes={{
                        title: 'Dashboard',
                        routes: [
                            {
                                title: 'Dashboard',
                                path: '/dashboard'
                            }
                        ]
                    }}
                />
                <AccordionMenu
                    icon={<LuHome className='text-lg' />}
                    routes={{
                        title: 'Manage Customers',
                        routes: [
                            {
                                title: 'Customers List',
                                path: '/customers-list'
                            },
                            {
                                title: 'Pending Customers',
                                path: '/pending-customers'
                            }
                        ]
                    }}
                />
                <AccordionMenu
                    icon={<LuHome className='text-lg' />}
                    routes={{
                        title: 'Manage Creators',
                        routes: [
                            {
                                title: 'Creators List',
                                path: '/creators-list'
                            },
                            {
                                title: 'Pending creators',
                                path: '/pending-creators'
                            }
                        ]
                    }}
                />
                
            </div>
        </div>
    )
}

export default SideBar
