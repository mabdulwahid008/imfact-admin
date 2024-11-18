import React, { useEffect } from 'react';
import { ROUTES } from '../constants/route';
import { useLocation, matchPath } from 'react-router-dom';

function Navbar() {
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
        <div className={`fixed top-0 left-0 w-full bg-white border-b-[1px] border-themeGrey-70 py-5 pr-10 px-[300px] `}>
            <div className='flex flex-col gap-1'>
                <h2 className='text-base font-bold text-themeBlack-900'>{route?.title}</h2>
                <h2 className='text-sm font-semibold text-themeGrey-300'>
                    {`${route?.title || ''} > ${nestedRoute?.title || ''}`}
                </h2>
            </div>
        </div>
    );
}

export default Navbar;
