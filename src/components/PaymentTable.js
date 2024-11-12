import React from 'react'
import { useTranslation } from 'react-i18next';
import { formateDate } from '../utils/formateDate';

function PaymentTable({ payments }) {
    const [t] = useTranslation("global");
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Serial")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("paymentId")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t("user")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t("CampaignID")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t("amount")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t("processed_date")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t("paymentType")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t("refund_amount")}</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((item, index) => (
                        <TableRow item={item} index={index} />
                    ))}
                </tbody>
            </table>
            {payments.length === 0 &&
                <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
                    {t("nodata")}
                </p>}
        </div>
    )
}

export default PaymentTable



const TableRow = ({ item, index }) => {
    const [t] = useTranslation("global");

    return (
        <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.paymentId}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.user?.nickname}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign?.campaign_id}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{Number(item.amount || 0).toLocaleString()}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{formateDate(item.processed_date)}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{item.type}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{Number(item.refund || 0).toLocaleString()}</td>

            <td className='px-4 py-1.5 flex-1 flex gap-1'>
            
            </td>
        </tr>
    )
}