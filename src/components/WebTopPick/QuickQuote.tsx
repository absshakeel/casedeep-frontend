import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const QuickQuote: React.FC = () => {
  const [hideBtn, setHide] = useState(false);

  return (
    <button
      className={`${
        hideBtn ? "hidden" : "flex"
      } fixed bottom-[4.7rem] csm:bottom-[7.5rem] z-50 right-1 csm:right-4 justify-center items-center flex-col`}
    >
      <RxCross2
        onClick={() => setHide(true)}
        className="text-[14px] ml-14 cursor-pointer text-[#777777]"
      />
      <div className="relative">
        <img src="/quickQuote.svg" className="w-[50px] csm:w-[80px] h-[50px] csm:h-[80px]" alt="" />
        <p className="text-[10px] csm:text-[14px] font-normal text-black-1 leading-[10px] csm:leading-[16px] left-[50%] -translate-x-1/2 bottom-1 font-pingfang-medium absolute">
          Quick <br /> Quote
        </p>
      </div>
    </button>
  );
};

export default QuickQuote;
