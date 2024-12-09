// import React from 'react'
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';

// function CampaignTable({ campaigns }) {
//     const [t] = useTranslation("global");
//     const isUserDetail = window.location.href.includes('/user')
//     return (
//          <div className="overflow-x-auto">
//               <table className="min-w-full ">
//                   <thead>
//                       <tr className="text-left border-y-[1px] border-themeGrey-100">
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Serial')}</th>
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('CampaignID')}</th>
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('type')}</th>
//                          {!isUserDetail&& <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Option')}</th>}
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Level')}</th>
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Platform')}</th>
//                          {!isUserDetail && <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Brand')}</th>}
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Status")}</th>
//                           <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Action')}</th>
//                       </tr>
//                   </thead>
//                   <tbody>
//                       {campaigns.map((item, index) => (
//                           <TableRow item={item} index={index} isUserDetail={isUserDetail} />
//                       ))}
//                   </tbody>
//               </table>
//                       {campaigns.length === 0 && 
//                       <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
//                           {t("nodata")}
//                       </p>}
//           </div>
//     )
// }

// export default CampaignTable




// const TableRow = ({ item, index, isUserDetail }) => {


//     return (
//         <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
//             <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
//             <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_id}</td>
//             <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_type}</td>
//            {!isUserDetail && <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_option}</td>}
//             <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap">{item.creatorLevel}</td>
//             <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap capitalize">{item.platform?.replace('_', ' ')}</td>
//             {!isUserDetail && <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap">{item.brand_title}</td>}
//             <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap">{item.status}</td>
//             <td className='px-4 py-1.5 flex-1 flex gap-1'>
//                 <Link to={`/campaign-detail/${item.campaign_id}/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
//                     View
//                 </Link>
//             </td>
//         </tr>
//     )
// }

import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CampaignTable({ campaigns }) {
    const [t] = useTranslation("global");
    const isUserDetail = window.location.href.includes('/user');

    return (
        <div className="overflow-x-auto sm:overflow-hidden">
            <table className="min-w-full sm:hidden">
                <thead>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Serial')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('CampaignID')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('type')}</th>
                        {!isUserDetail && <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Option')}</th>}
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Level')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Platform')}</th>
                        {!isUserDetail && <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Brand')}</th>}
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Status")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((item, index) => (
                        <TableRow key={index} item={item} index={index} isUserDetail={isUserDetail} />
                    ))}
                </tbody>
            </table>

            {/* Fallback for smaller screens */}
            <div className="sm:flex flex-col gap-2 hidden">
                {campaigns.map((item, index) => (
                    <Link to={`/campaign-detail/${item.campaign_id}/${item._id}`} className='flex flex-col bg-white gap-2 border-themeGrey-100 border-[1px] rounded-xl p-4'>

                        <div className="flex gap-1 justify-between">
                            <p className="text-xs text-themeBlack-200 mr-2">{index + 1}.</p>
                            <p className="text-xs text-themeBlack-200 flex-1">#{item.campaign_id}</p>
                            <p className="text-xs text-white bg-themePink/80 rounded-lg p-1 pt-0.5 text-right">{item.status}</p>
                        </div>
                       
                       
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-themeBlack-200">{t("Level")}</p>
                            <p className="text-xs text-themeBlack-200">{item.creatorLevel}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-themeBlack-200">{t("Platform")}</p>
                            <p className="text-xs text-themeBlack-200 capitalize">{item.platform?.replace('_', ' ')}</p>
                        </div>
                        {!isUserDetail && (
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-themeBlack-200">{t("Brand")}</p>
                                <p className="text-xs text-themeBlack-200">{item.brand_title}</p>
                            </div>
                        )}
                        {/* <Link to={`/campaign-detail/${item.campaign_id}/${item._id}`} className="outline-none text-center text-sm text-white bg-themePink rounded-md px-4 py-2">
                            {t("View")}
                        </Link> */}
                        
                    
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default CampaignTable;


const TableRow = ({ item, index, isUserDetail }) => (
    <tr className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
        <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
        <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_id}</td>
        <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_type}</td>
        {!isUserDetail && <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_option}</td>}
        <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap">{item.creatorLevel}</td>
        <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap capitalize">{item.platform?.replace('_', ' ')}</td>
        {!isUserDetail && <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap">{item.brand_title}</td>}
        <td className="py-3 px-4 text-sm text-themeBlack-200 whitespace-nowrap">{item.status}</td>
        <td className="px-4 py-1.5 flex-1 flex gap-1">
            <Link to={`/campaign-detail/${item.campaign_id}/${item._id}`} className="outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2">
                View
            </Link>
        </td>
    </tr>
);



