
import React, { useEffect } from 'react'
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createBank, getBankById, updateBank } from '../services/banks';
import Keyword from '../components/Keyword';
import { createStates, getStateById, updateStates } from '../services/states';

function State() {
    const { _id } = useParams()
    const [t] = useTranslation("global");
    const [loading, setLoading] = React.useState(_id ? true: false);
    const [data, setData] = React.useState({})
    const navigate = useNavigate()

    const onSubmit = async (e) => { 
        e.preventDefault();
        setLoading(true);
        let response 
        try {
            if (_id) {
                response = await updateStates(_id, data)
            } else {
                response = await createStates(data)
            }
            const res = await response.json()

            if(response.status === 200){
                toast.success(res.message)
                navigate(-1)
            }
            else{
                toast.error(res.message)
            }

        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    }


    useEffect(() => {
        const getCat = async () => {
            try {
                const response = await getStateById(_id)
                const res = await response.json()
                setData({...res, cities:res?.cities?.map(city => city.name)})
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getCat()
    }, [_id])
  return (
    <>
    {_id && loading ?
        <Loader />
        :
        <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 sm:gap-2 sm:pb-10 sm:rounded-lg sm:bg-white sm:w-full sm:py-6 sm:p-0 w-1/2 shadow-sm'>
            <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0 sm:px-6'>{_id? t('editState') : t('createState')}</h2>
            <div className='px-10 mt-0 flex flex-col gap-2 sm:px-6'>
                    <Input
                        label={t('name')}
                        placeholder={t('name')}
                        type='text'
                        value={data.name}
                        name="name"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        required={true}
                    />
              
                        <Keyword 
                            value={data.cities}
                            onChange={(e) => setData({ ...data, cities: e.target.value })}
                            placeholder={t('AddCity')}
                            label={t('cities')}
                            name='cities'
                            readOnly={false}
                        />

                <span className='w-1/2'>
                    <Button
                        text={_id? t('update') : t('create')}
                        disabled={loading}
                        onClick={onSubmit}
                    />
                </span>
            </div>
        </div>}
</>
  )
}

export default State
