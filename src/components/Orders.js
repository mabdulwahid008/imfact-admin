import React, { useEffect } from 'react'
import OrderTable from './OrderTable'
import PageSize from './PageSize';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getOrders } from '../services/getOrders';

function Orders({ userId, campaignId }) {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [orders, setOrders] = React.useState([]);
    const [t] = useTranslation("global");

    const laction = useLocation()
    let title = ''
    let status = ''
    if(laction.pathname.includes('/submitted')){
        title = t('submittedOrders')
        status = 'Delivered'
    }
    else if(laction.pathname.includes('/disputed')){
        title = t('disputedOrders')
        status = 'Disputed'
    }
    else if(laction.pathname.includes('/active')){
        title = t('activeOrders')
        status = 'Active'
    }
    else if(laction.pathname.includes('/campaign-detail'))
        title = t('campaignOrders')
    else 
        title = t('Orders')


    useEffect(() => {
        setOrders([])
    }, [laction.pathname])


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getOrders(pageSize, pageNumber, searchText, status, userId, campaignId)
                console.log(res);
                
                setOrders(res.orders)
                setTotalRecords(res.totalOrders)
            } catch (error) {
                console.log(error);
                
            }
        }
        getData()
    }, [pageSize, pageNumber, searchText, status, userId, campaignId])

    useEffect(() => {
        setPageNumber(1)
    }, [pageSize])

  return (
    <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 shadow-sm'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0'>{title}</h2>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize}/>
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
                <OrderTable orders={orders} isUserPage={userId?.length >0} isCampaignPage={campaignId?.length > 0}/>
                <Pagination
                    showingResults={orders?.length}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
  )
}

export default Orders
