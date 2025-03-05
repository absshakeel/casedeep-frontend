import React from "react";
import { useTranslation } from "react-i18next";
import * as Icons from "../../../Svg/Icons";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";

const CallToAction: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ComponentWrapper styles="pt-[40px] sm:pt-[50px] csm:pt-[100px]">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[1100px] gap-1 sm:gap-3 flex justify-center md:justify-between items-center">
          <Icons.Search className="w-[78px] md:block hidden h-[78px]" />
          <div className="flex justify-center items-center gap-3 sm:gap-5">
            <img
              src="/logo/logo-icon.svg"
              className="w-[144px] h-[156px]"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <p className="text-[20px] sm:text-[26px] lg:text-[30px] font-zen font-normal text-white-3">
                {t('callToAction.title1')} <br />
                {t('callToAction.title2')}
              </p>
              <button
                className="w-[180px] bg-btn-yellow-graident active:opacity-50 hover:bg-btn-hover-yellow-gradient transition-all duration-300 sm:w-[260px] md:w-[380px] text-[16px] sm:text-[20px] rounded-[10px] font-normal text-black-1 font-pingfang h-[40px] sm:h-[55px] flex justify-center items-center"
              >
                {t('callToAction.buttonText')}
              </button>
            </div>
          </div>
          <Icons.Baloons className="w-[78px] md:block hidden h-[78px]" />
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CallToAction;
