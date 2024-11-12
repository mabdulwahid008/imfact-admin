import React from 'react'
import PageSize from '../components/PageSize';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import PaymentTable from '../components/PaymentTable';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getPayments } from '../services/getPayments';

function Payment() {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [payments, setPayments] = React.useState([]);
    const [t] = useTranslation("global");

    useEffect(() => {
        const getData = async () => {
            try {
                const { payments,
                    totalPayments,
                } = await getPayments(pageSize, pageNumber, searchText);

                setPayments(payments || []);
                setTotalRecords(totalPayments || 0);
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
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0'>{t('payments')}</h2>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
                <PaymentTable payments={payments} />
                <Pagination
                    showingResults={payments?.length}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
    )
}

export default Payment
