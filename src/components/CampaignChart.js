import React, { useLayoutEffect } from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSoftwareDownload } from "react-icons/cg";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const _data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "Dataset 1",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
        {
            label: "Dataset 2",
            data: [9, 15, 4, 8, 7, 5],
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: "bottom", // Legend at the bottom
        },
        title: {
            display: true,
            text: "Bar Chart Example",
        },
    },
};

function CampaignChart() {
    const [t] = useTranslation("global");
    const [granularity, setGranularity] = React.useState("monthly");
 
    const [data, setData] = React.useState(_data);

    useLayoutEffect(() => {

        // const getStats = async () => {
        //     const response = await getUserGraphStats(granularity);
        //     if(response.status === 200){
        //         const res = await response.json();
        //         setData(prev => ({
        //             ...prev,
        //             labels: res.labels,
        //             datasets: [
        //                 {
        //                     ...prev.datasets[0],
        //                     data: res.creators,
        //                 },
        //                 {
        //                     ...prev.datasets[1],
        //                     data: res.customers,
        //                 },
        //                 {
        //                     ...prev.datasets[2],
        //                     data: res.visitors,
        //                 },
        //             ],
        //         }))
        //     }
        // }

        // getStats()

    }, [granularity])
  return (
    <div className='py-6 bg-white w-full rounded-lg'>
            <div className='px-10 pl-5 flex justify-between items-center'>
                <h2 className='text-themeBlack-300 text-lg font-bold mb-0'>{t('users')}</h2>
                <div className='flex justify-between items-center gap-1'>
                    <button onClick={()=>setGranularity('daily')} className={`${granularity === 'daily' ? 'bg-themeGrey-70': ''} hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}>
                        {t('daily')}
                    </button>
                    <button onClick={()=>setGranularity('weekly')} className={`${granularity === 'weekly' ? 'bg-themeGrey-70': ''} hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}>
                        {t('weekly')}
                    </button>
                    <button onClick={()=>setGranularity('monthly')} className={`${granularity === 'monthly' ? 'bg-themeGrey-70': ''} hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}>
                        {t('monthly')}
                    </button>
                    <button className={`${granularity === 'yearly' ? 'bg-themeGrey-70': ''} hover:bg-themeGrey-70 transition-all ease-in duration-100 px-4 py-1.5 border-[1px] border-themeGrey-70 rounded-md text-themeBlack-900 text-xs font-semibold`}>
                       <CgSoftwareDownload className='text-lg' />
                    </button>
                </div>
            </div>
            <div className='pl-5 pr-10 pt-4'>
                <div className='w-full h-[400px]'>
                <Bar options={options} data={data} />
                </div>
            </div>
        </div>
  )
}

export default CampaignChart
