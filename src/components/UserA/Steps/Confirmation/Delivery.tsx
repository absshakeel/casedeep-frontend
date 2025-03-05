
//@ts-nocheck

import React, { useState } from "react";
import * as Icons from '../../../../Svg/Icons';
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";

const Delivery: React.FC = () => {
  const [multipleDates, setMultipleDates] = useState([
    { id: 1, date: "2023/01/25" },
    { id: 2, date: "2023/02/25" },
  ]);


  const [selectedOption, setSelectedOption] = useState<'specific' | 'multiple' | null>('specific');
  const [isSpecificDateVisible, setIsSpecificDateVisible] = useState(true);
  const [isMultipleDatesVisible, setIsMultipleDatesVisible] = useState(false);


  const handleAddDate = () => {
    const newDate = {
      id: multipleDates.length + 1,
      date: "2023/01/25",
    };
    setMultipleDates([...multipleDates, newDate]);
  };

  const [specificDate, setSpecificDate] = useState("2023-01-25");

  const handleSpecificDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificDate(e.target.value);
  };

  const handleDateChange = (id: number, newDate: string) => {
    setMultipleDates(
      multipleDates.map((date) =>
        date.id === id ? { ...date, date: newDate } : date
      )
    );
  };

  const removeData = (id) => {
    setMultipleDates(multipleDates.filter((date) => date.id !== id));
  };


  // Add new state for selection
  // const [selectedOption, setSelectedOption] = useState<'specific' | 'multiple' | null>(null);
  
  // Keep the handler
  const handleOptionClick = (option: 'specific' | 'multiple') => {
    if (selectedOption === option) {
      return;
    }
    setSelectedOption(option);
    setIsSpecificDateVisible(option === 'specific');
    setIsMultipleDatesVisible(option === 'multiple');
  };
  
  return (
    <div className="w-full flex flex-col gap-2">
      {/* specific date  */}
      <div className="w-full flex gap-[2px] flex-col">
        <button
          onClick={() => handleOptionClick('specific')}
          className={`w-full h-[60px] bg-[#222222] rounded-[8px] text-[#cccccc] text-[20px] font-pingfang flex justify-between items-center px-3 ${
            selectedOption === 'specific' ? 'border-[2px] border-cyan-1' : 'border-[2px] border-transparent'
          }`}
        >
          <span className={`select-none ${selectedOption === 'specific' ? 'text-white' : ''}`}>
            Specific date
          </span>
          {selectedOption === 'specific' && (
            <BsCheckCircleFill className="text-[21px] text-cyan-1" />
          )}
        </button>
        {isSpecificDateVisible && (
          <div className="w-full h-[40px] bg-cyan-1 rounded-[8px] px-3 flex items-center">
            <input
              type="date"
              value={specificDate}
              onChange={handleSpecificDateChange}
              className="text-black-1 text-[16px] font-pingfang font-normal bg-transparent border-none outline-none w-full"
            />
          </div>
        )}

    
      </div>
      {/* multiple dates  */}
      <div className="w-full flex flex-col gap-[2px]">
        <button
          onClick={() => handleOptionClick('multiple')}
          className={`w-full h-[60px] bg-[#222222] rounded-[8px] text-[#cccccc] text-[20px] font-pingfang flex justify-between items-center px-3 ${
            selectedOption === 'multiple' ? 'border-[2px] border-cyan-1' : 'border-[2px] border-transparent'
          }`}
        >
          <span className={`select-none ${selectedOption === 'multiple' ? 'text-white' : ''}`}>
            Multiple dates
          </span>
          {selectedOption === 'multiple' && (
            <BsCheckCircleFill className="text-[21px] text-cyan-1" />
          )}
        </button>
        {isMultipleDatesVisible &&
          multipleDates.map((item, index) => (
            <div
              key={item.id}
              className="w-full flex bg-cyan-1 justify-between items-center rounded-[10px] h-[40px] px-3"
            >
              <div className="flex items-center gap-2 flex-1">
                <p className="text-[#00a7a7] text-[14px] font-normal font-pingfang">
                  {item.id}
                </p>
                <div className="flex-1 relative">
                  <input
                    type="date"
                    value={item.date.split('/').join('-')}
                    onChange={(e) => handleDateChange(item.id, e.target.value)}
                    className="text-black-1 text-[16px] font-pingfang font-normal bg-transparent border-none outline-none w-full"
                  />
                </div>
              </div>
              <button onClick={() => removeData(item.id)} className="group ml-2">
                {index >= 2 && (
                  <Icons.CrossIcon
                    fill="fill-[#000000] group-hover:fill-[#ff1d1d]"
                    className="w-[20px] h-[20px]"
                  />
                )}
              </button>
            </div>
          ))}
        {/* Add Date button - only show when Multiple dates is selected */}
        {selectedOption === 'multiple' && (
          <button
            onClick={handleAddDate}
            className="w-full mt-1 gap-1 h-[40px] border-[1px] border-[#333333] hover:border-[#00c8c8] rounded-[8px] flex justify-start px-4 items-center group active:scale-[0.98] transition-all duration-200"
          >
            <AiOutlinePlus className="text-[21px] text-[#555555] group-hover:text-[#00c8c8] transition-colors" />
            <p className="text-[#555555] text-[12px] font-pingfang group-hover:text-[#00c8c8] transition-colors">
              Add Date
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Delivery;
