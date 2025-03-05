import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";

const Invite: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <ComponentWrapper styles="py-8 mt-[80px] csm:py-8">
      <div className="w-full flex justify-center items-center">
        <div className="w-full cmd:max-w-full max-w-[700px] grid gap-8 sm:gap-6 grid-cols-1 cmd:grid-cols-[1fr,360px]">
          <div className="w-full flex justify-center items-center csm:items-start flex-col gap-4">
            <h1 className="text-[24px] sm:text-[30px] text-center md:text-left lg:text-[36px] font-arial-semibold leading-[35px] sm:leading-[45px] text-cyan-1">
              {t('invite.title1')} <br /> {t('invite.title2')}
              <span className="text-orange-1">{t('invite.title3')}</span>
            </h1>
            <p className="text-[16px] md:text-left text-center text-[#999999] font-pingfang">
              {t('invite.description1')}
            </p>
            <p className="text-[16px] md:text-left text-center text-[#999999] font-pingfang">
              {t('invite.description2')}
            </p>
            <button
              className="w-[250px] bg-[#00c8c8] hover:bg-btn-cyan-hover-gradient active:opacity-50 transition-all duration-300 sm:w-[300px] md:w-[380px] text-[18px] sm:text-[20px] rounded-[10px] font-normal text-black-1 font-pingfang h-[45px] sm:h-[50px] md:h-[55px] flex justify-center items-center"
            >
              {t('invite.buttonText')}
            </button>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-[300px] sm:w-[300px] h-[30px] sm:h-[300px] rounded-full">
              <img src="/invite-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default Invite;
