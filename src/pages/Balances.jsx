

import React from 'react'
import PageSize from '../components/PageSize';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getbalances } from '../services/getbalances';
import { useLocation } from 'react-router-dom';
import BalanceTable from '../components/BalanceTable';

function Balances() {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [balances, setBalances] = React.useState([]);
    const [t] = useTranslation("global");
    const location = useLocation();

    const title = location.pathname === '/creator-balances' ? t('creatorBalances') : t('customerRefunds');
    const role = location.pathname === '/creator-balances' ? 'creator' : 'customer';
    useEffect(() => {
        const getData = async () => {
            try {
                const { balances,
                    totalbalances,
                } = await getbalances(pageSize, pageNumber, searchText, role);

                setBalances(balances || []);
                setTotalRecords(totalbalances || 0);
            } catch (error) {
                console.log(error);

            }
        }
        getData()
    }, [pageSize, pageNumber, searchText, role])

    useEffect(() => {
        setPageNumber(1)
    }, [pageSize, location.pathname])

    return (
        <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0'>{title}</h2>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
                <BalanceTable balances={balances} role={role} />
                <Pagination
                    showingResults={balances?.length}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
    )
}

export default Balances
