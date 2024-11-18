import React from 'react'
import { useTranslation } from 'react-i18next';

function BalanceTable({balances, role}) {
    const [t] = useTranslation("global");
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Serial")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("user")}</th>
                        {role === 'creator' ?
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("OrderID")}</th>
                        :
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("CampaignID")}</th>
                        }
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("amount")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("type")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Status")}</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((item, index) => (
                        <TableRow item={item} index={index} role={role} />
                    ))}
                </tbody>
            </table>
            {balances.length === 0 &&
                <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
                    {t("nodata")}
                </p>}
        </div>
    )
}

export default BalanceTable


const TableRow = ({ item, index, role }) => {
    const [t] = useTranslation("global");

    return (
        <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{item.creator?.nickname}</td>
            {role === 'creator' ?
                <td className="py-3 px-4 text-sm text-themeBlack-200">{item.order?.OrderID}</td>
                :
                <td className="py-3 px-4 text-sm text-themeBlack-200">{item.campaign?.campaign_id}</td>
            }
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.balance}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.type}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.status}</td>
        </tr>
    )
}
