

import React from 'react'
import { formateDate } from '../utils/formateDate';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function BankTable({ data, }) {
    const [t] = useTranslation("global");
    const [loading, setLoading] = React.useState(false);

    const delteCate = async (id) => {

    }
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full ">
        <thead>
            <tr className="text-left border-y-[1px] border-themeGrey-100">
                <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Serial")}</th>
                <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("name")}</th>
                <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t('kor_name')}</th>
                <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t('created_at')}</th>
                <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('action')}</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
              <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
              <td className="py-3 px-4 text-sm text-themeBlack-200">{item.eng_name}</td>
              <td className="py-3 px-4 text-sm text-themeBlack-200">{item.kor_name}</td>
              <td className="py-3 px-4 text-sm text-themeBlack-200">{formateDate(item.createdAt)}</td>
             
              <td className='px-4 py-1.5 flex-1 flex gap-1'>
                  <Link to={`/bank-edit/${item.name}/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
                      {t('Edit')}
                  </Link>
                  <button onClick={delteCate} disabled={loading} className='outline-none text-sm text-white bg-red-400 rounded-md px-4 py-2'>
                      {t('Delete')}
                  </button>
              </td>
          </tr>
            ))}
        </tbody>
    </table>
    {data.length === 0 &&
        <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
            {t("nodata")}
        </p>}
</div>
  )
}

export default BankTable
