import { FaList, FaUserShield, FaUserTag } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { LuHome } from "react-icons/lu";
import Users from "../pages/Users";
import UserDetail from "../pages/UserDetail";
import CampaignList from "../pages/CampaignList";
import OrderList from "../pages/OrderList";
import Employees from "../pages/Employees";
import Employee from "../pages/Employee";
import { BsGearFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import Payment from "../pages/Payment";
import { GrMoney } from "react-icons/gr";
import Balances from "../pages/Balances";
import SiteSettings from "../pages/SiteSettings";

export const ROUTES = [
    {
        ID: 0,
        icon: <LuHome className='text-lg' />,
        title: 'Dashboard',
        routes: [
            {
                title: 'Dashboard',
                path: '/dashboard'
            }
        ],
        component: <>Hellooo</>
    },
    {
        ID: 100,
        icon: <FaRegRectangleList className='text-lg' />,
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
        ],
        component: <OrderList />,
        nested: {
            routes: [
                {
                    title: 'Order Detail',
                    path: "/order-detail/:OrderID/:_id",
                    component: <>Hello</>
                }
            ]
        }

    },
    {
        ID: 200,
        icon: <FaList className='text-lg' />,
        title: 'Manage Campaigns',
        routes: [
            {
                title: 'All Campaigns',
                path: '/all-campaigns'
            },
            {
                title: 'Pending Campaigns',
                path: '/pending-campaigns'
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
            },
            {
                title: 'Cancelled Campaigns',
                path: '/cancelled-campaigns'
            },
        ],
        component: <CampaignList />,
        nested: {
            routes: [
                {
                    title: 'Campaign Detail',
                    path: "/campaign-detail/:campaign_id/:_id",
                    component: <>Hello</>
                }
            ]
        }
    },
    {
        ID: 300,
        icon: <FaUserShield className='text-lg' />,
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
        ],
        component: <Users />,
        nested: {
            routes: [
                {
                    title: 'User Detail',
                    path: "/user/:nickname/:_id",
                    component: <UserDetail />
                }
            ]
        }
    },
    {
        ID: 400,
        icon: <FaUserTag className='text-lg' />,
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
        ],
        component: <Users />,
        nested: {
            routes: [
                {
                    title: 'User Detail',
                    path: "/user/:nickname/:_id",
                    component: <UserDetail />
                }
            ]
        }
    },
    {
        ID: 500,
        icon: <FaUserTag className='text-lg' />,
        title: 'Manage Employees',
        routes: [
            {
                title: 'Manage Employees',
                path: '/manage-employees'
            },
            {
                title: 'Create Employee',
                path: '/create-employees',
                component: <Employee />
            },
        ],
        component: <Employees />,
        nested: {
            routes: [
                {
                    title: 'Edit Employee',
                    path: "/employee-edit/:name/:_id",
                    component: <Employee />
                },
            ]
        }
    },
    {
        ID: 600,
        icon: <BsGearFill className='text-lg' />,
        title: 'Site Settings',
        routes: [
            {
                title: 'Category List',
                path: "/category-list",
            },
            {
                title: 'Bank List',
                path: "/bank-list",
            },
            {
                title: 'State List',
                path: "/state-list",
            }

        ],
        component: <SiteSettings />,
        nested: {
            routes: [
                
            ]
        }
    },
    {
        ID: 700,
        icon: <MdPayments className='text-xl' />,
        title: 'Payments',
        routes: [
            {
                title: 'Payments',
                path: '/payments'
            }
        ],
        component: <Payment />
    },
    {
        ID: 800,
        icon: <GrMoney className='text-lg' />,
        title: 'Balances',
        routes: [
            {
                title: 'Creator Balances',
                path: '/creator-balances'
            },
            {
                title: 'Customer Refunds',
                path: '/customer-refunds'
            },
        ],
        component: <Balances />
    },

]