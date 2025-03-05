import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ComponentWrapper styles="pt-[30px]">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-[24px] sm:text-[30px] text-center md:text-[40px] lg:text-[50px] text-cyan-1 font-zen font-normal">
          {t('welcome.title')}
        </h1>
        <p className="text-[12px] sm:text-[18px] text-center lg:text-[20px] text-cyan-1 font-normal font-zen">
          {t('welcome.subtitle')}
        </p>
        <div className="w-full md:max-w-full max-w-[500px] mt-5 grid gap-4 grid-cols-1 md:grid-cols-[360px,1fr] justify-center items-center">
          <div className="w-full h-[300px] rounded-[24px]">
            <img src="/group-photo.png" alt="" />
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-[14px] md:text-left text-center lg:text-[16px] text-[#999999] font-pingfang">
              {t('welcome.description1')}
            </p>
            <p className="text-[14px] md:text-left text-center lg:text-[16px] text-[#999999] font-pingfang">
              {t('welcome.description2')}
            </p>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default Welcome;
