import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";
import * as Icons from "../../Svg/Icons";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ComponentWrapper styles="pt-10">
      <div className="flex items-center justify-center md:justify-start gap-4 py-[24px]">
        <img 
          src="/inviting-arrow.svg" 
          alt={t('pricing.arrowAlt')} 
          className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
        />
        <p className="text-[24px] text-center md:text-left sm:text-[30px] md:text-[36px] lg:text-[40px] font-zen font-normal text-[#eeeeee]">
          {t('pricing.title')}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-7 gap-x-3">
        {/* Plan 1 */}
        <div className="w-full h-full flex justify-center items-center">
          <div
            style={{
              backgroundImage: "linear-gradient(to bottom, #252525, #151515)",
            }}
            className="w-full h-full max-w-[390px] gap-2 flex justify-start items-center rounded-[16px] flex-col px-4 py-8 border-[1px] border-[#333333]"
          >
            <div className="w-full flex h-[170px] sm:h-[200px] flex-col justify-between items-center gap-2">
              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-[30px] font-pingfang text-[#999999]">
                  {t('pricing.plan1.title')}
                </h1>
                <p className="text-[16px] font-normal font-pingfang text-[#777777]">
                  {t('pricing.plan1.price')}
                </p>
              </div>
              <button className="w-full mt-5 max-w-[260px] flex justify-center items-center h-[55px] sm:h-[60px] hover:bg-btn-cyan-hover-gradient active:opacity-50 transition-all duration-300 bg-[#00c8c8] rounded-[10px]">
                <p className="text-black-1 text-[16px] font-pingfang font-medium">
                  {t('pricing.signUpButton')}
                </p>
              </button>
            </div>
            {/* Attributes */}
            <div className="w-full mt-3 flex items-start flex-col gap-3">
              {plan1Attributes.map((item, index) => (
                <div key={index} className="flex justify-start items-center gap-2">
                  <Icons.Check2 fill={item.checkColor} className="w-[20px] h-[20px]" />
                  <p className="text-[14px] font-normal font-pingfang text-[#999999]">
                    {t(`pricing.plan1.attribute${index + 1}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan 2 */}
        <div className="w-full h-full flex justify-center items-center">
          <div
            style={{
              backgroundImage: "linear-gradient(to bottom, #333, #202020)",
            }}
            className="w-full h-full max-w-[390px] gap-2 flex justify-center items-center rounded-[16px] flex-col px-4 py-8 border-[1px] border-[#555555]"
          >
            <div className="w-full flex flex-col justify-between h-[170px] sm:h-[200px] items-center gap-2">
              <div className="w-full flex flex-col gap-2 justify-center items-center">
                <h1 className="text-[30px] font-pingfang text-white-3">
                  {t('pricing.plan2.title')}
                </h1>
                <p className="text-[16px] text-center font-normal font-pingfang text-[#777777]">
                  {t('pricing.plan2.price')} <br />
                  <span className="text-[12px] text-[#777777]">
                    {t('pricing.annually')}
                  </span>
                </p>
              </div>
              <button className="w-full mt-5 max-w-[260px] hover:bg-btn-hover-yellow-gradient active:opacity-50 transition-all duration-300 flex justify-center items-center h-[55px] sm:h-[60px] bg-btn-yellow-graident rounded-[10px]">
                <p className="text-black-1 text-[16px] font-pingfang font-medium">
                  {t('pricing.signUpButton')}
                </p>
              </button>
            </div>
            {/* Attributes */}
            <div className="w-full mt-3 flex items-start flex-col gap-3">
              {plan2Attributes.map((item, index) => (
                <div key={index} className="flex justify-center items-start gap-2">
                  <Icons.Check2 fill={item.checkColor} className="w-[20px] h-[20px]" />
                  <div className="flex flex-col">
                    <p className={`text-[14px] font-normal font-pingfang ${item.textColor}`}>
                      {t(`pricing.plan2.attribute${index + 1}.text`)}
                    </p>
                    <p className="text-[12px] font-pingfang text-[#ff9527]">
                      {t(`pricing.plan2.attribute${index + 1}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plan 3 */}
        <div className="w-full h-full flex justify-center items-center">
          <div
            style={{
              backgroundImage: "linear-gradient(to bottom, #333, #202020)",
            }}
            className="w-full h-full max-w-[390px] gap-2 flex justify-center items-center rounded-[16px] flex-col px-4 py-8 border-[1px] border-[#555555]"
          >
            <div className="w-full flex flex-col justify-between h-[170px] sm:h-[200px] items-center gap-2">
              <div className="w-full flex flex-col gap-2 justify-center items-center">
                <h1 className="text-[30px] font-pingfang text-white-3">
                  {t('pricing.plan3.title')}
                </h1>
                <p className="text-[16px] text-center font-normal font-pingfang text-[#777777]">
                  {t('pricing.plan3.price')} <br />
                  <span className="text-[12px] text-[#777777]">
                    {t('pricing.annually')}
                  </span>
                </p>
              </div>
              <button className="w-full mt-5 max-w-[260px] hover:bg-btn-hover-yellow-gradient active:opacity-50 duration-300 transition-all flex justify-center items-center h-[55px] sm:h-[60px] bg-btn-yellow-graident rounded-[10px]">
                <p className="text-black-1 text-[16px] font-pingfang font-medium">
                  {t('pricing.signUpButton')}
                </p>
              </button>
            </div>
            {/* Attributes */}
            <div className="w-full mt-3 flex items-start flex-col gap-3">
              {plan2Attributes.map((item, index) => (
                <div key={index} className="flex justify-center items-start gap-2">
                  <Icons.Check2 fill={item.checkColor} className="w-[20px] h-[20px]" />
                  <div className="flex flex-col">
                    <p className={`text-[14px] font-normal font-pingfang ${item.textColor}`}>
                      {t(`pricing.plan3.attribute${index + 1}.text`)}
                    </p>
                    <p className="text-[12px] font-pingfang text-[#ff9527]">
                      {t(`pricing.plan3.attribute${index + 1}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

const plan1Attributes = [
  { checkColor: "#00c8c8" },
  { checkColor: "#00c8c8" },
  { checkColor: "#999999" },
  { checkColor: "#999999" },
];

const plan2Attributes = [
  { checkColor: "#00c8c8", textColor: "text-[#999999]" },
  { checkColor: "#00c8c8", textColor: "text-[#999999]" },
  { checkColor: "#ff9527", textColor: "text-[#eeeeee]" },
  { checkColor: "#ff9527", textColor: "text-[#eeeeee]" },
  { checkColor: "#ff9527", textColor: "text-[#eeeeee]" },
  { checkColor: "#ff9527", textColor: "text-[#eeeeee]" },
  { checkColor: "#ff9527", textColor: "text-[#eeeeee]" },
];

export default Hero;