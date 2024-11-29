import React, { useEffect, useLayoutEffect } from 'react'
import Card from '../components/Card'
import { useTranslation } from 'react-i18next'
import UserChart from '../components/UserChart';
import FeeChart from '../components/FeeChart';
import CampaignChart from '../components/CampaignChart';
import { getDashStats } from '../services/getDashStats';

function Dashboard() {
  const [t] = useTranslation("global");
  const [data, setData] = React.useState({});

  useLayoutEffect(() => {
    const getData = async () => {
      const res = await getDashStats();
      setData(res || {})
    }
    getData()
  }, [])

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6'>
        <Card title={t('totalCampaigns')} value={data.totalCampaigns || 0} />
        <Card title={t('totalOrders')} value={data.totalOrders || 0} />
        <Card title={t('totalCustomers')} value={data.totalCustomers || 0} />
        <Card title={t('totalCreators')} value={data.totalCreator || 0} />
      </div>
      <div className='flex justify-between items-stretch gap-6'>
        <div className='w-[35%]'>
          {/* <FeeChart /> */}
        </div>
        <div className='w-[65%]'>
          <CampaignChart />
        </div>
      </div>
      <div className='flex justify-between items-stretch gap-6'>
        <div className='w-[65%]'>
          <UserChart />
        </div>
        <div className='w-[35%]'>
          <FeeChart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
