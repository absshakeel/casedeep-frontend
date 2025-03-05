import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  activeStep: number;
  steepers: any[];
  updateStep?: (a: number) => void;
}

const Steeper: React.FC<Props> = ({
  activeStep,
  steepers,
  updateStep = () => {},
}: Props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`w-full cmd:max-w-full  mx-auto flex flex-col gap-[2px]`}
    >
      {steepers.map((item, index) => {
        return (
          <button
            onClick={() => {
              updateStep(index);
              dispatch({ type: 'user/setActiveStep2', payload: index });
            }}
            key={index}
            className={`h-[95px] w-full rounded-[8px] grid grid-cols-[50px,1fr] pt-3 pb-1 px-2 border-[1px] ${
              index < activeStep
                ? "bg-[#222222] steeperShadow border-[#222222] opacity-100"
                : index === activeStep
                ? "bg-[#252525] border-[#777777] opacity-100"
                : "bg-[#222222] cursor-not-allowed border-[#222222] opacity-50"
            }`}
          >
            <div className="w-full flex justify-center items-start">
              <div className="relative">
                {React.isValidElement(item.icon) ? (
                  item.icon
                ) : (
                  <img src={item.icon} className="w-[40px] h-[40px]" alt="" />
                )}
                {item.isredDot && (
                  <div className="w-[10px] absolute top-0 right-1 h-[10px] rounded-full bg-[#ff2d2d]"></div>
                )}
              </div>
            </div>
            <div className="flex pl-2 h-full justify-between flex-col items-center">
              <div className="flex w-full items-start flex-col">
                <p className="text-[16px] font-pingfang text-white-3">
                  {item.step}
                </p>
                <p className="text-[14px] text-left text-[#aaaaaa] font-pingfang">
                  {item.des}
                </p>
              </div>
              {index <= activeStep && (
                <IoIosArrowDown
                  className={`text-[20px] ${item.step === "Contract" ? "-mt-2" : "mt-0"} -ml-[68px] text-[#555]`}
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Steeper;
