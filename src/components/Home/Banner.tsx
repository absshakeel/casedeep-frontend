import React, { useState, useEffect } from "react";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";
import i18next from "i18next";

type SupportedLanguages = 'en' | 'ja' | 'zh';

const Banner: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguages>(
    (i18next.language as SupportedLanguages) || 'en'
  );

  const bannerImages = {
    en: '/banner/banner-local-en.png',
    ja: '/banner/banner-local-ja.png',
    zh: '/banner/banner-local-zh.png'
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
    <ComponentWrapper styles="pt-8">
      <div className="">
        <img 
          src={bannerImages[currentLang] || bannerImages.en} 
          alt="Banner"
          className="w-full h-full object-contain rounded-[23px]"
        />
      </div>
    </ComponentWrapper>
  );
};

export default Banner;
