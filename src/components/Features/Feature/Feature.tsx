import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../../shared/ComponentWrapper/ComponentWrapper";
import Node from "./Node";
import * as Icons from "../../../Svg/Icons";
import Card from "./Card";

const Feature: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ComponentWrapper styles="pt-6 mt-[80px] sm:pt-10 csm:pt-8">
      <div id="features-section" className="flex items-center justify-center md:justify-start gap-4 pb-8">
        <img 
          src="/inviting-arrow.svg" 
          alt="arrow" 
          className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
        />
        <p className="text-[24px] text-center md:text-left sm:text-[30px] md:text-[36px] lg:text-[40px] font-zen font-normal text-[#eeeeee]">
          {t('feature.title')}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4">
        {/* feature 1 */}
        <Node bgImage="url('/circular-blue.svg')" text={t('feature.node1.title')} color="text-[#00c8c8]">
          <div className="flex flex-col pb-[4rem] sm:pb-[8rem] justify-center items-center w-full">
            <p className="text-black-1 text-[50px] font-pingfang-semibold font-medium">
              {t('feature.node1.percentage')}
            </p>
            <p className="text-[20px] font-normal text-black-1 font-pingfang">
              {t('feature.node1.description')}
            </p>
          </div>
        </Node>
        {/* feature 2 */}
        <Node bgImage="url('/circular-blue.svg')" text={t('feature.node2.title')} color="text-[#00c8c8]">
          <div className="flex pb-[2rem] sm:pb-[6rem] flex-col justify-center items-center w-full">
            <div className="w-[100px] h-[100px] mb-3">
              <img src="/certificate.svg" alt="" />
            </div>
            <p className="text-[16px] text-center leading-[20px] font-thin text-black-1 font-pingfang">
              {t('feature.node2.line1')} <br />
              {t('feature.node2.line2')}
            </p>
          </div>
        </Node>
        {/* feature 3 */}
        <Node bgImage="url('/circular-orange.svg')" text={t('feature.node3.title')} color="text-[#ff9527]">
          <div className="flex pb-[4rem] sm:pb-[8rem] flex-col justify-center items-center w-full">
            <p className="text-black-1 text-[50px] font-pingfang-semibold">
              {t('feature.node3.percentage')}
            </p>
            <p className="text-[16px] text-center leading-[20px] font-thin text-black-1 font-pingfang">
              {t('feature.node3.description')}
            </p>
          </div>
        </Node>
        {/* feature 4 */}
        <Node bgImage="url('/circular-orange.svg')" text={t('feature.node4.title')} color="text-[#ff9527]">
          <div className="flex pb-[3rem] sm:pb-[8rem] flex-col justify-center items-center w-full">
            <p className="text-[14px] font-pingfang-medium text-[#555555]">
              {t('feature.node4.startingAt')}
            </p>
            <p className="text-black-1 text-[50px] font-pingfang-semibold">
              <span className="text-[30px]">{t('feature.node4.min')} </span>
              {t('feature.node4.percentage')}
            </p>
            <p className="text-[16px] text-center leading-[20px] font-thin text-black-1 font-pingfang">
              {t('feature.node4.forRepeats')}
            </p>
          </div>
        </Node>
      </div>
      {/* down section */}
      <div className="pt-12 w-full grid grid-cols-1 cmd:grid-cols-2 gap-5">
        {featuresData.map((item: any, index: number) => (
          <div
            key={index}
            className={`${featuresData.length === index+1 ? 'col-span-1 cmd:col-span-2':'col-span-1'} w-full`}
          >
            <Card
              text={t(`feature.card${index+1}.text`)}
              icon={item.icon}
              title={t(`feature.card${index+1}.title`)}
              titleColor={item.textColor}
            />
          </div>
        ))}
      </div>
    </ComponentWrapper>
  );
};

const featuresData = [
  {
    icon: <Icons.Feature1 className="w-[80px] h-[80px]" />,
    textColor: "text-[#00c8c8]",
  },
  {
    icon: <Icons.Feature2 className="w-[80px] h-[80px]" />,
    textColor: "text-[#ff9527]",
  },
  {
    icon: <Icons.Feature3 className="w-[80px] h-[80px]" />,
    textColor: "text-[#cc66ff]",
  },
  {
    icon: <Icons.Feature4 className="w-[80px] h-[80px]" />,
    textColor: "text-[#80dd00]",
  },
  {
    icon: <Icons.Feature5 className="w-[80px] h-[80px]" />,
    textColor: "text-[#ff5555]",
  },
];

export default Feature;