import React, { useState } from 'react'
import { approveUser } from '../services/approveUser';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Usertable({ users }) {
    const [t] = useTranslation("global");
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full ">
                <thead>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Serial</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Nickname</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Email</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Phone</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Status</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => (
                        <TableRow item={item} index={index} />
                    ))}
                </tbody>
            </table>
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

    const approveorUnapprove = async() => {
        try {
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
        }
    }
    return (
        <tr key={index} className="hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.nickname}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.email}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.phone}</td>
            <td className='py-3 px-4'>
                <button
                    onClick={approveorUnapprove}
                    className={`w-12 h-6 rounded-full flex items-center p-1 px-1 transition-colors duration-300 ${isOn ? 'bg-green-500' : 'bg-gray-300'
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
                    View
                </Link>
                <button className='outline-none text-sm text-white bg-red-400 rounded-md px-4 py-2'>
                    Delete
                </button>
            </td>
        </tr>
    )
}