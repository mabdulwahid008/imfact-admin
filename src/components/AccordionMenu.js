import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const AccordionMenu = ({ icon, routes }) => {
    const [isOpen, setIsOpen] = useState(false); // Control the accordion state
   
    const ref = useRef()
    const location = useLocation();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClick = (event) => {
          if (ref.current && ref.current.contains(event.target) ) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        };
        document.addEventListener('click', handleClick);
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, []);

    return (
        <div ref={ref}>

            <div className={`flex justify-between items-center ${(isOpen) ? 'text-themePink' : 'text-white'} cursor-pointer transition-all ease-in duration-500`} onClick={toggleMenu}>
                <div className="flex gap-2.5 items-center">
                    {icon}
                    <h3 className="text-base">{routes.title}</h3>
                </div>
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
                </div>
            </div>

            <div
                className={`flex justify-start items-stretch gap-2 overflow-hidden ml-[30px] py-1 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"
                    }`}

            >   <div className="w-[1px] border-[0px] border-l-[1px]  border-white"></div>

                <div className="flex flex-col gap-2">
                    {routes.routes.map((route, index) => (
                        <NavLink to={`${route.path}`} className={'text-white hover:text-themePink text-sm'}>{route.title}</NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccordionMenu;
