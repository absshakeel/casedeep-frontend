import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SliderCard from "./SliderCard";
import * as Icons from "../../../Svg/Icons";

interface Props {
  isLoop?: boolean;
  slidePerView?: number;
  laregSliderPerView?: number;
}

type CustomButtonProps = {
  onClick: () => void;
};

const CustomPrevButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-swiper-button-prev">
    <Icons.LeftArrow
      className="w-[20px] h-[20px]"
      fill="fill-[#555555] hover:fill-cyan-1"
    />
  </button>
);

const CustomNextButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-swiper-button-next">
    <Icons.LeftArrow
      className="w-[20px] rotate-180 h-[20px]"
      fill="fill-[#555555] hover:fill-cyan-1"
    />
  </button>
);

const CustomSlider: React.FC<Props> = ({
  isLoop = false,
  slidePerView = 4,
  laregSliderPerView = 3,
}: Props) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = useCallback(() => {
    if (swiper && swiper.params && swiper.slides) {
      const slidesPerView: any = swiper.params.slidesPerView ?? 1;

      setIsBeginning(swiper.activeIndex === 0);
      setIsEnd(swiper.activeIndex >= swiper.slides.length - slidesPerView);
    }
  }, [swiper]);

  useEffect(() => {
    if (swiper) {
      swiper.on("slideChange", updateNavigation);
      swiper.on("resize", updateNavigation);

      updateNavigation();

      return () => {
        swiper.off("slideChange", updateNavigation);
        swiper.off("resize", updateNavigation);
      };
    }
  }, [swiper, updateNavigation]);

  const handleSwiperInit = (swiperInstance: SwiperType) => {
    setSwiper(swiperInstance);
    updateNavigation();
  };

  return (
    <div className="w-full  -mt-2 flex justify-center items-center relative">
      <Swiper
        cssMode={true}
        navigation={false}
        slidesPerView={4}
        pagination={false}
        mousewheel={true}
        loop={isLoop}
        breakpoints={{
          350: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: laregSliderPerView,
          },
          1024: {
            slidesPerView: slidePerView,
          },
        }}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        onSwiper={handleSwiperInit}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex z-10 hover:z-50 justify-center items-center"
          >
            <SliderCard />
          </SwiperSlide>
        ))}
      </Swiper>

      {isLoop || !isBeginning ? (
        <CustomPrevButton onClick={() => swiper?.slidePrev()} />
      ) : null}

      {!isLoop && !isEnd && swiper && (
        <CustomNextButton onClick={() => swiper.slideNext()} />
      )}
    </div>
  );
};

export default CustomSlider;
