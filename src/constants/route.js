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
import Category from "../pages/Category";
import Bank from "../pages/Bank";
import State from "../pages/State";
import Order from "../pages/Order";
import Campaign from "../pages/Campaign";
import Fee from "../components/Fee";
import Dashboard from "../pages/Dashboard";

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
        component: <Dashboard/>
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
                    component: <Order />
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
                    component: <Campaign />
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
            },
            {
                title: 'Fees',
                path: "/fee-list",
            }

        ],
        component: <SiteSettings />,
        nested: {
            routes: [
                {
                    title: 'Add Category',
                    path: '/add-category',
                    component: <Category />
                },
                {
                    title: 'Edit Category',
                    path: '/edit-category/:_id',
                    component: <Category />
                },
                {
                    title: 'Add Bank',
                    path: '/add-bank',
                    component: <Bank />
                },
                {
                    title: 'Edit Bank',
                    path: '/edit-bank/:_id',
                    component: <Bank />
                },
                {
                    title: 'Add State',
                    path: '/add-state',
                    component: <State />
                },
                {
                    title: 'Edit State',
                    path: '/edit-state/:_id',
                    component: <State />
                },
                {
                    title: 'Fees',
                    path: "/fee/fee-list",
                    component: <Fee />
                }
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