// @ts-ignore

import React, { useState } from "react";
import * as Icons from "../../../../Svg/Icons";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setRating } from '../../../../store/slices/userSlice';

interface Props {
  type1: string;
  type2: string;
  type3: string;
}

const RatingCom: React.FC<Props> = ({ type1, type2, type3 }: Props) => {
  const [badgeRating, setBadgeRating] = useState([
    {
      isValid: true,
      isSelect: true,
    },
    {
      isValid: true,
      isSelect: false,
    },
    {
      isValid: false,
      isSelect: false,
    },
    {
      isValid: false,
      isSelect: false,
    },
  ]);
  const dispatch = useDispatch();

  const handleSetBadge = (index: number) => {
    setBadgeRating((prev) => {
      const blocks = [...prev];
      blocks[index].isSelect = !blocks[index].isSelect;
      return blocks;
    });
  };

  const handleBackClick = () => {
    dispatch(setRating(null));
  };

  return (
    <div className="w-full mx-auto lg:m-0 col-span-2 pl-0 lg:pl-3 max-w-[440px] flex flex-col">
      {/* header for small screen  */}
      <div className="w-full cmd:hidden pb-3 pt-2 flex justify-between items-center">
        <button
          onClick={handleBackClick}
          className="flex justify-center items-center gap-2"
        >
          <IoIosArrowBack className="text-[#555555] text-[24px]" />
          <p className="text-[#555555] text-[18px] font-pingfang">Rating</p>
        </button>

        <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
      </div>
      {/*  */}
      <div className="w-full bg-[#222222] flex justify-between items-center px-3 py-2 csm:py-3 rounded-[8px]">
        <div className="flex justify-center items-center gap-2">
          <FaStar className="text-[26px] text-[#555555]" />
          <p className="text-[16px] font-pingfang text-[#eeeeee]">All Rating</p>
        </div>
        <Rating
          emptySymbol={
            <FaStar className="text-[28px] csm:text-[32px] text-[#555555]" />
          }
          fullSymbol={
            <FaStar className="text-[28px] csm:text-[32px] text-[#fff200]" />
          }
          fractions={2}
          onChange={(value: number) => dispatch(setRating(value))}
        />
      </div>
      {/*  */}
      <div className="w-full mt-2 csm:mt-4 flex flex-col">
        <div className="w-full bg-[#333333] flex justify-between items-center px-3 py-2 csm:py-3 rounded-t-[8px]">
          <div className="flex justify-center items-center gap-2">
            <FaStar className="text-[#fff200] text-[26px]" />
            <p className="text-[14px] font-pingfang text-[#aaaaaa]">{type1}</p>
          </div>
          <Rating
            emptySymbol={
              <FaStar className="text-[28px] csm:text-[32px] text-[#555555]" />
            }
            fullSymbol={
              <FaStar className="text-[28px] csm:text-[32px] text-[#fff200]" />
            }
            fractions={2}
            initialRating={3.5}
          />
        </div>
        <div className="w-full bg-[#333333] flex justify-between items-center px-3 py-2 csm:py-3">
          <div className="flex justify-center items-center gap-2">
            <FaStar className="text-[#fff200] text-[26px]" />
            <p className="text-[14px] font-pingfang text-[#aaaaaa]">{type2}</p>
          </div>
          <Rating
            emptySymbol={
              <FaStar className="text-[28px] csm:text-[32px] text-[#555555]" />
            }
            fullSymbol={
              <FaStar className="text-[28px] csm:text-[32px] text-[#fff200]" />
            }
            fractions={2}
            initialRating={3}
          />
        </div>
        <div className="w-full rounded-b-[8px] bg-[#333333] flex justify-between items-center px-3 py-2 csm:py-3">
          <div className="flex justify-center items-center gap-2">
            <FaStar className="text-[#555555] text-[26px]" />
            <p className="text-[14px] font-pingfang text-[#aaaaaa]">{type3}</p>
          </div>
          <Rating
            emptySymbol={
              <FaStar className="text-[28px] csm:text-[32px] text-[#555555]" />
            }
            fullSymbol={
              <FaStar className="text-[28px] csm:text-[32px] text-[#fff200]" />
            }
            fractions={2}
          />
        </div>
      </div>
      {/* Badges ----->  */}
      <div className="w-full mt-4 sm:mt-6 grid grid-cols-4 gap-2 sm:gap-4">
        {badgeRating.map((item, index) => {
          return (
            <button
              key={index}
              disabled={!item.isValid}
              onClick={() => handleSetBadge(index)}
              className={`w-full ${
                item.isValid
                  ? " hover:border-[#00bb55] "
                  : "hover:border-transparent "
              } 
              ${item.isSelect ? "border-[#00bb55]" : "border-transparent"}
              border-[2px]  relative rounded-[20px] bg-[#222222] flex justify-center items-center min-h-[90px]`}
            >
              <Icons.Middle2
                className={`${item.isValid ? "opacity-100" : " opacity-20"}`}
              />
              {item.isSelect && (
                <div className="absolute z-40 inset-0 flex justify-center items-center">
                  <FaCheck className="text-[42px] text-[#00bb55]" />
                </div>
              )}
              {item.isSelect && (
                <div className="absolute inset-0 bg-black-1/80 z-30 rounded-[20px]"></div>
              )}
            </button>
          );
        })}
      </div>
      {/*  */}
      <div className="w-full bg-[#222222] mt-3 sm:mt-4 py-2 flex justify-center items-center rounded-[20px]">
        <Icons.Tropy2 />
      </div>
    </div>
  );
};

export default RatingCom;
