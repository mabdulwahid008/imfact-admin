import React, { useEffect } from 'react'
import Pagination from '../components/Pagination'
import PageSize from '../components/PageSize'
import SearchBar from '../components/SearchBar'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategories } from '../services/catgories';
import CategoryTable from '../components/CategoryTable';
import { getBanks } from '../services/banks';
import BankTable from '../components/BankTable';
import Button from '../components/Button';
import StateTable from '../components/StateTable';
import { getStates } from '../services/states';

function SiteSettings() {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [data, setData] = React.useState([]);
    const [t] = useTranslation("global");
    const location = useLocation();
    const navigate = useNavigate()
    const [refresh, setRefresh] = React.useState(false);

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
    const stateList = async () => {
        try {
            const { states, total } = await getStates(pageSize, pageNumber, searchText);
            setData(states || []);
            setTotalRecords(total || 0);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        if (location.pathname === '/category-list') {
            categoryList()
        }
        else if (location.pathname === '/bank-list') {
            bankList()
        }
        else if (location.pathname === '/state-list') {
            stateList()
        }

    }, [pageSize, pageNumber, searchText, refresh, location.pathname])


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

    const redirect = () => {
        if (location.pathname === '/category-list')
            navigate('/add-category')
        else if (location.pathname === '/bank-list')
            navigate('/add-bank')
        else if (location.pathname === '/state-list')
            navigate('/add-state')
    }

    return (
        <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 shadow-sm w-2/3'>
            <div className='flex justify-between items-center px-10'>
                <h2 className='text-themeBlack-300 text-lg font-bold mb-0'>{title}</h2>
                <span className='w-1/5'>
                    <Button text={t('addnew')} onClick={redirect} />
                </span>
            </div>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
                {location.pathname === '/category-list' && <CategoryTable data={data} setRefresh={setRefresh} />}
                {location.pathname === '/bank-list' && <BankTable data={data} setRefresh={setRefresh}/>}
                {location.pathname === '/state-list' && <StateTable data={data} setRefresh={setRefresh}/>}
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
