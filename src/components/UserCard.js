import React from 'react'
import { defaultPic } from '../utils/defaultPic';
import { IMAGE_URL } from '../constants';
import { useTranslation } from 'react-i18next';
import { formateDate } from '../utils/formateDate';

function UserCard({user}) {
  const [t] = useTranslation("global")
  return (
    <div className='p-6 flex justify-center flex-col bg-white items-center gap-2 rounded-lg shadow-sm w-full'>
          <img 
            src={`${IMAGE_URL}/uploads/${user.profilePic}`}
            className='w-28 h-28 rounded-full object-cover'
            alt='user'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultPic();
            }}
          />

          <p className='bg-themePink/40 px-2 py-0.5 text-white font-bold lowercase rounded-lg text-xs'>
              {user.nickname}
          </p>

          <div className='flex justify-between items-center w-full'>
              <p className='text-themeBlack-200 text-xs font-semibold'>{t('type')}</p>
              <p className='text-themeBlack-200 text-xs font-semibold uppercase'>{user.role}</p>
          </div>
          <div className='flex justify-between items-center w-full'>
              <p className='text-themeBlack-200 text-xs font-semibold'>{t('Level')}</p>
              <p className='text-themeBlack-200 text-xs font-semibold'>{user.level}</p>
          </div>
          <div className='flex justify-between items-center w-full'>
              <p className='text-themeBlack-200 text-xs font-semibold'>{t('CTI')}</p>
              <p className='text-themeBlack-200 text-xs font-semibold'>{user.ctiScore}</p>
          </div>
          <div className='flex justify-between items-center w-full'>
              <p className='text-themeBlack-200 text-xs font-semibold'>{t('Joinedon')}</p>
              <p className='text-themeBlack-200 text-xs font-semibold'>{formateDate(user.createdAt)}</p>
          </div>
    </div>
  )
}

export default UserCard
