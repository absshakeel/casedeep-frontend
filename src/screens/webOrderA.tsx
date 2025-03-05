import React, { useState } from "react";
import { useUserRedux } from "../hooks/useUserRedux";
import Navibar from "../components/UserA/Layout/Navibar";
import ComponentWrapper from "../components/shared/ComponentWrapper/ComponentWrapper";
import Steeper from "../components/UserB/WebOrder/Steps/Steeper";
import Confirmation from "../components/UserA/Steps/Confirmation/Confirmation";
import Contract from "../components/UserA/Steps/Contract";
import Payment from "../components/UserA/Steps/Payment";
import Delivery from "../components/UserA/Steps/Delivery";
import { IoIosArrowBack } from "react-icons/io";
import RatingCom from "../components/UserB/WebOrder/Steps/Rating";
import * as Icons from "../Svg/Icons";
import HeaderTop from "../components/globals/HeaderTop";

const WebOrderA: React.FC = () => {
  const { activeStep2, setActiveStep2 } = useUserRedux();
  const [activeStep, setActiveStep] = useState<number>(0);

  const setSteeper = () => {
    setActiveStep2(-1);
  };

  return (
    <div className="">
      <HeaderTop/>
      <Navibar />
      <ComponentWrapper styles="pb-6">
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
          <div className="w-full cmd:grid hidden mx-auto mt-2 gap-x-0 gap-y-0 cmd:gap-y-6 cmd:gap-x-1 grid-cols-1 cmd:grid-cols-[.8fr,1fr,1fr]">
            {/* STEPPER ------------> */}
            <Steeper
              activeStep={activeStep}
              updateStep={setActiveStep}
              steepers={steppers}
            />
            {/* step 1 ----> */}
            {activeStep === 0 && <Confirmation />}

            {/* step 2 -----> */}
            {activeStep === 1 && <Contract />}

            {activeStep === 2 && <Payment />}

            {activeStep === 3 && <Delivery />}

            {activeStep === 4 && (
              <RatingCom
                type1="Professional Level"
                type2="Client Standards"
                type3="Level of Cooperation"
              />
            )}
          </div>

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
          {/* Contract for small screen */}
          <div className="w-full cmd:hidden block">
            {activeStep2 === 1 && <Contract />}
          </div>
          {/* delivery for small screen ---> */}
          <div className="w-full cmd:hidden block">
            {activeStep2 === 3 && <Delivery />}
          </div>
          {/* payement for small screen  */}
          <div className="w-full cmd:hidden block">
            {activeStep2 === 2 && <Payment />}
          </div>
          {/* rating for small screen  */}
          <div className="w-full cmd:hidden block">
            {activeStep2 === 4 && (
              <RatingCom
                type1="Professional Level"
                type2="Client Standards"
                type3="Level of Cooperation"
              />
            )}
          </div>
        </div>
      </ComponentWrapper>
    </div>
  );
};

export default WebOrderA;

const steppers = [
  {
    step: "Confirmation",
    des: "Please select",
    icon: "/confirmation.png",
    isredDot: false,
  },
  {
    step: "Contract",
    des: "Supplementary terms have been signed",
    icon: <Icons.Contract />,
    isredDot: false,
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
