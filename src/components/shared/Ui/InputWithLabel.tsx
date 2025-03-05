import React from "react";

interface Props {
  label: string;
  placeholder: string;
  type?: string;
}

const InputWithLabel: React.FC<Props> = ({
  label,
  type = "text",
  placeholder,
}: Props) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor="" className="text-[#777777] text-[14px] font-pingfang">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full font-pingfang focus:outline-none bg-transparent text-[#cccccc] text-[16px]"
      />
    </div>
  );
};

export default InputWithLabel;
