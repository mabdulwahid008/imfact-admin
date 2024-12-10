import React, { useEffect } from 'react';
import { ROUTES } from '../constants/route';
import { useLocation, matchPath } from 'react-router-dom';
import { HiMiniBars3BottomRight } from "react-icons/hi2";

function Navbar({ setOpen }) {
    const location = useLocation();
    const [route, setRoute] = React.useState({});
    const [nestedRoute, setNestedRoute] = React.useState({});

    useEffect(() => {
        // Function to find a matching route in the main `ROUTES` array or nested routes
        const findRoute = () => {
            // Check `routes` and `nested.routes` in each ROUTE
            for (const route of ROUTES) {
                // Check if the path matches a route in the `routes` array
                const matchingRoute = route.routes.find(r => matchPath(r.path, location.pathname));
                if (matchingRoute) return { parentRoute: route, subRoute: matchingRoute };

                // Check if the path matches a route in the `nested.routes` array
                if (route.nested?.routes) {
                    const nestedMatchingRoute = route.nested.routes.find(r => matchPath(r.path, location.pathname));
                    if (nestedMatchingRoute) return { parentRoute: route, subRoute: nestedMatchingRoute };
                }
            }
            return { parentRoute: {}, subRoute: {} };
        };

        const { parentRoute, subRoute } = findRoute();
        setRoute(parentRoute);
        setNestedRoute(subRoute);
    }, [location.pathname]);

    return (
        <div className={`fixed top-0 left-0 w-full bg-white border-b-[1px] z-50 border-themeGrey-70 py-5 pr-10 px-[300px] sm:px-5`}>
            <div className='flex justify-start items-center gap-2'>
                <span className=' hidden sm:flex' onClick={() => setOpen(true)}>
                    <HiMiniBars3BottomRight className='text-3xl text-themeBlack-200' />
                </span>

            <div className='flex flex-col gap-1'>
                <h2 className='text-base font-bold text-themeBlack-900 sm:text-sm'>{route?.title}</h2>
                <h2 className='text-sm font-semibold text-themeGrey-300 sm:text-xs'>
                    {`${route?.title || ''} > ${nestedRoute?.title || ''}`}
                </h2>
            </div>
            </div>
        </div>
    );
}

export default Navbar;
