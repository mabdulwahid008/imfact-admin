import React, { useEffect, useLayoutEffect } from 'react'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from 'react-i18next';
import { CgSoftwareDownload } from "react-icons/cg";
import { getUserGraphStats } from '../services/getUserGraphStats';


ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
    Tooltip,
    Legend
);


const _data = {
    labels: [""],
    datasets: [
        {
            label: "Creators",
            data: [],
            borderColor: "#2DB400", 
            backgroundColor: "#2DB400", 
            tension: 0.4, 
            borderWidth: 2, 
            fill: true, 
        },
        {
            label: "Customers",
            data: [],
            borderColor: "#14212b", 
            backgroundColor: "#14212b", 
            tension: 0.4, 
            borderWidth: 2, 
            fill: true, 
        },
        {
            label: "Visitors",
            data: [],
            borderColor: "#FFC542", 
            backgroundColor: "#FFC542", 
            tension: 0.4, 
            borderWidth: 2, 
            fill: true, 
        },
    ],
};


   // Chart options
   const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false, // Disable the legend
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            grid: {
                display: true,
                color: "rgba(200, 200, 200, 0.3)",
            },
        },
    },
};





function UserChart() {
    const [t] = useTranslation("global");
    const [granularity, setGranularity] = React.useState("monthly");
 
    const [data, setData] = React.useState(_data);
 

    useLayoutEffect(() => {

        const getStats = async () => {
            const response = await getUserGraphStats(granularity);
            if(response.status === 200){
                const res = await response.json();
                setData(prev => ({
                    ...prev,
                    labels: res.labels,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: res.creators,
                        },
                        {
                            ...prev.datasets[1],
                            data: res.customers,
                        },
                        {
                            ...prev.datasets[2],
                            data: res.visitors,
                        },
                    ],
                }))
            }
        }

        getStats()

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
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    )

}

export default UserChart
