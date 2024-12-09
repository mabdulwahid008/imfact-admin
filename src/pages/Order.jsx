import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { getOrderDetail } from '../services/getOrderDetail'
import { useTranslation } from 'react-i18next'
import { convertTimeIntoSeoul } from '../utils/convertTimeIntoSeoul'
import { IMAGE_URL, PLATFORMS } from '../constants'
import { formateDate } from '../utils/formateDate'
import { defaultPic } from '../utils/defaultPic'
import { AiOutlineFileDone } from "react-icons/ai";
import { PiUserListFill } from "react-icons/pi";
import { TbScoreboard } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import { updateOrderSatus } from '../services/updateOrderStatus'
import { toast } from 'react-toastify'

function Order() {
    const { _id } = useParams()
    const [loading, setLoading] = React.useState(true)
    const [order, setOrder] = React.useState(null)
    const [t] = useTranslation('global')
    const [disabled, setDisabled] = React.useState(false)

    const sietLang = 'eng'

    useEffect(() => {
        const getOrder = async () => {
            const res = await getOrderDetail(_id)
            setOrder(res.order?? null)
            setLoading(false)
        }
        getOrder()
    }, [])


    const updateStatus = async (status) => {
        const confirm = window.confirm('Are you sure you want to update status?')
        if(!confirm) return
        setDisabled(true)
        try {
            const response = await updateOrderSatus(_id, status)
            const res = await response.json();
            if(response.status === 200){
                setOrder({...order, status})
                toast.success(res.message)
            }
            else
                toast.error(res.message)
        } catch (error) {
            console.log(error);
        }
        setDisabled(false)
    }


    useEffect(() => {
        if(order &&  new Date(order.campaign.end_date) < new Date()){
            setDisabled(true)
        }
    }, [order])

    return (
        <>
            {!order ?
                <Loader />
                :
                <div className='flex gap-10 sm:flex-col sm:gap-4'>

                    <div className='flex-1 rounded-lg overflow-hidden sm:rounded-lg'>
                        <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                            {t('OrderDetail')}
                        </h2>
                        <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-xs font-medium uppercase text-themeBlack-400'>{t('basic_info')}</h4>
                                <hr className='w-full h-0.5 border-t-[0px] border-b-[1px] border-themeGrey-70' />
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('OrderID')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order?.OrderID}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('status')}:</p>
                                <p className='text-themePink text-xs font-normal'>{order.status}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('created_at')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{convertTimeIntoSeoul(order.createdAt)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('deliveryDate')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.submissions?.length > 0 ? convertTimeIntoSeoul(order.submissions[order.submissions.length - 1].createdAt) : '---'}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('revisions')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.submissions?.length - 1 > 0 ? order.submissions?.length - 1 : 0}</p>
                            </div>

                            <div className='flex flex-col gap-1 mt-4'>
                                <h4 className='text-xs font-medium uppercase text-themeBlack-400'>{t('paymentInfo')}</h4>
                                <hr className='w-full h-0.5 border-t-[0px] border-b-[1px] border-themeGrey-70' />
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('PaymentStatus')}:</p>
                                <p className='text-white text-xs font-normal px-2 py-1 rounded-md bg-themePink'>{t(order.paymentStatus)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full mb-5'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('paument')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.payment || 0}</p>
                            </div>
                            {order.status !== 'Completed' &&
                             <button onClick={()=>updateStatus('Completed')} disabled={disabled} className='disabled:opacity-50 disabled:cursor-not-allowed bg-themePink rounded-md py-3 w-full hover:opacity-80 transition-all ease-in duration-100 text-sm font-semibold text-white'>
                                {t('markasCompleted')}
                            </button>}
                           {order.status !== 'Cancelled'&&
                            <button onClick={()=>updateStatus('Cancelled')}  disabled={disabled} className='disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 rounded-md py-3 w-full hover:opacity-80 transition-all ease-in duration-100 text-sm font-semibold text-white'>
                                {t('markasCancelled')}
                            </button>}
                        </div>
                    </div>

                    <div className='flex-1 rounded-lg overflow-hidden sm:rounded-lg'>
                        <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                            {t('campaignDetail')}
                        </h2>
                        <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                            <div className='flex justify-start items-center gap-3'>
                                <img
                                    src={`${IMAGE_URL}/uploads/${order.campaign?.descriptionImage}`}
                                    alt='campaign'
                                    className='w-20 h-20 object-cover rounded-md'
                                />
                                <div className='flex flex-col w-full gap-2'>
                                    <h2 className='text-themeBlack-300 text-xs'>
                                        {order.campaign?.campaign_title}
                                    </h2>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('CampaignID')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{order.campaign.campaign_id}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full gap-1 sm:flex-wrap sm:justify-start'>
                                        <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{order.campaign.campaign_type}</p>
                                        <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{sietLang === 'eng' ? order.campaign.category.name : order.campaign.category.kor_name}</p>
                                        <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{order.campaign.campaign_option}</p>
                                        <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{order.campaign.campaign_method}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('Platform')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal flex gap-2'>
                                    <img src={PLATFORMS.find(p => p.key === order.campaign.platform?.toLowerCase())?.logo} className='w-5 h-5' />
                                    {sietLang === 'eng' ?
                                        PLATFORMS.find(p => p.key === order.campaign.platform?.toLowerCase())?.title :
                                        PLATFORMS.find(p => p.key === order.campaign.platform?.toLowerCase())?.kor_title}
                                </p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('recuriteCreator')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.campaign.creator_count || 0}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('status')}:</p>
                                <p className='text-themePink text-xs font-normal'>{order.campaign.status}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('Level')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.campaign.creatorLevel}</p>
                            </div>
                            <div className='flex flex-col gap-1 mt-4'>
                                <h4 className='text-xs font-medium uppercase text-themeBlack-400'>{t('schedulings')}</h4>
                                <hr className='w-full h-0.5 border-t-[0px] border-b-[1px] border-themeGrey-70' />
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('start_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.start_date)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('recruit_end_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.recruit_end_date)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('approve_end_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.approve_end_date)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('delivery_visit_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.delivery_visit_date)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('active_end_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.active_end_date)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('confirm_end_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.confirm_end_date)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-themeBlack-300 text-xs font-normal'>{t('end_date')}:</p>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.campaign.end_date)}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 rounded-lg overflow-hidden sm:rounded-lg'>
                        <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                            {t('creatorDetail')}
                        </h2>
                        <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                            <div className='flex justify-start items-center gap-3'>
                                <img src={order.creator.profilePic ? `${IMAGE_URL}/uploads/${order.creator.profilePic}` : defaultPic()}
                                    className='w-16 h-16 rounded-full object-cover'
                                />
                                <div className='flex flex-col w-full gap-2 justify-start items-start'>
                                    <h2 className='text-themeBlack-300 text-sm font-bold leading-3'>
                                        {order.creator.name} <span className='font-normal text-xs'>{order.creator.nickname}</span>
                                    </h2>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('CreatorID')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{order.creatorID}</p>
                                    </div>
                                    <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{sietLang === 'eng' ? order.creator.category.name : order.creator.category.kor_name}</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                <div className='flex justify-start items-center gap-2'>
                                    <TiStarFullOutline className="text-themePink text-xl" />
                                    <p className='text-themeBlack-300 text-xs font-normal'>{t('Level')}:</p>
                                </div>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.creator.level}</p>
                            </div>
                            <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                <div className='flex justify-start items-center gap-2'>
                                    <PiUserListFill className="text-themePink text-xl" />
                                    <p className='text-themeBlack-300 text-xs font-normal'>{t('Joinedon')}:</p>
                                </div>
                                <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(order.creator.createdAt)}</p>
                            </div>
                            <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                <div className='flex justify-start items-center gap-2'>
                                    <TbScoreboard className="text-themePink text-xl" />
                                    <p className='text-themeBlack-300 text-xs font-normal'>{t('CTI')}:</p>
                                </div>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.creator.ctiScore}</p>
                            </div>
                            <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                <div className='flex justify-start items-center gap-2'>
                                    <AiOutlineFileDone className="text-themePink text-xl" />
                                    <p className='text-themeBlack-300 text-xs font-normal'>{t('completedOrders')}:</p>
                                </div>
                                <p className='text-themeBlack-300 text-xs font-normal'>{order.creator.completed}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Order
