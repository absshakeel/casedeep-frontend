import React, { useState, useEffect } from "react";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import i18next from "i18next";

// Add type for supported languages
type SupportedLanguages = 'en' | 'ja' | 'zh';

const Hero: React.FC = () => {
  // data
  const carouselImages = [1, 2, 3, 4].map((num) => ({
    en: `/carousel/carousel-${num}-en.png`,
    ja: `/carousel/carousel-${num}-ja.png`,
    zh: `/carousel/carousel-${num}-zh.png`,
  }));

  const [currentLang, setCurrentLang] = useState<SupportedLanguages>(
    (i18next.language as SupportedLanguages) || 'en'
  );

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
    <ComponentWrapper>
      <div className="w-full pt-[20px]">
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {carouselImages.map((images, index) => (
            <SwiperSlide key={index}>
              <div className="w-full flex justify-center items-center rounded-[23px] h-[290px] sm:h-[400px] md:h-[480px]">
                <img 
                  src={images[currentLang] || images.en} 
                  alt={`Carousel ${index + 1}`}
                  className="w-full h-full object-contain rounded-[23px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ComponentWrapper>
  );
};

export default Hero;
