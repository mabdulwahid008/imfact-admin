

import React from 'react'
import PageSize from '../components/PageSize';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getbalances } from '../services/getbalances';

function Balances() {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [balances, setBalances] = React.useState([]);
    const [t] = useTranslation("global");

    useEffect(() => {
        const getData = async () => {
            try {
                const { balances,
                    totalbalances,
                } = await getbalances(pageSize, pageNumber, searchText);

                setBalances(balances || []);
                setTotalRecords(totalbalances || 0);
            } catch (error) {
                console.log(error);

            }
        }
        getData()
    }, [pageSize, pageNumber, searchText])

    useEffect(() => {
        setPageNumber(1)
    }, [pageSize])

    return (
        <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 shadow-sm'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0'>{t('balances')}</h2>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
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
