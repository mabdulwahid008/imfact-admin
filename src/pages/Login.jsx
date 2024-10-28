import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../constants/validations'
import { BASE_URL } from '../constants'
import { getMyProfile } from '../services/getMyProfile'
import { ResendOtp } from '../services/ResendOtp'
import { useTranslation } from 'react-i18next'

function Login() {
    const [activeBtn, setActiveBtn] = React.useState(false)
    const [data, setData] = React.useState({})
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [checkbox, setCheckbox] = React.useState(false)
    const navigate = useNavigate()
    const [t] = useTranslation('global')
   
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onCLick = async (e) => {
        e.preventDefault()
        if (loading || !activeBtn) return
        setLoading(true)
      

        setLoading(false)
    }

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('loggedInUser') || '{}'))
        setError(null)
        localStorage.setItem('loginRole', role)
    }, [role])

    useEffect(() => {
        if (validateEmail(data.email ?? '') && data.password?.length >= 8) {
            setActiveBtn(true)
        }
        else
            setActiveBtn(false)
    }, [data])

    return (
        <div className='w-full h-screen flex flex-1 bg-themeGrey-400/30 items-center justify-center overflow-hidden relative sm:bg-white'>
            <Link to='/' className='w-10 h-10 absolute left-16 top-3 sm:top-8 sm:left-8'>
                <img src={'/logo.png'} className='w-9 h-9 object-contain' />
            </Link>
            <div className='w-[35%] sm:w-full border-[1px] border-themeGrey-70 bg-white  rounded-[50px]'>
                <div
                    className='w-full bg-white rounded-[50px] shadow-sm h-auto sm:h-screen flex justify-center items-center sm:rounded-none sm:shadow-none'>
                    <div className='flex justify-center items-start sm:items-center sm:justify-start sm:py-24 flex-col gap-2 pt-14 pb-5 px-20 sm:px-0 relative h-full w-full sm:w-[80%]'>
                        <h1 className='text-[32px] leading-[42px] font-Pretendard font-bold text-themePink sm:text-center sm:text-[28px] capitalize'>{t('login')}</h1>
                        <p className='text-themeGrey-300 text-base font-normal text-left w-full sm:text-sm sm:text-center'>{t('please_enter')}</p>
                        <form onSubmit={onCLick} className='flex justify-center items-center flex-col w-full gap-5 mt-8 sm:pb-7'>
                            <Input
                                type={"email"}
                                placeholder={t('your_email')}
                                required={true}
                                name={"email"}
                                value={data.email}
                                onChange={onChange}
                                icon={<FaEnvelope className="text-base text-themeGrey-150 mt-1" />}
                            />
                            <Input
                                type={"password"}
                                placeholder={t('your_password')}
                                required={true}
                                name={"password"}
                                value={data.password}
                                onChange={onChange}
                                icon={<FaLock className="text-base text-themeGrey-150 mt-1" />}
                            />
                            <div className='flex justify-start items-center w-full gap-3 -mt-2'>
                                <input onChange={() => setCheckbox(!checkbox)} type="checkbox" className='checkbox sm:mt-0.5' checked={checkbox} />
                                <p className='sm:text-sm text-themeBlack-400'>{t('remember_me')}</p>
                            </div>
                            {error && <p className='text-sm text-center text-red-600 sm:text-xs -my-2'>{error}</p>}
                            <Button text={t("LogIn")} active={activeBtn} disabled={loading} />
                            <div className=' w-full sm:mt-0 mt-32 left-0'>
                                <p
                                    onClick={() => {
                                        let data = {}
                                        const role = localStorage.getItem('loginRole') || 'creator'
                                        data.role = role
                                        localStorage.setItem("newUser", JSON.stringify(data))
                                        navigate('/signup')
                                    }}
                                    className='sm:text-center cursor-pointer border-[1px] border-themeGrey-70 py-3 px-2.5 rounded-lg  flex justify-center items-center gap-1 text-sm text-themeBlack-400'>{t('dont_have_account')}
                                    <span className='text-themePink'>{t('sign_up')}</span>.</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
