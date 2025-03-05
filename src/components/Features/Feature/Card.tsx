import React,{ReactNode} from "react";

interface Props {
    icon:ReactNode,
    text:string,
    title:string,
    titleColor:string
}

const Card: React.FC<Props> = ({icon,text,title,titleColor}:Props) => {
  return (
    <div className="w-full relative flex flex-col p-4 sm:p-5 bg-[#111111] border-[1px] border-[#333333] rounded-[23px]">
      <p className={`text-[21px] ${titleColor} font-pingfang-medium`}>
        {title}
      </p>
      <p className="text-[16px] mb-14 md:pb-4 font-pingfang text-[#999999]">
        {text}
      </p>
      <div className="absolute bottom-0 right-0">
        {icon}
      </div>
    </div>
  );
};

export default Card;
