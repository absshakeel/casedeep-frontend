import React,{ReactNode} from "react";

interface Props {
  textColor: string;
  position: string;
  text:string
}

const Node: React.FC<Props> = ({ textColor, position,text }: Props) => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #333, #202020)",
      }}
      className={`w-[60px] csm:w-[90px] md:w-[120px] cmd:w-[140px] lg:w-[160px] absolute ${position} h-[60px] csm:h-[90px] md:h-[120px] cmd:h-[140px] lg:h-[160px] border-[1px] border-[#555] rounded-full flex justify-center items-center`}
    >
      <p className={`${textColor} max-w-[100px] w-full text-center text-[10px] csm:text-[14px] md:text-[16px] cmd:text-[20px] font-normal`}>
        {text}
      </p>
    </div>
  );
};

export default Node;
