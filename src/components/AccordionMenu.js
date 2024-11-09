import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const AccordionMenu = ({ icon, routes }) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [active, setActive] = useState(false);

    const ref = useRef()
    const location = useLocation();
    const navigate = useNavigate();
    const toggleMenu = () => {
        if(routes.routes.length === 1){
            navigate(`${routes.routes[0].path}`)
            return;
        }
        setIsOpen(true);
    };


    useEffect(() => {
        if (routes.routes.some(route => location.pathname.includes(route.path))) {
            setActive(true);
            if(routes.routes.length > 1)
            setIsOpen(true);
        } else {
            setActive(false);
            setIsOpen(false);
        }

    }, [location.pathname])


    return (
        <div ref={ref}>

            <div className={`flex justify-between items-center ${(active) ? 'text-themePink' : 'text-white'} cursor-pointer transition-all ease-in duration-500`} onClick={toggleMenu}>
                <div className="flex gap-2.5 items-center">
                    {icon}
                    <h3 className="text-sm">{routes.title}</h3>
                </div>
                {routes.routes.length > 1 &&
                    <div>
                        <svg
                            className={`w-4 h-4 transform transition-transform duration-500 ${isOpen ? "rotate-90" : ""
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>}
            </div>

            <div
                className={`flex justify-start items-stretch gap-2 overflow-hidden ml-[30px] py-1 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"
                    }`}

            >   <div className="w-[1px] border-[0px] border-l-[1px]  border-white"></div>

                <div className="flex flex-col gap-2 py-0.5">
                    {routes.routes.map((route, index) => (
                        <NavLink to={`${route.path}`} className={'text-white hover:text-themePink text-sm'}>{route.title}</NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccordionMenu;
