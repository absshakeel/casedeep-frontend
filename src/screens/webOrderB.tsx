//@ts-nocheck

import React, { useState } from "react";
import Navibar from "../components/UserB/WebOrder/Layout/Navibar";
import ComponentWrapper from "../components/shared/ComponentWrapper/ComponentWrapper";
import { IoIosArrowBack } from "react-icons/io";
import Steeper from "../components/UserB/WebOrder/Steps/Steeper";
import Confirmation from "../components/UserB/WebOrder/Steps/Confirmation";
import UserChat from "../components/WebTopPick/UserChat";
import Contract from "../components/UserB/WebOrder/Steps/Contract";
import Payement from "../components/UserB/WebOrder/Steps/Payement";
import Delivery from "../components/UserB/WebOrder/Steps/Delivery";
import RatingCom from "../components/UserB/WebOrder/Steps/Rating";
import * as Icons from "../Svg/Icons";
import { useUserRedux } from "../hooks/useUserRedux";
import HeaderTop from "../components/globals/HeaderTop";

const WebOrderB = () => {
  // states -------->
  const [activeStep, setActiveStep] = useState(0);
  const { activeStep2, setActiveStep2 } = useUserRedux();

  const setSteeper = () => {
    setActiveStep2(-1);
  };

  console.log(activeStep2);

  return (
    <React.Fragment>
      <HeaderTop/>
      <Navibar />
      <ComponentWrapper styles="pb-6">
        <div className="w-full flex flex-col">
          {/* for small screen -----> */}
          {activeStep2 === -1 && (
            <div className="w-full cmd:hidden pb-2 pt-2 flex justify-between items-center">
              <button
                onClick={setSteeper}
                className="flex justify-center items-center gap-2"
              >
                <IoIosArrowBack className="text-[#555555] text-[24px]" />
                <p className="text-[#555555] text-[18px] font-pingfang">
                  {activeStep2 === -1 && "Interior Design"}
                  {activeStep2 === 0 && "Confirmation"}
                  {activeStep2 === 1 && "Contract"}
                  {activeStep2 === 2 && "Payement"}
                  {activeStep2 === 3 && "Delivery"}
                  {activeStep2 === 4 && "Rating"}
                </p>
              </button>

              <img src="/trumb4.webp" className="w-[40px] h-[40px]" alt="" />
            </div>
          )}
          <div className="w-full flex flex-col">
            <div className="w-full mx-auto mt-2 gap-x-2 gap-y-6 cmd:gap-x-1 hidden cmd:grid grid-cols-1 cmd:grid-cols-[.8fr,1fr,1fr]">
              {/* STEPPER ------------> */}
              <Steeper
                activeStep={activeStep}
                steepers={steppers}
                updateStep={setActiveStep}
              />
              {activeStep === 0 && <Confirmation />}
              {activeStep === 1 && <Contract />}
              {activeStep === 2 && <Payement />}
              {activeStep === 3 && <Delivery />}
              {activeStep === 4 && (
                <RatingCom
                  type1="Contractual Spirit"
                  type2="Professional Level"
                  type3="Level of Cooperation"
                />
              )}
            </div>
            {/* for small screen ------> */}
            {/* steepr for small screen ---> */}
            {activeStep2 === -1 && (
              <div className="cmd:hidden flex">
                <Steeper
                  activeStep={activeStep}
                  updateStep={setActiveStep}
                  steepers={steppers}
                />
              </div>
            )}
            {/* Confirmation for small screen  */}
            <div className="w-full cmd:hidden block">
              {activeStep2 === 0 && <Confirmation />}
            </div>
            <div className="w-full cmd:hidden block">
              {activeStep2 === 1 && <Contract />}
            </div>
            <div className="w-full cmd:hidden block">
              {activeStep2 === 2 && <Payement />}
            </div>
            <div className="w-full cmd:hidden block">
              {activeStep2 === 3 && <Delivery />}
            </div>
            <div className="w-full cmd:hidden block">
              {activeStep2 === 4 && (
                <RatingCom
                  type1="Contractual Spirit"
                  type2="Professional Level"
                  type3="Level of Cooperation"
                />
              )}
            </div>
          </div>
        </div>
      </ComponentWrapper>
      <UserChat />
    </React.Fragment>
  );
};

export default WebOrderB;

const steppers = [
  {
    step: "Confirmation",
    des: "Please select",
    icon: "/confirmation.png",
    isredDot: true,
  },
  {
    step: "Contract",
    des: "Supplementary terms have been signed",
    icon: <Icons.Contract />,

    isredDot: true,
  },
  {
    step: "Payment",
    des: "30% has been paid",
    icon: <Icons.Payement />,

    isredDot: false,
  },
  {
    step: "Delivery",
    des: "Partial results have been delivered",
    icon: <Icons.Delivery />,

    isredDot: true,
  },
  {
    step: "Rating",
    des: "Not rated",
    icon: <Icons.steeperStar />,

    isredDot: false,
  },
];
