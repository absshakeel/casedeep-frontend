import React from "react";
import Navibar from "../components/WebTopPick/Layout/Navibar";
import ComponentWrapper from "../components/shared/ComponentWrapper/ComponentWrapper";
import QuickQuote from "../components/WebTopPick/QuickQuote";
import UserChat from "../components/WebTopPick/UserChat";
import UserDetail from "../components/WebTopPick/UserDetail";
import * as Icons from "../Svg/Icons";

const WebTopPick = () => {
  return (
    <React.Fragment>
      <Navibar />
      <ComponentWrapper>
        <div className="w-full pb-4 overflow-hidden relative justify-center items-center flex mt-3 flex-col">
          <div className="w-full rounded-[10px] relative csm2:max-w-full max-w-[550px] flex-col gap-4 flex justify-center items-center">
            {/* top section ----------->  */}
            {/* user-detail 1 */}
            <div className="w-full">
              <UserDetail
                userCorporation="America Wisdom World Corporation Corporati.."
                userRole="Architectural Designer"
                starValue={8.2}
                userNumber={1}
                reviews="567"
                location={{ icon: "/usa.png", name: "New York" }}
                buttons={userDetail1Buttons}
                tropy={tropy}
                middles={middles}
              />
            </div>

            {/* bottom section -----> */}
            <UserDetail
              userNumber={12}
              isSlideButton={false}
              userCorporation="America Wisdom.."
              userRole="Architectural Designer"
              starValue={7.5}
              reviews="10k+"
              location={{ icon: "/chinese.png", name: "Taipei Testtest.." }}
              buttons={userDetail2Buttons}
            />
          </div>
        </div>
      </ComponentWrapper>
      {/* chat icons  */}
      <QuickQuote />
      <UserChat />
    </React.Fragment>
  );
};

export default WebTopPick;

const userDetail1Buttons = [
  "Interior Design",
  "Flooring and Tiling",
  "Plumbing",
  "Electrical Work",
  "Lighting",
  "More Types...",
];

const userDetail2Buttons = [
  "Interior Design",
  "Flooring and Tiling",
  "Plumbing",
  "Electrical Work",
];

const tropy = [
  <Icons.Tropy className="w-[32px] h-[28px]" />,
  <Icons.Tropy className="w-[32px] h-[28px]" />,
  <Icons.CyanTropy className="w-[32px] h-[28px]" />,
  <Icons.CyanTropy className="w-[32px] h-[28px]" />,
  <Icons.CyanTropy className="w-[32px] h-[28px]" />,
  <Icons.Tropy className="w-[32px] h-[28px]" />,
  <Icons.Tropy className="w-[32px] h-[28px]" />,
  <Icons.CyanTropy className="w-[32px] h-[28px]" />,
  <Icons.CyanTropy className="w-[32px] h-[28px]" />,
  <Icons.CyanTropy className="w-[32px] h-[28px]" />,
];

const middles = [
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
  <Icons.Middle className="w-[22px] h-[28px]" />,
];
