import React, { useEffect } from 'react'
import PageSize from '../components/PageSize'
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Usertable from '../components/Usertable';
import { useLocation } from 'react-router-dom';
import { getUserlist } from '../services/getUserlist';

function Users() {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const location = useLocation()
    const [users, setUsers] = React.useState([]);


    const role = location.pathname.includes('customers') ? 'customer' : 'creator';
    const status = location.pathname.includes('pending') ? 'pending' : null;

    let title = ''
    if(role === 'customer') {
        title = status === 'pending' ? 'Pending Customers' : 'Customers List';
    }
    else {
        title = status === 'pending' ? 'Pending Creators' : 'Creators List';
    }

    const getData = async () => {
        try {
            const data = await getUserlist({ pageNumber, pageSize, searchText, role, status });
            setUsers(data.users);
            setTotalRecords(data.pagination.totalUsers);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        setUsers([])
        getData()
    }, [location.pathname])

    useEffect(() => {
        getData()
    }, [pageNumber, pageSize, searchText])

    useEffect(() => {
        setPageNumber(1)
    }, [pageSize])


    return (
        <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 sm:gap-2 sm:pb-10 sm:rounded-lg sm:bg-transparent sm:p-0'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0 sm:px-0'>{title}</h2>
            <div className='flex justify-between items-center px-10 sm:px-0 sm:gap-2 sm:w-full'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize}/>
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5 sm:px-0'>
                <Usertable users={users}/>
                <Pagination
                    showingResults={users.length}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
    )
}

export default Users
