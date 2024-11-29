import React from 'react'

function Input({
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    label,
    required = true,
    className=''
}) {
  return (
    <div className='flex flex-col gap-1 w-full'>
        <label className='text-themeBlack-200 text-sm font-semibold'>{label}</label>
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            className={`border-[1px] border-themeGrey-70 rounded-lg px-4 py-3 outline-none text-themeGrey-300 text-sm shadow-sm ${className}`}
        />
    </div>
  )
}

export default Input
