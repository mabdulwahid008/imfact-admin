import React from 'react'
import AccordionMenu from './AccordionMenu'
import { LuHome } from "react-icons/lu";
import { FaList, FaUserShield, FaUserTag } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";

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
                    icon={<FaRegRectangleList className='text-lg' />}
                    routes={{
                        title: 'Manage Orders',
                        routes: [
                            {
                                title: 'All Orders',
                                path: '/all-orders'
                            },
                            {
                                title: 'Active Orders',
                                path: '/active-orders'
                            },
                            {
                                title: 'Submitted Orders',
                                path: '/submitted-orders'
                            },
                            {
                                title: 'Disputed Orders',
                                path: '/disputed-orders'
                            }
                        ]
                    }}
                />
                <AccordionMenu
                    icon={<FaList className='text-lg' />}
                    routes={{
                        title: 'Manage Campaigns',
                        routes: [
                            {
                                title: 'All Campaigns',
                                path: '/all-campaigns'
                            },
                            {
                                title: 'Recruiting Campaigns',
                                path: '/recruiting-campaigns'
                            },
                            {
                                title: 'Active Campaigns',
                                path: '/active-campaigns'
                            },
                            {
                                title: 'Approving Campaigns',
                                path: '/approving-campaigns'
                            },
                            {
                                title: 'Buffer Campaigns',
                                path: '/buffer-campaigns'
                            }
                        ]
                    }}
                />
                <AccordionMenu
                    icon={<FaUserShield className='text-lg' />}
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
                    icon={<FaUserTag className='text-lg' />}
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
