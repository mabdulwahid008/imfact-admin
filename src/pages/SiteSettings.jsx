import React, { useEffect } from 'react'
import Pagination from '../components/Pagination'
import PageSize from '../components/PageSize'
import SearchBar from '../components/SearchBar'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getCategories } from '../services/getCatgories';
import CategoryTable from '../components/CategoryTable';
import { getBanks } from '../services/getBanks';
import BankTable from '../components/BankTable';

function SiteSettings() {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [data, setData] = React.useState([]);
    const [t] = useTranslation("global");
    const location = useLocation();

    const title = location.pathname === '/category-list' ?
        t('categoryList') :
        location.pathname === '/bank-list' ?
            t('bankList') :
            t('stateList');


    const categoryList = async () => {
        try {
            const { categories, totalCount } = await getCategories(pageSize, pageNumber, searchText);
            setData(categories || []);
            setTotalRecords(totalCount || 0);
        } catch (error) {
            console.log(error);
        }
    }
    const bankList = async () => {
        try {
            const { banks, totalCount } = await getBanks(pageSize, pageNumber, searchText);
            setData(banks || []);
            setTotalRecords(totalCount || 0);
        } catch (error) {
            console.log(error);
        }
    }


useEffect(() => {

    if(location.pathname === '/category-list'){
        categoryList()
    }
    else if(location.pathname === '/bank-list'){
        bankList()
    }

}, [pageSize, pageNumber, searchText, location.pathname])


useEffect(() => {
    setPageNumber(1)
}, [pageSize])

useEffect(() => {
    setData([])
    setPageNumber(1)
    setSearchText('')
    setPageSize(25)
    setTotalRecords(0)
}, [location.pathname])

  return (
    <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 shadow-sm w-2/3'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0'>{title}</h2>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
                {location.pathname === '/category-list' && <CategoryTable data={data} />}
                {location.pathname === '/bank-list' && <BankTable data={data} />}
                <Pagination
                    showingResults={data?.length}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
  )
}

export default SiteSettings
