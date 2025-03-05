import React from "react";

interface Props {
    label: string;
    placeholder: string;
  }
  

const TextAreaWithLabel: React.FC<Props> = ({label,placeholder}:Props) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor="" className="text-[#777777] text-[14px] font-pingfang">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        name=""
        id=""
        className="w-full resize-none font-pingfang focus:outline-none bg-transparent text-[#cccccc] text-[16px]"
      ></textarea>
    </div>
  );
};

export default TextAreaWithLabel;
