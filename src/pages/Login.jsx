import React from 'react'
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import Button from '../components/Button';
import { login } from '../services/employeeServices';

function Login() {
    const [t] = useTranslation("global");
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null)
        try {
            const response = await login(data);
            const res = await response.json();
            if(response.status === 200){
                localStorage.setItem('admintoken', res.token);
                window.location.pathname = '/'
            }
            setError(res.message);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='px-6 py-6 w-1/3 rounded-xl border-[1px] border-themeGrey-70 shadow-sm bg-white'>
                <div className='flex justify-start items-center gap-4'>
                    <img
                        src={'/logo.png'}
                        className='w-8 h-8 object-cover'
                    />
                    <h2 className='text-xl text-themePink font-bold'>{t('logintoImfact')}</h2>
                </div>

                <form onSubmit={onSubmit} className='flex flex-col gap-2 mt-7'>
                    <Input
                        label={t('email')}
                        placeholder={t('enterEmail')}
                        type='email'
                        value={data.email}
                        name="email"
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required={true}
                    />
                    <Input
                        label={t('password')}
                        placeholder={t('enterPassword')}
                        type='password'
                        value={data.password}
                        name="password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required={true}
                    />
                   {error && <p className='text-sm text-red-700 font-semibold text-center w-full'>{error}</p>}
                    <Button
                        text={t('login')}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    )
}

export default Login
