import React from 'react'

function Card({
  title,
  classes,
  value
}) {
  return (
    <div className={`flex flex-col bg-white rounded-lg w-full ${classes}`}>
        <h2 className='py-[10px] px-5 text-themeBlack-300 text-base font-bold'>{title}</h2>
        <hr className='h-0.5 border-t-[0px] border-b-[1px] border-themeGrey-70 w-full'/>
        <h2 className='p-6 text-themeBlack-300 text-base font-bold text-[28px]'>{value}</h2>
    </div>
  )
}

export default Card
