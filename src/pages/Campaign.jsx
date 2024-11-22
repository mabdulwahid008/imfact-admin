import React, { useEffect } from 'react'
import Orders from '../components/Orders'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { getCampaignById } from '../services/getCampaignById'
import { IMAGE_URL, PLATFORMS } from '../constants'
import { useTranslation } from 'react-i18next'
import { defaultPic } from '../utils/defaultPic'
import { TiStarFullOutline } from 'react-icons/ti'
import { PiUserListFill } from 'react-icons/pi'
import { TbScoreboard } from 'react-icons/tb'
import { AiOutlineFileDone } from 'react-icons/ai'
import { formateDate } from '../utils/formateDate'

function Campaign() {
    const [t] = useTranslation("global");
    const { _id } = useParams()
    const [campaign, setCampaign] = React.useState(null)
    const sietLang = "eng"
    const [total, setTotal] = React.useState({
        total: 0,
        vat: 0,
        grandTotal: 0
    })

    useEffect(() => {
        const getCampaign = async () => {
            const res = await getCampaignById(_id)
            setCampaign(res)
        }
        getCampaign()
    }, [])


    useEffect(() => {
        if (campaign) {
            let total = 0
            if (["Payback", "Review"].includes(campaign.campaign_option)) {
                total += Number(
                    (campaign.media_fee * campaign.creator_count)
                )
            }

            if (campaign.campaign_option === "Review") {
                total += Number(
                    (campaign.delivery_fee * campaign.creator_count)
                )
            }
            if (campaign.campaign_option === "Payback") {
                total += Number(
                    (campaign.payback_amount * campaign.creator_count)
                )
                total += Number(
                    (campaign.payback_amount * 0.05)
                )
            }
            if (campaign.campaign_option === "10%") {
                total += Number(
                    (campaign.creator_count * campaign.tenPercent_fee)
                )
            }
            let vat = Number((total * 0.1).toFixed(2));
            let grandTotal = Number(total + vat);

            setTotal({
                total,
                vat,
                grandTotal
            })
        }

    }, [campaign])


    return (
        <>
            {!campaign ? <Loader />
                :

                <div class="grid grid-cols-3 gap-10 p-6 bg-gray-100">
                    <div class="col-span-2 grid grid-rows-2 gap-10">
                        <div class="grid grid-cols-2 gap-10">
                            <div className='flex-1 rounded-lg overflow-hidden'>
                                <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                                    {t('campaignDetail')}
                                </h2>
                                <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                                    <div className='flex justify-start items-center gap-3'>
                                        <img
                                            src={`${IMAGE_URL}/uploads/${campaign?.descriptionImage}`}
                                            alt='campaign'
                                            className='w-20 h-20 object-cover rounded-md'
                                        />
                                        <div className='flex flex-col w-full gap-2'>
                                            <h2 className='text-themeBlack-300 text-xs'>
                                                {campaign?.campaign_title}
                                            </h2>

                                            <div className='flex flex-wrap justify-start items-center w-full gap-1'>
                                                <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{campaign.campaign_type}</p>
                                                <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{sietLang === 'eng' ? campaign.category.name : campaign.category.kor_name}</p>
                                                <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{campaign.campaign_option}</p>
                                                <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{campaign.campaign_method}</p>

                                                <p className='text-themeBlack-300 text-xs font-normal text-right w-full -mt-8'>#{campaign.campaign_id}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('recuriteCreator')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.creator_count}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('appliedCreators')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.totalApplied}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('penidngOrders')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.penidngOrders}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('activeOrders')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.activeOrders}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('disputedOrders')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.disputedOrders}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('deliveredOrders')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.deliveredOrders}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('completedOrders')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.completedOrders}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('cancelledOrders')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.cancelledOrders}</p>
                                    </div>
                                    <button className='bg-themePink rounded-md py-3 w-full hover:opacity-80 transition-all ease-in duration-100 text-sm font-semibold text-white'>
                                        {t('holdCampaign')}
                                    </button>
                                </div>

                            </div>
                            <div className='flex-1 flex flex-col gap-10'>
                                <div className='rounded-lg overflow-hidden'>
                                    <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                                        {t('payment_Fee')}
                                    </h2>
                                    <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                                        {["Payback", "Review"].includes(campaign.campaign_option) &&
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{t('mediaFee')}:</p>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.media_fee).toLocaleString()}</p>
                                            </div>}
                                        {campaign.campaign_option === 'Payback' &&
                                            <>
                                                <div className='flex justify-between items-center w-full'>
                                                    <p className='text-themeBlack-300 text-xs font-normal'>{t('payback')}:</p>
                                                    <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.payback_amount).toLocaleString()}</p>
                                                </div>
                                                <div className='flex justify-between items-center w-full'>
                                                    <p className='text-themeBlack-300 text-xs font-normal'>{t('paybackProccessingFee')}:</p>
                                                    <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.payback_processing_fee).toLocaleString()}</p>
                                                </div>
                                            </>
                                        }
                                        {campaign.campaign_option === 'Action' &&
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{t('action_amount')}:</p>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.action_amount).toLocaleString()}</p>
                                            </div>}
                                        {campaign.review &&
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{t('review_amount')}:</p>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.review_amount).toLocaleString()}</p>
                                            </div>}
                                        {campaign.campaign_option === 'Review' &&
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{t('deliverycharges')}:</p>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.delivery_fee).toLocaleString()}</p>
                                            </div>
                                        }
                                        <div className='border-y-[1px] border-themeGrey-70 py-3 flex flex-col gap-3'>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{t('total')}:</p>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{Number(total.total).toLocaleString()}</p>
                                            </div>
                                            <div className='flex justify-between items-center w-full'>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{t('vat')}:</p>
                                                <p className='text-themeBlack-300 text-xs font-normal'>{Number(total.vat).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('grandTotal')}:</p>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{Number(total.grandTotal).toLocaleString()}</p>
                                        </div>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('refund')}:</p>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{Number(campaign.refund || 0).toLocaleString()}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className='rounded-lg overflow-hidden'>
                                    <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                                        {t('levelmedia')}
                                    </h2>
                                    <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('Platform')}:</p>
                                            <p className='text-themeBlack-300 text-xs font-normal flex gap-2'>
                                                <img src={PLATFORMS.find(p => p.key === campaign.platform?.toLowerCase())?.logo} className='w-5 h-5' />
                                                {sietLang === 'eng' ?
                                                    PLATFORMS.find(p => p.key === campaign.platform?.toLowerCase())?.title :
                                                    PLATFORMS.find(p => p.key === campaign.platform?.toLowerCase())?.kor_title}
                                            </p>
                                        </div>
                                        <div className='flex justify-between items-center w-full'>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('creatorLevel')}:</p>
                                            <p className='text-themeBlack-300 text-xs font-normal'>{campaign.creatorLevel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Orders userId={''} campaignId={_id} />
                        </div>
                    </div>
                    <div class="col-span-1">
                        <div className='flex flex-col gap-10'>
                            <div className='flex-1 rounded-lg overflow-hidden'>
                                <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                                    {t('creatorDetail')}
                                </h2>
                                <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                                    <div className='flex justify-start items-center gap-3'>
                                        <img src={campaign.creator.profilePic ? `${IMAGE_URL}/uploads/${campaign.creator.profilePic}` : defaultPic()}
                                            className='w-16 h-16 rounded-full object-cover'
                                        />
                                        <div className='flex flex-col w-full gap-2 justify-start items-start'>
                                            <h2 className='text-themeBlack-300 text-sm font-bold leading-3'>
                                                {campaign.creator.name} <span className='font-normal text-xs'>{campaign.creator.nickname}</span>
                                            </h2>
                                            <p className='text-themeBlack-300 text-xs font-normal px-2 py-1 border-themeGrey-70 rounded-md border-[1px]'>{sietLang === 'eng' ? campaign.creator?.category.name : campaign.creator?.category.kor_name}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                        <div className='flex justify-start items-center gap-2'>
                                            <TiStarFullOutline className="text-themePink text-xl" />
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('Level')}:</p>
                                        </div>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.creator.level}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                        <div className='flex justify-start items-center gap-2'>
                                            <PiUserListFill className="text-themePink text-xl" />
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('Joinedon')}:</p>
                                        </div>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.creator.createdAt)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                        <div className='flex justify-start items-center gap-2'>
                                            <TbScoreboard className="text-themePink text-xl" />
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('CTI')}:</p>
                                        </div>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.creator.ctiScore}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full pt-3 border-t-[1px] border-themeGrey-70'>
                                        <div className='flex justify-start items-center gap-2'>
                                            <AiOutlineFileDone className="text-themePink text-xl" />
                                            <p className='text-themeBlack-300 text-xs font-normal'>{t('completedCampaigns')}:</p>
                                        </div>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{campaign.creator.completed}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-1 rounded-lg overflow-hidden'>
                                <h2 className='bg-themePink/20 px-5 py-3 text-sm font-medium text-themeBlack-300'>
                                    {t('schedulings')}
                                </h2>
                                <div className='flex flex-col bg-white px-5 py-4 gap-3'>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('start_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.start_date)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('recruit_end_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.recruit_end_date)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('approve_end_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.approve_end_date)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('delivery_visit_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.delivery_visit_date)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('active_end_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.active_end_date)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('confirm_end_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.confirm_end_date)}</p>
                                    </div>
                                    <div className='flex justify-between items-center w-full'>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{t('end_date')}:</p>
                                        <p className='text-themeBlack-300 text-xs font-normal'>{formateDate(campaign.end_date)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            }
        </>
    )
}

export default Campaign
