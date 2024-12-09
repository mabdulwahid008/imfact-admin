import React, { useEffect } from 'react'
import Card from '../components/Card'
import UserCard from '../components/UserCard'
import { AccordianArrow, Accordion, AccordionBody, AccordionHeader } from '../components/Accordion'
import { getUserInfo } from '../services/getUserInfo'
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import { PLATFORMS } from '../constants'
import { formateDate } from '../utils/formateDate'
import Orders from '../components/Orders'
import Campaigns from '../components/Campaigns'
import Loader from '../components/Loader'

function UserDetail() {
  const [user, setUser] = React.useState(null)
  const { _id } = useParams();
  const [t] = useTranslation("global")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo(_id)
        setUser(data?.user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
  }, [_id])




  return (
    <>
      {user ?
        <div className='flex flex-col gap-5 sm:gap-4'>
          <div className='grid grid-cols-4 gap-5 sm:grid-cols-2 sm:gap-4'>
            <Card
              title={user?.role === 'customer' ? t('totalCompletedCampaigns') : t('totalCompletedOrders')}
              value={user?.role === 'customer' ? user?.totalCompletedCampaigns : user?.totalCompletedOrders || 0}
            />
            <Card
              title={user?.role === 'customer' ? t('toaltRecuriteCampaigns') : t('totalActiveOrders')}
              value={user?.role === 'customer' ? user?.toaltRecuriteCampaigns : user?.totalActiveOrders || 0}
            />
            <Card
              title={user?.role === 'customer' ? t('CampaignsinConfirm') : t('totalsubmiitedOrders')}
              value={user?.role === 'customer' ? user?.totaltConfirmPeriodCampaigns : user?.totalsubmiitedOrders || 0}
            />
            <Card
              title={user?.role === 'customer' ? t('totalDisputedCampaigns') : t('totalDisputedOrders')}
              value={user?.role === 'customer' ? user?.totalDisputesCountCampaigns : user?.totalDisputedOrders || 0}
            />
            {user.role === 'creator' && <>
              <Card
                title={t('totalEarnings')}
                value={user?.totalEarned || 0}
              />
              <Card
                title={t('totalWithdrwan')}
                value={user?.totalWithdrawn || 0}
              />
              <Card
                title={t('available')}
                value={user?.AvailableBalance || 0}
              />
            </>}
          </div>
          <div className='flex justify-start items-start gap-5 sm:gap-4 sm:flex-col'>
            <div className='w-1/4 flex flex-col gap-3 sm:w-full'>
              <UserCard user={user} />
              <Accordion>
                {({ isOpen, toggleAccordion }) => (
                  <>
                    <AccordionHeader onClick={toggleAccordion} isOpen={isOpen}>
                      <div className='px-6 py-[10px] flex justify-between items-center w-full'>
                        <h2 className='text-sm text-themeBlack-300 font-semibold'>{t('Basic')}</h2>
                        <AccordianArrow isOpen={isOpen} />
                      </div>
                    </AccordionHeader>
                    <AccordionBody isOpen={isOpen}>
                      <div className='px-6 py-8 flex flex-col gap-2'>

                        <div className='flex justify-between items-center w-full'>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{t('email')}</p>
                          <p className='text-themeBlack-200 text-xs font-semibold lowercase'>{user.email}</p>
                        </div>
                        <div className='flex justify-between items-center w-full'>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{t('name')}</p>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{user.name}</p>
                        </div>
                        <div className='flex justify-between items-center w-full'>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{t('phone')}</p>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{user.phone}</p>
                        </div>
                        <div className='flex justify-between items-center w-full'>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{t('dob')}</p>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{formateDate(user?.dob ?? '')}</p>
                        </div>
                        {user.role === 'creator' &&
                          <>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{t('bank_name')}</p>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{user.bank}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{t('account_number')}</p>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{user.bank_account_no}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{t('freelancer_tax')}</p>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{user.freelancer_tax}</p>
                            </div>
                          </>}
                        {user.role === 'customer' &&
                          <>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{t('company_name')}</p>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{user.company_name}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{t('company_designation')}</p>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{user.company_designation}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{t('business_reg_no')}</p>
                              <p className='text-themeBlack-200 text-xs font-semibold'>{user.business_reg_no}</p>
                            </div>
                          </>}

                      </div>
                    </AccordionBody>
                  </>
                )}
              </Accordion>
              <Accordion>
                {({ isOpen, toggleAccordion }) => (
                  <>
                    <AccordionHeader onClick={toggleAccordion} isOpen={isOpen}>
                      <div className='px-6 py-[10px] flex justify-between items-center w-full'>
                        <h2 className='text-sm text-themeBlack-300 font-semibold'>{t('Info')}</h2>
                        <AccordianArrow isOpen={isOpen} />
                      </div>
                    </AccordionHeader>
                    <AccordionBody isOpen={isOpen}>
                      <div className='px-6 py-8 flex flex-col gap-2'>
                        <div className='flex justify-between items-center w-full'>
                          <p className='text-themeBlack-200 text-xs font-semibold'>{t('category')}</p>
                          <p className='text-themeBlack-200 text-xs font-semibold lowercase capitalize'>{user.category?.name}</p>
                        </div>
                      </div>
                    </AccordionBody>
                  </>
                )}
              </Accordion>
              <Accordion>
                {({ isOpen, toggleAccordion }) => (
                  <>
                    <AccordionHeader onClick={toggleAccordion} isOpen={isOpen}>
                      <div className='px-6 py-[10px] flex justify-between items-center w-full'>
                        <h2 className='text-sm text-themeBlack-300 font-semibold'>{t('Social')}</h2>
                        <AccordianArrow isOpen={isOpen} />
                      </div>
                    </AccordionHeader>
                    <AccordionBody isOpen={isOpen}>
                      <div className='px-6 py-8'>
                        {user?.socials && <div className='flex flex-col gap-2 rounded-lg justify-center'>
                          {PLATFORMS.filter(platform => user?.socials[platform.key]).map(platform => (
                            <a href={user?.socials[platform.key].account_address} target='_blank' className='cursor-pointer items-center border-[1px] border-themeGrey-70 flex gap-4 px-6 py-2 bg-white rounded-md shadow-sm hover:shadow-none hover:border-white transition-all ease-in duration-150'>
                              <img key={platform.key} src={platform.logo} alt={`${platform.title} logo`} className='w-8 h-8 object-contain' />
                              <p className='text-themeBlack-300 text-base font-medium'>{platform.title}</p>
                            </a>
                          ))}
                        </div>}
                      </div>
                    </AccordionBody>
                  </>
                )}
              </Accordion>
            </div>
            <div className='flex-1'>
              {user.role === 'creator' ? 
                <Orders userId={user?._id || ''} campaignId={''} />
              :
                <Campaigns userId={user?._id || ''}/>
              }
            </div>
          </div>
        </div>
        :
        <Loader />
      }
    </>

  )
}

export default UserDetail
