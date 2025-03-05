import React from "react";
import * as Icons from "../../../Svg/Icons";

interface Props {
  event: any;
  text?:string;
}

const CreatePayement: React.FC<Props> = ({ event,text='Create Payment' }: Props) => {
  return (
    <button
      onClick={event}
      className="w-full min-h-[180px] max-w-[250px] mx-auto h-full flex-col border-[1px] border-black-1 hover:bg-[#222222] active:bg-[#1d1d1d] transition-all duration-300 bg-[#1d1d1d] rounded-[32px] flex justify-center items-center gap-3"
    >
      <Icons.Add className="w-[50px] h-[50px]"
      fill="fill-[#555555]"
      stroke="stroke-[#555555]"
       />
      <p className="text-[12px] text-[#777777] font-pingfang">{text}</p>
    </button>
  );
};

export default CreatePayement;
