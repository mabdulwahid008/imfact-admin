import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import { selectStyles } from '../utils/selectStyles';
import Select from 'react-select'
import { ROUTES } from '../constants/route';
import Button from '../components/Button';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/employeeServices';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function Employee() {
    const [t] = useTranslation("global");
    const [loading, setLoading] = React.useState(false);
    const { _id } = useParams()
    const [data, setData] = React.useState({
        menu: []
    })

    const location = useLocation();
    const naviagte = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let response
            if (_id)
                response = await updateEmployee(_id, data);
            else
                response = await createEmployee(data);
            const res = await response.json();
            if (response.status === 201 || response.status === 200){
                toast.success(res.message);
                naviagte('/manage-employees')
            }
            else
                toast.error(res.message);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }



    const getEmployee = async () => {
        try {
            const response = await getEmployeeById(_id);
            setData(response.employee);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (_id) {
            setLoading(true);
            getEmployee()
        }
    }, [_id])

    useEffect(() => {
        setData({ menu: [] })
    }, [location.pathname])

    return (
        <>
            {_id && loading ?
                <Loader />
                :
                <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 sm:gap-2 sm:pb-10 sm:rounded-lg sm:w-full w-1/2 shadow-sm'>
                    <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0 sm:px-6'>{_id? t('EditEmployee') : t('createEma')}</h2>
                    <form onSubmit={onSubmit} className='px-10 mt-0 flex flex-col gap-2 sm:gap-3 sm:px-6'>
                        <div className='flex gap-3 w-full sm:flex-col'>
                            <Input
                                label={t('name')}
                                placeholder={t('enterName')}
                                type='text'
                                value={data.name}
                                name="name"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                required={true}
                            />
                            <Input
                                label={t('email')}
                                placeholder={t('enterEmail')}
                                type='email'
                                value={data.email}
                                name="email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                required={true}
                            />
                        </div>
                        <div className='flex gap-3 w-full sm:flex-col   '>
                            <Input
                                label={t('phone')}
                                placeholder={t('enterPhone')}
                                type='number'
                                value={data.phone}
                                name="phone"
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                required={true}
                            />
                            <Input
                                label={t('department')}
                                placeholder={t('enterDepartment')}
                                type='text'
                                value={data.department}
                                name="department"
                                onChange={(e) => setData({ ...data, department: e.target.value })}
                                required={true}
                            />
                        </div>
                        {!_id &&
                            <Input
                                label={t('password')}
                                placeholder={t('enterPassword')}
                                type='password'
                                value={data.password}
                                name="password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                required={true}
                            />}
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-themeBlack-200 text-sm font-medium'>{t('menus')}</label>
                            <Select
                                components={{ IndicatorSeparator: () => null }}
                                isMulti
                                onChange={(selectedOptions) =>
                                    setData({ ...data, menu: selectedOptions.map((opt) => opt.value) })
                                }
                                defaultValue={(data.menu?.map((itemID) => {
                                    return ROUTES.find(r => r.ID === itemID);
                                }) || []).map((item) => ({ value: item.ID, label: item.title }))}
                                options={ROUTES.map((item) => ({ value: item.ID, label: item.title }))}
                                styles={window.innerWidth >= 768 ? selectStyles : ""}
                            />
                        </div>
                        <span className='w-1/2'>
                            <Button
                                text={_id? t('update') : t('create')}
                                disabled={loading}
                                onClick={onSubmit}
                            />
                        </span>
                    </form>
                </div>}
        </>
    )
}

export default Employee
