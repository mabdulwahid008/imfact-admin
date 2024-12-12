import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { getLevels, updateLevels } from '../services/levels';
import Loader from './Loader';
import Input from './Input';
import { PLATFORMS } from '../constants';
import Button from './Button';
import { toast } from 'react-toastify';

function Fee() {
    const [t] = useTranslation("global");

    const [levels, setLevels] = React.useState(null);
    const [otherFee, setOtherFee] = React.useState(null);
    const [loading, setLoading] = React.useState(null);
    const siteLang = "eng"

    useEffect(() => {
        const levels = async () => {
            try {
                const res = await getLevels();
                setOtherFee({
                    delivery_amount: res[0]?.delivery_amount,
                    review_amount: res[0]?.review_amount,
                    action_amount: res[0]?.action_amount,
                })
                setLevels(res);
            } catch (error) {
                console.log(error);
            }
        }
        levels();
    }, [])

    const onChange = (e, index) => {
        let value = e.target.value
        if (Number(value) < 0 || isNaN(value))
            value = 0
        setLevels(levels.map((level, i) => {
            if (i === index) {
                return {
                    ...level,
                    [e.target.name]: value
                }
            }
            return level;
        }))
    }

    const handleOtherFee = (e) => {
        let value = e.target.value
        if (Number(value) < 0 || isNaN(value))
            value = 0

        setOtherFee(prev => ({...prev, [e.target.name]: value}))
    }
    


    useEffect(() => {

        if(levels && otherFee){
            setLevels(levels.map((level) => {
                return {
                    ...level,
                    delivery_amount: otherFee.delivery_amount,
                    review_amount: otherFee.review_amount,
                    action_amount: otherFee.action_amount,
                }
            }))
        }

    }, [otherFee])


    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await updateLevels(levels);
            const res = await response.json();
            if(response.status === 200){
                toast.success(res.message);
            }
            else{
                toast.error(res.message);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }


    return (
        <>
            {!levels ?
                <Loader />
                :
                <div className='rounded-xl py-6 bg-white flex-1 flex flex-col gap-5 sm:gap-2 sm:pb-10 sm:rounded-lg sm:bg-transparent sm:p-0 w-[60%]'>
                    <h2 className='text-themeBlack-300 text-lg font-bold px-10 mb-0 sm:px-0'>{(t('AdjustFees'))}</h2>
                    {levels.map((level, index) => (
                        <div key={index} className='flex flex-col gap-2 px-10'>
                            <h2 className='text-sm font-semibold text-themeBlack-900'>{level.name}</h2>
                            <div className='flex gap-4'>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <Input
                                        name='youtube_shorts_amount'
                                        type='number'
                                        value={level.youtube_shorts_amount}
                                        className='text-center'
                                        onChange={(e) => onChange(e, index)}
                                    />
                                    <p className='flex gap-1 items-center justify-center'>
                                        <img
                                            src={PLATFORMS.find((platform) => platform.key === 'youtube_shorts').logo}
                                            className='w-5 h-5'
                                        />
                                        <p className='text-xs text-themeBlack-200'>
                                            {siteLang === 'eng' ?
                                                PLATFORMS.find((platform) => platform.key === 'youtube_shorts').title
                                                :
                                                PLATFORMS.find((platform) => platform.key === 'youtube_shorts').kor_title

                                            }
                                        </p>
                                    </p>
                                </div>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <Input
                                        name='instagram_reels_amount'
                                        type='number'
                                        value={level.instagram_reels_amount}
                                        className='text-center'
                                        onChange={(e) => onChange(e, index)}
                                    />
                                    <p className='flex gap-1 items-center justify-center'>
                                        <img
                                            src={PLATFORMS.find((platform) => platform.key === 'instagram_reels').logo}
                                            className='w-5 h-5'
                                        />
                                        <p className='text-xs text-themeBlack-200'>
                                            {siteLang === 'eng' ?
                                                PLATFORMS.find((platform) => platform.key === 'instagram_reels').title
                                                :
                                                PLATFORMS.find((platform) => platform.key === 'instagram_reels').kor_title

                                            }
                                        </p>
                                    </p>
                                </div>
                                <div className='flex flex-col gap-1 flex-1'>
                                    <Input
                                        name='tiktok_amount'
                                        type='number'
                                        value={level.tiktok_amount}
                                        className='text-center'
                                        onChange={(e) => onChange(e, index)}
                                    />
                                    <p className='flex gap-1 items-center justify-center'>
                                        <img
                                            src={PLATFORMS.find((platform) => platform.key === 'tiktok').logo}
                                            className='w-5 h-5'
                                        />
                                        <p className='text-xs text-themeBlack-200'>
                                            {siteLang === 'eng' ?
                                                PLATFORMS.find((platform) => platform.key === 'tiktok').title
                                                :
                                                PLATFORMS.find((platform) => platform.key === 'tiktok').kor_title

                                            }
                                        </p>
                                    </p>
                                </div>
                            </div>
                            {index < levels.length - 1 && <hr className='border-themeGrey-70 mt-2 border-t-[1px] border-b-0 w-full' />}
                        </div>
                    ))}
                    <h2 className='text-themeBlack-300 text-lg font-bold px-10 mt-5'>{(t('otherFee'))}</h2>

                    <div className='flex gap-4 px-10 w-full'>
                        <div className='flex flex-col gap-1 flex-1'>
                            <h2 className='text-sm font-semibold text-themeBlack-900'>{t('review_amount')}</h2>
                            <Input
                                name='review_amount'
                                type='number'
                                value={otherFee.review_amount}
                                className='text-center'
                                onChange={handleOtherFee}
                            />
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <h2 className='text-sm font-semibold text-themeBlack-900'>{t('action_amount')}</h2>
                            <Input
                                name='action_amount'
                                type='number'
                                value={otherFee.action_amount}
                                className='text-center'
                                onChange={handleOtherFee}
                            />
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <h2 className='text-sm font-semibold text-themeBlack-900'>{t('deliverycharges')}</h2>
                            <Input
                                name='delivery_amount'
                                type='number'
                                value={otherFee.delivery_amount}
                                className='text-center'
                                onChange={handleOtherFee}
                            />
                        </div>
                    </div>
                    <span className='w-1/3 px-10'>
                        <Button 
                            text={t('update')}
                            onClick={onSubmit}
                            disabled={loading}
                        />
                    </span>
                </div>
            }
        </>
    )
}

export default Fee
