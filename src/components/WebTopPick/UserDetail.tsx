import React, { useState, ReactNode } from "react";
import * as Icons from "../../Svg/Icons";
import frameImage from "../../assets/frame.png";
import CustomSlider from "./Slider/CustomSlider";
import CustomVideoPlayer from "./VideoPlayer";

interface Props {
  isSlideButton?: boolean;
  buttons?: string[];
  userCorporation: string;
  userRole: string;
  starValue: number;
  reviews: string;
  location: {
    icon: string;
    name: string;
  };
  tropy?: ReactNode[];
  middles?: ReactNode[];
  userNumber?: number;
}

const UserDetail: React.FC<Props> = ({
  isSlideButton = true,
  buttons = ["Interior Design"],
  userCorporation,
  userRole,
  starValue,
  reviews,
  location,
  tropy = [],
  middles = [],
  userNumber = 1,
}: Props) => {
  const [activeBtn, setActiveBtn] = useState(buttons[0]);
  const [isFavourite, setFavourite] = useState(false);
  const [showVideo, setVideo] = useState(false);

  // functions ---------------->

  const getBackgroundClass = (userNumber: number) => {
    if (userNumber >= 1 && userNumber <= 5) {
      return "bg-orange";
    } else if (userNumber >= 6 && userNumber <= 10) {
      return "bg-cyan";
    } else if (userNumber > 10 && userNumber <= 100) {
      return "bg-gray";
    }
  };

  return (
    <div className="w-full relative overflow-hidden flex flex-col justify-center items-center">
      <div className="w-full csm2:px-0 px-2 relative grid justify-center items-center grid-cols-1 csm2:grid-cols-2 lg:gap-0 gap-0 csm:gap-4 lg:grid-cols-[1.2fr,1.2fr,1.2fr] bg-[#252525] rounded-t-[10px]">
        {/* 1st col --> */}
        <div className="flex gap-1 lg:order-1 order-1 w-full justify-center csm2:justify-start pl-0 csm2:pl-2 items-center">
          {/* user image */}
          <div
            style={{ backgroundImage: `url(${frameImage})` }}
            className="min-w-[124px] min-h-[124px] relative flex justify-center items-center bg-cover bg-no-repeat"
          >
            <img
              src="/web-top-picks/trumb.png"
              className="min-w-[101px] -ml-[1px] -mt-[4px] min-h-[101px]"
              alt=""
            />
            <div className="absolute -top-1 -right-1">
              {isFavourite ? (
                <button onClick={() => setFavourite(false)}>
                  <Icons.FillHeart
                    className="w-[30px] h-[30px]"
                    fill="fill-[#ff1d1d]"
                  />
                </button>
              ) : (
                <button onClick={() => setFavourite(true)}>
                  <Icons.OutlineHeart
                    className="w-[30px] h-[30px]"
                    stroke="stroke-[#3d3d3d]"
                  />
                </button>
              )}
            </div>
          </div>
          {/* user detail  */}
          <div className="flex items-start flex-col gap-1">
            <div className="flex justify-center items-center gap-1">
              <div className="flex justify-center items-center">
                {tropy?.slice(0, 5).map((item, index) => (
                  <div
                    className={`${index === 0 ? "ml-0" : "-ml-2"}`}
                    key={index}
                  >
                    {item}
                  </div>
                ))}
                {tropy?.length > 5 && (
                  <p className="text-[#777777] text-[10px] font-pingfang">
                    {tropy.length - 5}
                  </p>
                )}
              </div>
              <div className="flex justify-center items-center">
                {middles?.slice(0, 5).map((item, index) => {
                  return (
                    <div
                      className={`${index === 0 ? "ml-0" : "-ml-2"}`}
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
                {middles?.length > 5 && (
                  <p className="text-[#777777] ml-[2px] text-[10px] font-pingfang">
                    {middles.length - 5}
                  </p>
                )}
              </div>
            </div>
            <h2 className="text-[18px] text-white-3 font-pingfang-medium">
              {userCorporation}
            </h2>

            <p className="text-[14px] text-white-3 font-pingfang">{userRole}</p>
            {/* favorite + location */}
            <div className="flex justify-start items-center gap-3">
              <div className="flex justify-center gap-[4px] items-center">
                <Icons.Star className="w-[20px] h-[20px]" />
                <p className="text-white-3 text-[18px] font-pingfang-medium">
                  {starValue}
                </p>
                <p className="text-[#777777] text-[14px] font-pingfang">
                  ({reviews})
                </p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <img src={location.icon} alt="" className="w-[18px] h-[18px]" />
                <p className="text-[12px] font-pingfang text-[#777777]">
                  {location.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd col  */}
        <div className="w-full csm:mt-0 mt-3 lg:pb-0 pb-6 lg:col-span-1 col-span-1 csm2:col-span-2 lg:order-2 order-3 flex justify-center items-center">
          <div className="w-full lg:max-w-full max-w-[500px] grid grid-cols-2 justify-center items-center gap-1">
            {buttons.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setActiveBtn(item)}
                  className={`w-full ${
                    activeBtn === item
                      ? "border-cyan-1 text-[#eeeeee] font-pingfang-semibold bg-black-1"
                      : "bg-black-1 hover:border-[#777777] hover:text-[#cccccc] font-pingfang text-[#cccccc] border-[#333333]"
                  }  rounded-[10px] transition-all duration-300 h-[30px] flex justify-center items-center border-[1px]`}
                >
                  <p className="text-[12px]">{item}</p>
                </button>
              );
            })}
          </div>
        </div>
        {/* 3rd col  */}
        <div className="w-full pt-2 lg:pt-4 pb-0 lg:pb-6 lg:order-3 order-2 pr-4 grid grid-cols-[1fr,3fr] csm:flex justify-center gap-3 xl:gap-6 items-center">
          <div className="csm:w-auto w-full flex justify-center items-center">
            <div className="w-[90px] h-[80px] csm:h-[100px] bg-black-3"></div>
          </div>
          {/* buttons */}
          <div className="grid grid-cols-2 w-full csm:flex gap-[1px] csm:gap-[2px] csm:w-[160px] flex-col">
            <button className="w-full h-[30px] hover:bg-[#3d3d3d] transition-all duration-300 rounded-tl-[10px] csm:rounded-t-[10px] bg-[#333333] text-[#cccccc] text-[16px] font-pingfang-medium flex justify-center items-center">
              Profile
            </button>
            <button className="w-full h-[30px] hover:bg-[#555555] csm:rounded-none rounded-tr-[10px] transition-all duration-300 bg-[#333333] text-[#cccccc] text-[16px] font-pingfang-medium flex justify-center items-center">
              Showcase
            </button>
            <button className="w-full h-[30px] hover:bg-[#00c8c8] csm:rounded-none rounded-bl-[10px] hover:text-black-1 transition-all duration-300 bg-[#333333] text-[#cccccc] text-[16px] font-pingfang-medium flex justify-center items-center">
              Pricing
            </button>
            <button className="w-full h-[30px] hover:bg-[#ffddaa] csm:rounded-b-[10px] rounded-br-[10px] transition-all duration-300 bg-[#ff9527] text-black-1 text-[16px] font-pingfang-medium flex justify-center items-center">
              Order Now
            </button>
          </div>
        </div>
        {/* 4rd col  */}
        {isSlideButton && (
          <div className="absolute right-0 top-[20%] csm2:top-[50%] translate-y-[-20%] csm:translate-y-[-50%] flex justify-end items-center">
            <button
              onClick={() => {
                setVideo(true);
              }}
              className="w-[14px] h-[100px] hover:bg-[#555555] active:bg-cyan-1 transition-all duration-300 rounded-l-[15px] flex justify-end items-center bg-[#333333]"
            >
              <Icons.LeftArrow
                className="w-[16px] h-[12px]"
                fill="fill-[#cccccc]"
              />
            </button>
          </div>
        )}
        {/* label ----> */}
        <div
          className={`w-[45px] ${getBackgroundClass(userNumber)} ${
            userNumber >= 10 ? "text-[#999999]" : "text-black-1"
          } flex justify-center items-center h-[45px] absolute -left-1 -top-[2px]`}
        >
          <p className="-ml-[13px] -mt-[15px] z-40 font-pingfang-semibold text-[12px]">
            {userNumber}
          </p>
        </div>
      </div>
      {/* video */}
      <div
        className={`absolute top-0 h-[47%] csm:h-[50%] csm2:h-[66%] lg:h-full block w-full csm:w-[70%] cmd:w-[50%] lg:w-[50%] right-0 z-40 transition-transform duration-700 ${
          showVideo ? "translate-x-0 videoShadow" : "translate-x-full"
        }`}
      >
        <CustomVideoPlayer closeVideo={setVideo} />
      </div>

      {/* slider  */}
      <CustomSlider />
    </div>
  );
};

export default UserDetail;
