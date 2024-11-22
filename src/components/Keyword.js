import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RxCross1 } from 'react-icons/rx';

function Keyword({
    value = [],
    onChange = () => { },
    placeholder = "",
    name = "",
    readOnly = false,
    label = ""
}) {
    const [keywords, setKeywords] = useState(value ? value : []);
    const [inputValue, setInputValue] = useState('');
    const [t] = useTranslation("global");

    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
            if (!keywords.includes(inputValue.trim())) {
                setKeywords([...keywords, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const handleBlur = () => {
        if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
            if (!keywords.includes(inputValue.trim())) {
                setKeywords([...keywords, inputValue.trim()]);
                setInputValue('');
            }
        }
    };

    const removeKeyword = (index) => {
        setKeywords(keywords.filter((tag, i) => i !== index));
    };

    useEffect(() => {
        onChange({
            target: {
                name,
                value: keywords
            }
        })
    }, [keywords])
    return (
        <div className='flex flex-col gap-1 w-full'>
            <label className='text-themeBlack-200 text-sm font-semibold'>{label}</label>
            <div className='flex gap-2 items-end flex-wrap w-full'>
                {keywords.map((keyword, index) => (
                    <div
                        key={index}
                        className="relative w-[49%] flex flex-col justify-end gap-1 sm:w-full"
                    >
                        {!readOnly && <p onClick={() => removeKeyword(index)} className='absolute top-4 cursor-pointer hover:text-themeBlack-300 right-2 text-themeGrey-50'>{<RxCross1 /> }</p>}
                        <input
                            type='text'
                            value={keyword}
                            readOnly={true}
                            className='border-[1px] border-themeGrey-70 rounded-lg px-4 py-3 outline-none text-themeGrey-300 text-sm shadow-sm'
                        />
                    </div>
                ))}
                {!readOnly &&
                    <input
                        type='text'
                        value={inputValue}
                        placeholder={placeholder}
                        readOnly={false}
                        onBlur={handleBlur}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='border-[1px] w-full border-themeGrey-70 rounded-lg px-4 py-3 outline-none text-themeGrey-300 text-sm shadow-sm'
                    />}
            </div>
        </div>
    )
}

export default Keyword
