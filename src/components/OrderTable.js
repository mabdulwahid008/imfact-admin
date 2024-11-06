import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

function OrderTable({ orders}) {
    const [t] = useTranslation("global");
  return (
       <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Serial</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">OrderID</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">CreatorID</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Creator</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">CustomerID</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Customer</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">CampaignID</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Status</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <TableRow item={item} index={index} />
                    ))}
                </tbody>
            </table>
                    {orders.length === 0 && 
                    <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
                        {t("nodata")}
                    </p>}
        </div>
  )
}

export default OrderTable



const TableRow = ({ item, index }) => {


    return (
        <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.OrderID}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.creatorID}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{item.creator?.nickname}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.customerID}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{item.customer?.nickname}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign?.campaign_id}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.status}</td>
           
            <td className='px-4 py-1.5 flex-1 flex gap-1'>
                <Link to={`/order/${item.OrderID}/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
                    View
                </Link>
            </td>
        </tr>
    )
}
