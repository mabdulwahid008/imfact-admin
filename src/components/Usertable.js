import React, { useState } from 'react'
import { approveUser } from '../services/approveUser';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Usertable({ users }) {
    const [t] = useTranslation("global");
    return (
        <div className="overflow-x-auto sm:overflow-hidden">
            <table className="min-w-full">
                <thead className='sm:hidden'>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Serial')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Nickname')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('email')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('phone')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('status')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <TableRow item={item} index={index} />
                    ))}
                </tbody>
            </table>


            <div className="sm:flex flex-col gap-4 hidden">
    {users.map((item, index) => (
        <TableRow item={item} index={index} />
    ))}
</div>


            {users.length === 0 && 
                    <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
                        {t("nodata")}
                    </p>}
        </div>
    )
}

export default Usertable


const TableRow = ({ item, index }) => {
    const [isOn, setIsOn] = useState(item.approved);
    const [t] = useTranslation("global");
    const [loading, setLoading] = useState(false);

    const approveorUnapprove = async() => {
        try {
            setLoading(true);
            setIsOn(!isOn);
           const resp =  await approveUser(item._id);
           const res = await resp.json();
           if(resp.status === 200)
                toast.success(res.message);
           else{
                toast.error(res.error);
                setIsOn(!isOn);
            }
        } catch (error) {
            console.log(error);
            setIsOn(!isOn);
        }
        setLoading(false);
    }
    return (
    <> 
    <tr key={index} className="sm:hidden hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
        <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
        <td className="py-3 px-4 text-sm text-themeBlack-200">{item.nickname}</td>
        <td className="py-3 px-4 text-sm text-themeBlack-200">{item.email}</td>
        <td className="py-3 px-4 text-sm text-themeBlack-200">{item.phone}</td>
        <td className='py-3 px-4'>
            <button
                onClick={approveorUnapprove}
                disabled={loading}
                className={`w-12 h-6 rounded-full disabled:cursor-not-allowed flex items-center p-1 px-1 transition-colors duration-300 ${isOn ? 'bg-green-500' : 'bg-gray-300'
                    }`}
            >
                <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-0'
                        }`}
                />
            </button>
        </td>
        <td className='px-4 py-1.5 flex-1 flex gap-1'>
            <Link to={`/user/${item.nickname}/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
                {t('View')}
            </Link>
        </td>
    </tr>
    <Link to={`/user/${item.nickname}/${item._id}`} className=" hidden sm:flex flex-col bg-white gap-2 border-themeGrey-100 border-[1px] rounded-xl p-4">

            <div className="flex gap-1 justify-between">
                <p className="text-xs text-themeBlack-200 mr-2">{index + 1}.</p>
                <p className="text-xs text-themeBlack-200 flex-1">{item.nickname}</p>
                <p className={`text-xs text-white ${item.approved ? 'bg-green-500' : 'bg-gray-300'} rounded-lg p-1 pt-0.5 text-right`}>
                    {item.approved ? t('Approved') : t('Pending')}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-xs text-themeBlack-200">{t('Email')}</p>
                <p className="text-xs text-themeBlack-200">{item.email}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-themeBlack-200">{t('Phone')}</p>
                <p className="text-xs text-themeBlack-200">{item.phone}</p>
            </div>
            <div className="flex gap-4 mt-4 justify-between items-center">
    <button
        onClick={() => approveorUnapprove(item._id)}
        className={`w-10 h-5 rounded-full flex items-center p-1 px-1 transition-colors duration-300 ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}
    >
        <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${item.status === 'active' ? 'translate-x-4' : '-translate-x-0'}`}
        />
    </button>
    </div>
        </Link>
        </>
       
    )
}


