import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { getEmployees } from '../services/employeeServices';
import PageSize from '../components/PageSize';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import EmployeeTable from '../components/EmployeeTable';
import { useLocation } from 'react-router-dom';

function Employees() {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);
  const [searchText, setSearchText] = React.useState('');
  const [employess, setEmployees] = React.useState([]);
  const [t] = useTranslation("global");
  const laction = useLocation()

  useEffect(() => {
    setEmployees([])
  }, [laction.pathname])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getEmployees(pageSize, pageNumber, searchText)
        console.log(res);

        setEmployees(res.employees)
        setTotalRecords(res.totalEmployees)
      } catch (error) {
        console.log(error);

      }
    }
    getData()
  }, [pageSize, pageNumber, searchText,])

  useEffect(() => {
    setPageNumber(1)
  }, [pageSize])



  return (
    <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 sm:gap-4 sm:rounded-lg'>
      <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0 sm:px-5'>{t("manageEmployees")}</h2>
      <div className='flex justify-between items-center px-10 sm:px-5 sm:gap-2 sm:w-full'>
        <PageSize pageSize={pageSize} setPageSize={setPageSize} />
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>

      <div className='px-10 flex flex-col gap-5 sm:px-5'>
        <EmployeeTable employess={employess} setEmployees={setEmployees}/>
        <Pagination
          showingResults={employess?.length}
          pageSize={pageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalRecords={totalRecords}
        />
      </div>
    </div>
  )
}

export default Employees
