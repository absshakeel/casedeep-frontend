import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";
import * as Icons from "../../Svg/Icons";
import i18next from "i18next";

type SupportedLanguages = 'en' | 'ja' | 'zh';

const Attributes: React.FC = () => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState<SupportedLanguages>(
    (i18next.language as SupportedLanguages) || 'en'
  );

  const usingImages = {
    en: '/textimg/img-using-en.png',
    ja: '/textimg/img-using-ja.png',
    zh: '/textimg/img-using-zh.png'
  };

  useEffect(() => {
    const updateLang = () => {
      setCurrentLang((i18next.language as SupportedLanguages) || 'en');
    };

    i18next.on("languageChanged", updateLang);
    return () => {
      i18next.off("languageChanged", updateLang);
    };
  }, []);

  return (
    <ComponentWrapper styles="pt-[50px] csm:pt-[80px]">
      <div className="w-full grid justify-center items-center grid-cols-1 csm:grid-cols-[230px,1fr] md:grid-cols-[300px,1fr] lg:grid-cols-[360px,1fr]">
        <div className="w-full flex justify-center items-center">
          <Icons.Check className="w-[230px] md:w-[300px] lg:w-[360px] h-[180px] csm:h-[300px]" />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="text-[16px] text-center md:text-left text-[#999999] font-pingfang">
            {t('attributes.description')}
          </p>
          <div className="w-full h-[100px]">
            <img 
              src={usingImages[currentLang] || usingImages.en} 
              alt={t('attributes.usingImageAlt')}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default Attributes;