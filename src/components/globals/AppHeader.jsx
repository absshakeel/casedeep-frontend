import React, { useState } from "react";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";
import * as Icons from "../../Svg/Icons";
import { HiOutlinePlus } from "react-icons/hi";

const AppHeader = () => {
 
  const [activeBtn, setActiveBtn] = useState("Interior Design");
  const [selectedBtn, setBtn] = useState("Order Now");

  return (
    <div className="w-full sticky z-50 -top-[1.5rem] cmd:block hidden bg-cover bg-top bg-hero-gradient">
      <ComponentWrapper>
        <div className="w-full pt-5 csm2:pt-10 grid grid-cols-[1.5fr,1fr] csm:grid-cols-2 cmd:grid-cols-3 gap-2 csm:gap-4">
          {/* 1st col  */}
          <div className="w-full order-1 flex justify-center items-center gap-2 csm2:gap-4">
            <div className="relative">
              <img
                src='/trumb4.webp'
                className="min-w-[60px] csm:min-w-[80px] csm2:min-w-[100px] rounded-full min-h-[60px] csm:min-h-[80px] csm2:min-h-[100px]"
                alt=""
              />

              <Icons.OutlineHeart
                className="w-[30px] h-[30px] cursor-pointer absolute -top-2 -right-3"
                stroke="stroke-[#3d3d3d]"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[18px] text-cyan-1 font-pingfang-medium">
                Donald Trump|
              </h2>
              <p className="text-[14px] text-[#eeeeee] font-pingfang">
                Political Speaker
              </p>
              {/* favorite + location */}
              <div className="flex flex-wrap justify-start items-center gap-y-1 gap-x-3">
                <div className="flex justify-center gap-[4px] items-center">
                  <Icons.Star className="w-[20px] h-[20px]" />
                  <p className="text-white-3 text-[18px] font-pingfang-medium">
                    8.2
                  </p>
                  <p className="text-[#777777] text-[14px] font-pingfang">
                    (299)
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <img src="/usa.png" alt="" className="w-[18px] h-[18px]" />
                  <p className="text-[12px] font-pingfang text-[#777777]">
                    New York
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd col  */}
          <div className="w-full cmd:col-span-1 col-span-3 order-3 cmd:order-2 grid grid-cols-2 gap-1">
            {buttons.map((item, index) => {
              return (
                <button
                  key={index}
                  // onClick={() => setActiveBtn(item)}
                  className={`w-full ${
                    activeBtn === item
                      ? "bg-cyan-1 text-black-1 font-pingfang-semibold font-semibold border-cyan-1"
                      : "bg-black-1 active:text-[#00c8c8] active:border-[#00c8c8] hover:bg-[#151515] hover:border-[#777777] hover:text-[#cccccc] font-pingfang text-[#cccccc] border-[#333333]"
                  } rounded-[10px] transition-all duration-300 h-[30px] flex justify-center items-center border-[1px]`}
                >
                  <p className="text-[12px]">{item}</p>
                </button>
              );
            })}
          </div>
          {/* 3rd col  */}
          <div className="w-full order-2 cmd:order-3 flex justify-end csm2:justify-center items-center gap-2">
            <div className="w-[90px] csm2:block hidden h-[100px] bg-black-3"></div>
            <div className="w-[90px] h-[100px] csm2:block hidden bg-black-3"></div>
            <div className="flex flex-col justify-center items-center gap-2">
              <button className="active:opacity-50 duration-300">
                <Icons.PlayStore className="w-[100px] csm:w-[134px] h-[30px] csm:h-[40px]" />
              </button>
              <button className="active:opacity-50 duration-300">
                <Icons.GooglePlay className="w-[100px] csm:w-[134px] h-[30px] csm:h-[40px]" />
              </button>
            </div>
          </div>
        </div>
        {/* navigations -------> */}
        
      </ComponentWrapper>
    </div>
  );
};

const buttons = [
  "Electrical Work",
  "Flooring and Tiling",
  "Interior Design",
  "Plumbing",
  "Window Treatments",
  "More Types...",
];

const navigationButtons = ["Profile", "Showcase", "Pricing", "Order Now"];

export default AppHeader;
