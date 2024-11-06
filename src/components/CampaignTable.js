import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CampaignTable({ campaigns }) {
    const [t] = useTranslation("global");
    return (
         <div className="overflow-x-auto">
              <table className="min-w-full ">
                  <thead>
                      <tr className="text-left border-y-[1px] border-themeGrey-100">
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Serial</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">CampaignID</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Type</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Option</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Level</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Platform</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Brand</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Status</th>
                          <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {campaigns.map((item, index) => (
                          <TableRow item={item} index={index} />
                      ))}
                  </tbody>
              </table>
                      {campaigns.length === 0 && 
                      <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
                          {t("nodata")}
                      </p>}
          </div>
    )
}

export default CampaignTable




const TableRow = ({ item, index }) => {


    return (
        <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_id}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_type}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign_option}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.creatorLevel}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{item.platform?.replace('_', ' ')}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.brand_title}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.status}</td>
            <td className='px-4 py-1.5 flex-1 flex gap-1'>
                <Link to={`/campaign-detail/${item.campaign_id}/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
                    View
                </Link>
            </td>
        </tr>
    )
}
