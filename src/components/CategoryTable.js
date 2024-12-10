import React from 'react'
import { formateDate } from '../utils/formateDate';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../services/catgories';
import { toast } from 'react-toastify';

function CategoryTable({ data, setRefresh }) {
    const [t] = useTranslation("global");
    const [loading, setLoading] = React.useState(false);

    const delteCate = async (id) => {
        const confirm = window.confirm(t('deleteConfirm'))
        if (!confirm) return
        try {
            setLoading(true);
            const response = await deleteCategory(id);
            const res = await response.json()
            if (response.status === 200) {
                toast.success(res.message)
                setRefresh(s => !s)
            }
            else {
                toast.error(res.message)
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full sm:hidden">
                <thead className='sm:hidden sm:overflow-hidden'>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Serial")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("name")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap" >{t('kor_name')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold whitespace-nowrap">{t('created_at')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
                            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
                            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.name}</td>
                            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.kor_name}</td>
                            <td className="py-3 px-4 text-sm text-themeBlack-200">{formateDate(item.createdAt)}</td>

                            <td className='px-4 py-1.5 flex-1 flex gap-1'>
                                <Link to={`/edit-category/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
                                    {t('Edit')}
                                </Link>
                                <button onClick={() => delteCate(item._id)} disabled={loading} className='outline-none text-sm text-white bg-red-400 rounded-md px-4 py-2'>
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

                <div className='sm:flex flex-col gap-2 hidden'>
                
                {data.map((item, index) => (
                    <div key={item._id} className="hidden sm:flex flex-col bg-white gap-2 border-themeGrey-100 border-[1px] rounded-xl p-4">
                        <div className="flex gap-4 justify-between items-center">
                            <p className="text-xs text-themeBlack-200">{t("Serial")}: {index + 1}</p>
                        </div>
                        <div className="flex justify-between items-center">
                        <p className="text-xs text-themeBlack-200">{t("name")}:</p>
                        <p className="text-xs text-themeBlack-200">{item.name}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-themeBlack-200">{t("kor_name")}:</p>
                            <p className="text-xs text-themeBlack-200"> {item.kor_name}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-themeBlack-200">{t("created_at")}:</p>
                            <p className="text-xs text-themeBlack-200"> {formateDate(item.createdAt)}</p>
                        </div>
                        <div className="flex gap-2 mt-2 justify-end items-center">
                            <button to={`/edit-category/${item._id}`} 
                            className="text-xs text-white bg-themePink rounded-sm px-3 py-1">
                                {t("Edit")}
                            </button>
                            <button onClick={() => delteCate(item._id)} disabled={loading} 
                            className="text-xs text-white bg-red-400 rounded-sm px-3 py-1">
                                {t("Delete")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryTable
