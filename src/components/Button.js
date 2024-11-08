import React from 'react'

function Button({
    disabled,
    onClick,
    text,
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className='outline-none w-full border-[1px] transition-all ease-in-out mt-2 duration-200 font-semibold rounded-lg border-themeNavyBlue px-4 py-2 disabled:opacity-75 disabled:cursor-wait text-themeNavyBlue hover:bg-themeNavyBlue hover:text-white'>
            {text}
        </button>
    )
}

export default Button
