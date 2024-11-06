import React, { useEffect } from 'react'
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import PageSize from './PageSize';
import { useTranslation } from 'react-i18next';
import CampaignTable from './CampaignTable';
import { useLocation } from 'react-router-dom';
import { getCampaigns } from '../services/getCampaigns';

function Campaigns({ userId }) {
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(25);
    const [searchText, setSearchText] = React.useState('');
    const [campaigns, setCampaigns] = React.useState([]);
    const [t] = useTranslation("global");

    const laction = useLocation()
    let title = ''
    let status = ''
    if(laction.pathname.includes('/recruiting')){
        title = t('recruitingCampaings')
        status = 'Recruitment Period'
    }
    else if(laction.pathname.includes('/active')){
        title = t('activeCampaings')
        status = 'Active Period'
    }
    else if(laction.pathname.includes('/approving')){
        title = t('approvingCampaings')
        status = 'Approve Period'
    }
    else if(laction.pathname.includes('/buffer')){
        title = t('bufferCampaings')
        status = 'Buffer period'
    }
    else {
        title = t('campaigns')
        status = ''
    }

    useEffect(() => {
        setCampaigns([])
    }, [laction.pathname])


    useEffect(() => {
        setPageNumber(1)
    }, [pageSize])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getCampaigns(pageSize, pageNumber, searchText, status, userId)
                console.log(res);
                
                setCampaigns(res.campaigns)
                setTotalRecords(res.totalCampaigns)
            } catch (error) {
                console.log(error);
                
            }
        }
        getData()
    }, [pageSize, pageNumber, searchText, status, userId])


    


  return (
    <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 shadow-sm'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0'>{title}</h2>
            <div className='flex justify-between items-center px-10'>
                <PageSize pageSize={pageSize} setPageSize={setPageSize}/>
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>

            <div className='px-10 flex flex-col gap-5'>
                <CampaignTable campaigns={campaigns}/>
                <Pagination
                    showingResults={campaigns?.length}
                    pageSize={pageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalRecords={totalRecords}
                />
            </div>
        </div>
  )
}

export default Campaigns
