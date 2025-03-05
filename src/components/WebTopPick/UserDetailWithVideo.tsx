import React, { useState } from "react";
import frameImage from "../../assets/frame.png";
import { GoHeartFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import * as Icons from "../../Svg/Icons";
import CustomSlider from "./Slider/CustomSlider";
import CustomVideoPlayer from "./VideoPlayer";

interface Props {
  closeSec: (x: boolean) => void;
}

const UserDetailWithVideo: React.FC<Props> = ({ closeSec }: Props) => {
  const [isFavourite, setFavourite] = useState(false);

  return (
    <div className="w-full relative flex flex-col justify-center items-center">
      <div className="w-full h-[290px] relative grid justify-center items-start grid-cols-2 lg:gap-0 gap-4 bg-[#252525] rounded-[10px]">
        {/* ist col  */}
        <div className="w-full h-full justify-between flex flex-col">
          <div className="w-full px-2 flex justify-between items-center">
            <div className="flex pt-3 gap-1 justify-center items-center">
              {/* user image */}
              <div
                style={{ backgroundImage: `url(${frameImage})` }}
                className="min-w-[124px] min-h-[124px] relative flex justify-center items-center bg-cover bg-no-repeat"
              >
                <img
                  src="/web-top-picks/trumb.png"
                  className="min-w-[100px] min-h-[100px]"
                  alt=""
                />
                <div className="absolute top-0 right-0">
                  {isFavourite ? (
                    <GoHeartFill
                      onClick={() => setFavourite(false)}
                      className="text-[20px] text-[#ff1d1d] cursor-pointer"
                    />
                  ) : (
                    <FiHeart
                      onClick={() => setFavourite(true)}
                      className="text-[20px] cursor-pointer text-[#3d3d3d]"
                    />
                  )}
                </div>
              </div>
              {/* user detail  */}
              <div className="flex flex-col gap-1">
                <h2 className="text-[18px] text-white-3 font-pingfang-medium">
                  智慧世界股份有限公司
                </h2>

                <p className="text-[14px] text-white-3/80 font-pingfang">
                  黃再旭
                </p>
                {/* favorite + location */}
                <div className="flex justify-start items-center gap-3">
                  <div className="flex justify-center gap-[4px] items-center">
                    <Icons.Star className="w-[20px] h-[20px]" fill="#FF9527" />
                    <p className="text-white-3 text-[18px] font-pingfang-medium">
                      8.2
                    </p>
                    <p className="text-[#777777] text-[14px] font-pingfang">
                      (567)
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <img src="/usa.png" alt="" className="w-[18px] h-[18px]" />
                    <p className="text-[12px] font-pingfang text-[#777777]">
                      New York
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              className={`w-[160px]
                bg-black-1 h-[60px] hover:border-[#777777] hover:text-[#cccccc] font-pingfang text-[#cccccc] border-[#333333]
                rounded-[10px] transition-all duration-300 flex justify-center items-center border-[1px]`}
            >
              <p className="text-[12px]">Interior Design</p>
            </button>
          </div>
          {/* slider  */}
          <CustomSlider laregSliderPerView={2} isLoop={true} slidePerView={2} />
        </div>
        {/* label ----> */}
        <div
          className={`w-[45px] bg-red-rectangle flex justify-center items-center h-[45px] absolute -left-1 -top-[2px]`}
        ></div>
        {/* video ------->  */}
        <div className="w-full !rounded-[10px] h-full overflow-hidden videoShadow z-40">
          <CustomVideoPlayer closeVideo={closeSec} />
        </div>
      </div>
    </div>
  );
};

export default UserDetailWithVideo;
