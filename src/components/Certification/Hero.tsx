import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";
import * as Icons from "../../Svg/Icons";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ComponentWrapper>
      <div className="flex items-center justify-center md:justify-start gap-4 mt-10">
        <img 
          src="/inviting-arrow.svg" 
          alt={t('certification.arrowAlt')} 
          className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
        />
        <p className="text-[24px] text-center md:text-left sm:text-[30px] md:text-[36px] lg:text-[40px] font-zen font-normal text-[#eeeeee]">
          {t('certification.title')}
        </p>
      </div>
      <div className="w-full justify-center items-center py-6 sm:py-10 flex flex-col">
        <div className="w-full max-w-[600px] items-start cmd:max-w-full grid gap-6 sm:gap-10 grid-cols-1 cmd:grid-cols-[360px,1fr]">
          {/* left portion */}
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <div className="w-full h-[300px] sm:h-[400px] rounded-[23px]">
              <img src="/certificate-logo.svg" alt={t('certification.logoAlt')} />
            </div>
            <p className="text-[12px] text-center px-2 font-pingfang font-normal text-[#777777]">
              {t('certification.logoDescription')}
            </p>
          </div>
          {/* right potion  */}
          <div className="w-full flex flex-col gap-2 sm:gap-4">
            <h1 className="text-[24px] sm:text-[32px] lg:text-[30px] pl-4 sm:pl-8 leading-[40px] text-white-3 font-normal font-zen">
              {t('certification.welcome')}
              <span className="text-[30px] sm:text-[40px] lg:text-[48px]">
                <br /> {t('certification.certification')}
              </span>
            </h1>
            <div className="w-full max-w-[490px] flex items-start flex-col">
              {lists.map((ls, index) => (
                <div
                  key={index}
                  className={`w-full flex justify-start ${
                    index === 0 && "mt-0"
                  } ${
                    lists.length === index + 1 ? "mt-0" : "mt-1"
                  } items-start gap-3`}
                >
                  <Icons.Check2
                    className={`min-w-[20px] ${
                      lists.length === index + 1 ? "hidden" : "block"
                    } h-[20px]`}
                  />
                  <p
                    className={`text-[14px]
                    ${lists.length === index + 1 ? "pl-8" : "pl-0"} 
                    text-[#cccccc] font-normal font-pingfang`}
                  >
                    {t(`certification.requirement${index + 1}`)}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-4 pl-8">
              <p className="text-[16px] font-pingfang font-normal text-white-3">
                {t('certification.eligible')}
              </p>
              <button className="w-[250px] bg-btn-yellow-graident hover:bg-btn-hover-yellow-gradient active:opacity-50 transition-all duration-300 sm:w-[340px] md:w-[380px] text-[16px] rounded-[10px] font-medium text-black-1 font-pingfang h-[50px] sm:h-[60px] flex justify-center items-center">
                {t('certification.applyButton')}
              </button>
            </div>
          </div>
        </div>
        {/* down section  */}
        <div className="pt-14 sm:pt-20 cmd:max-w-full max-w-[600px] gap-6 csm:gap-10 grid-cols-1 cmd:grid-cols-[360px,1fr] grid">
          {/* left  */}
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <div className="w-full h-[300px] rounded-[23px]">
              <img src="/certification-photo.png" alt={t('certification.photoAlt')} />
            </div>
          </div>
          {/* right  */}
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-[30px] sm:text-[40px] lg:text-[44px] leading-[35px] sm:leading-[45px] font-arial-black text-cyan-1">
              {t('certification.reviewTitle')}
              <span className="text-[#007777]">
                {t('certification.reviewSubtitle')}
              </span>
            </h1>
            <p className="text-[20px] font-medium font-pingfang text-[#999999]">
              {t('certification.approvalTime')} <br />
              <span className="text-[16px]">
                {t('certification.additionalTime')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

const lists = [
  "requirement1",
  "requirement2",
  "requirement3",
  "requirement4",
  "requirement5",
  "requirement6"
];

export default Hero;
