import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../../shared/ComponentWrapper/ComponentWrapper";
import * as Icons from "../../../Svg/Icons";
import Node from "./Node";
import { AiOutlinePlus } from "react-icons/ai";

const GrowWithUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ComponentWrapper styles="pt-6 csm:pt-20 pb-[6rem] csm:pb-[6rem] md:pb-[12rem]">
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-[40px] font-zen font-normal text-cyan-1">
          {t('growWithUs.title1')} <span className="text-orange-1">{t('growWithUs.title2')}</span>
        </h2>
        <p className="text-[14px] font-normal text-center text-black-3 font-pingfang">
          {t('growWithUs.description1')} <br /> {t('growWithUs.description2')}
        </p>
        <button className="w-[40px] csm:w-[50px] h-[40px] csm:h-[50px] mt-4 flex justify-center items-center rounded-full border-[1px] border-black-3">
          <AiOutlinePlus className="text-[#777777] text-[24px] sm:text-[30px]" />
        </button>
        <div className="w-full relative gap-4 flex justify-center items-center">
          <div className="hidden csm:flex justify-center items-center flex-col">
            <Icons.CyanCircle
              className="w-[70px] lg:w-[100px] h-[70px] lg:h-[100px]"
              fill="#00C8C8"
            />
            <Icons.CyanCircle
              className="w-[50px] lg:w-[80px] -mt-6 lg:-mt-9 opacity-50 h-[50px] lg:h-[80px]"
              fill="#00C8C8"
            />
          </div>
          {/* centered image ----> */}
          <div className="w-[160px] csm:w-[220px] md:w-[280px] lg:w-[320px] xl:w-[360px] mt-10 md:mt-16 h-[160px] csm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px]  rounded-full overflow-hidden flex items-center justify-center">
            <img 
              src="/cert-members.png" 
              alt={t('growWithUs.membersAlt')} 
              className="w-[150%] h-[150%] object-cover"
            />
          </div>
          <div className="hidden csm:flex justify-center items-center flex-col">
            <Icons.CyanCircle
              className="w-[50px] lg:w-[80px] -mb-6 lg:-mb-9 opacity-50 h-[50px] lg:h-[80px]"
              fill="#FF9527"
            />
            <Icons.CyanCircle
              className="w-[70px] lg:w-[100px] h-[70px] lg:h-[100px]"
              fill="#FF9527"
            />
          </div>
          {/* nodes  -----> */}
          {Array.from({ length: 11 }).map((_, index) => (
            <Node
              key={index}
              textColor={`text-[${getNodeColor(index)}]`}
              position={getNodePosition(index)}
              text={t('growWithUs.industry')}
            />
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
};

const getNodeColor = (index: number) => {
  const colors = [
    "#76d5ff", "#ff855d", "#c8b600", "#00c8c8", "#8592ff",
    "#ff6eef", "#ff855d", "#c8b600", "#2ad800", "#ff6eef", "#00c8c8"
  ];
  return colors[index % colors.length];
};

const getNodePosition = (index: number) => {
  const positions = [
    "lg:-bottom-[45%] -bottom-[38%] md:-bottom-[54%]",
    "-bottom-[21%] md:-bottom-[30%] right-[21%]",
    "top-[55%] md:top-[50%] lg:top-[50%] right-[8%] md:right-[6%] lg:right-[8%]",
    "top-[12%] md:top-[0%] right-[2%] lg:right-[6%]",
    "-top-[28%] md:-top-[45%] right-[7%] md:right-[10%] lg:right-[12%]",
    "-bottom-[21%] md:-bottom-[30%] lg:-bottom-[28%] left-[21%] lg:left-[24%]",
    "top-[55%] md:top-[50%] left-[6%] lg:left-[8%]",
    "top-[12%] md:top-[0%] left-[6%]",
    "-top-[12%] left-[26%] md:left-[24%]",
    "-top-[12%] right-[26%] md:right-[24%]",
    "-top-[28%] md:-top-[45%] left-[10%] lg:left-[12%]"
  ];
  return positions[index % positions.length];
};

export default GrowWithUs;
