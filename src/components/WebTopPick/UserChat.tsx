import React from "react";
import chatIcon from "../../assets/chatIcon.png";

interface Props {
  userImage?: string;
  notificationValue?: string;
}

const UserChat: React.FC<Props> = ({
  userImage,
  notificationValue = "22",
}: Props) => {
  return (
    <div className="fixed z-50 cursor-pointer bottom-2 csm:bottom-4 right-2 csm:right-0">
      <div
        style={{ backgroundImage: `url(${chatIcon})` }}
        className="w-[65px] csm:w-[110px] flex justify-center items-center bg-center bg-no-repeat bg-cover h-[65px] csm:h-[98px]"
      >
        <img
          src="/trumb3.webp"
          className="w-[57px] csm:w-[98px] h-[57px] csm:h-[98px] mt-[4px] ml-[2px] csm:ml-[4px]"
          alt=""
        />
        {/* notification */}
        {notificationValue !== "" && (
          <div className="text-[10px] leading-0 csm2:text-[12px] font-pingfang-medium flex justify-center items-center text-white-1 bg-[red] min-w-[16px] csm2:min-w-[20px] min-h-[16px] csm2:min-h-[20px] absolute top-1 right-2 csm2:right-4 rounded-full">
            {notificationValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;
