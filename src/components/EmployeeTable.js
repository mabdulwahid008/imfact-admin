import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deactivateEmployee, deleteEmployee } from '../services/employeeServices';

function EmployeeTable({ employess, setEmployees }) {
    const [t] = useTranslation("global");
    return (
 <div className="overflow-x-auto sm:overflow-hidden">
            <table className="min-w-full">
                <thead className='sm:hidden'>
                    <tr className="text-left border-y-[1px] border-themeGrey-100">
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("Serial")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t("name")}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('email')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('department')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('phone')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('status')}</th>
                        <th className="py-3 px-4 text-themeBlack-200 text-sm font-semibold">{t('Action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {employess.map((item, index) => (
                        <TableRow item={item} index={index} setEmployees={setEmployees}/>
                    ))}
                </tbody>
            </table>
            {/* Fallback for smaller screens */}
<div className="sm:flex flex-col gap-4 hidden">
   
{employess.map((item, index) => (
                    <TableRow item={item} index={index} setEmployees={setEmployees}/>
))}
</div>

            {/* {employess.length === 0 &&
                <p className='w-full text-center text-sm text-themeBlack-200 font-medium py-3 border-themeGrey-100 border-b-[1px]'>
                    {t("nodata")}
                </p>} */}
        </div>
    )
}

export default EmployeeTable



const TableRow = ({ item, index, setEmployees }) => {
    const [isOn, setIsOn] = useState(item.status === 'active');
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation("global");
    const activateOrDeactivate = async () => {
        setIsOn(!isOn);
        try {
            const response = await deactivateEmployee(item._id);
            const res = await response.json();
            if (response.status === 200)
                toast.success(res.message);
            else {
                toast.error(res.message);
                setIsOn(!isOn);
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const deleteEmploye = async () => {
        const confirm = window.confirm(t('deleteConfirm'));
        if (!confirm) {
            setLoading(false);
            return;
        }
        try {
            const response = await deleteEmployee(item._id);
            const res = await response.json();
            if (response.status === 200){
                setEmployees(prev => prev.filter(emp => emp._id !== item._id));
                toast.success(res.message);
            }
            else
                toast.error(res.message);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }


    return (
        <>
        <tr key={index} className="sm:hidden hover:bg-themeGrey-400 border-b-[1px] border-themeGrey-100">
            <td className="py-3 px-4 text-sm text-themeBlack-200">{index + 1}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.name}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.email}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200 capitalize">{item.department}</td>
            <td className="py-3 px-4 text-sm text-themeBlack-200">{item.phone}</td>
            <td className='py-3 px-4'>
                <button
                    onClick={activateOrDeactivate}
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
                <Link to={`/employee-edit/${item.name}/${item._id}`} className='outline-none min-w-2 text-sm text-white bg-themePink rounded-md px-4 py-2'>
                    {t('Edit')}
                </Link>
                <button onClick={deleteEmploye} disabled={loading} className='outline-none text-sm text-white bg-red-400 rounded-md px-4 py-2'>
                    {t('Delete')}
                </button>
            </td>
        </tr>
        <Link to={`/employee-detail/${item.employee_id}/${item._id}`} className=' hidden sm:flex flex-col bg-white gap-2 border-themeGrey-100 border-[1px] rounded-xl p-4' key={index}>

            <div className="flex gap-1 justify-between">
                <p className="text-xs text-themeBlack-200 mr-2">{index + 1}.</p>
                {/* <p className="text-xs text-themeBlack-200 flex-1">#{item.employee_id}</p> */}
                <p className={`text-xs text-white rounded-lg p-1 pt-0.5 text-right ${
                    item.status === 'active' ? 'bg-green-500' : 'bg-red-400'
                }`}>
                    {item.status}
                </p>
            </div>

            <div className="flex justify-between items-center">
                <p className="text-xs text-themeBlack-200">{t("Name")}</p>
                <p className="text-xs text-themeBlack-200">{item.name}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-themeBlack-200">{t("Email")}</p>
                <p className="text-xs text-themeBlack-200">{item.email}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-themeBlack-200">{t("Department")}</p>
                <p className="text-xs text-themeBlack-200 capitalize">{item.department}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-themeBlack-200">{t("Phone")}</p>
                <p className="text-xs text-themeBlack-200">{item.phone}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-2 justify-between items-center">
    <button
        onClick={() => activateOrDeactivate(item._id)}
        className={`w-10 h-5 rounded-full flex items-center p-1 px-1 transition-colors duration-300 ${item.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}
    >
        <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${item.status === 'active' ? 'translate-x-4' : '-translate-x-0'}`}
        />
    </button>

    <div className="flex gap-3">
        <Link
            to={`/employee-edit/${item.name}/${item._id}`}
            className="text-xs text-white bg-themePink rounded-md px-3 py-1"
        >
            {t("Edit")}
        </Link>
        <button
            onClick={() => deleteEmploye(item._id)}
            className="text-xs text-white bg-red-400 rounded-md px-3 py-1"
        >
            {t("Delete")}
        </button>
    </div>
</div>


          
        </Link>

        </>
    )
}
