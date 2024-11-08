import React from 'react'
import AccordionMenu from './AccordionMenu'
import { ROUTES } from '../constants/route';

function SideBar() {
    return (
        <div className='w-full h-screen bg-themeNavyBlue pl-8 pr-5 pt-8'>
            <div className='flex justify-start items-center gap-4 mb-10'>
                <img src={'/logo.png'} className='w-8 h-8' alt="logo" />
                <h2 className='text-white font-bold text-base'>Imfact</h2>
            </div>
            <div className='flex flex-col gap-2 overflow-y-scroll no-scroll h-[82vh]'>
                {ROUTES.map(route => (
                    <AccordionMenu
                        key={route.ID}
                        icon={route.icon}
                        routes={route}
                    />
                ))}
            </div>
        </div>
    )
}

export default SideBar
