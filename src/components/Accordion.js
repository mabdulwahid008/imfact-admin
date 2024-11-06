import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";


export const Accordion = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg ">
      {children({ isOpen, toggleAccordion })}
    </div>
  );
};

export const AccordionHeader = ({children, onClick, isOpen }) => {
  return (
    <div className="flex cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const AccordionBody = ({ children, isOpen }) => {
  return (
    <div
      className={` transition-[max-height] duration-300 ease-in-out overflow-hidden  ${ 
        isOpen ? "max-h-screen border-t-[1px] border-themeGrey-70" : "max-h-0"
      }`}
    >
      {children}
    </div>
  );
};

export const AccordianArrow = ({ isOpen }) => {
    return <MdKeyboardArrowDown className={`text-themeBlack-300 transition-all ease-in-out duration-300 ${isOpen? 'rotate-180' : ''}`} />
}