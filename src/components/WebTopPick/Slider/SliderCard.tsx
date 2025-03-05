import React, { useState } from "react";
import {  FiPlus } from "react-icons/fi";
import * as Icons from "../../../Svg/Icons";

const SliderCard: React.FC = () => {
  const [isFavourite2, setFavourite2] = useState(false);

  return (
    <div className="flex flex-col overflow-visible cursor-pointer transition-all hover:border-[#555555] duration-300 justify-between p-[6px] border-[1px] border-black-1 rounded-[10px] items-start w-full h-[144px] bg-[#252525]">
      <div className="w-full flex justify-between items-center">
        <img
          src="/trump.webp"
          alt=""
          className="w-[30px] select-none h-[30px]"
        />
        {isFavourite2 ? (
          <button onClick={() => setFavourite2(false)}>
            <Icons.FillHeart
              className="w-[30px] h-[30px]"
              fill="fill-[#ff1d1d]"
            />
          </button>
        ) : (
          <button onClick={() => setFavourite2(true)}>
            <Icons.OutlineHeart
              className="w-[30px] h-[30px]"
              stroke="stroke-[#3d3d3d]"
            />
          </button>
        )}
      </div>
      <div className="w-full flex justify-between items-center">
        <div></div>
        <p className="text-[12px] text-[#777777] font-pingfang">
          Architectural Design
        </p>
        <button className="w-[30px] h-[30px] flex justify-center items-center rounded-full border-[1px] border-[#555555]">
          <FiPlus className="text-[#555555] text-[20px]" />
        </button>
      </div>
    </div>
  );
};

export default SliderCard;
