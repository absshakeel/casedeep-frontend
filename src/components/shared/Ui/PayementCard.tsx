import React from "react";
import * as Icons from "../../../Svg/Icons";

interface Props {
  percentage: string;
  price: string;
  button: string;
  handleDocument?: any;
  handleRecipt?:any
}

const PayementCard: React.FC<Props> = ({
  percentage,
  price,
  button,
  handleDocument = () => {},
  handleRecipt
}: Props) => {
  const handleBtnClick = (btnType: string) => {
    if (btnType === "Request" || btnType === "Pay") {
      handleDocument();
    } else {
      handleRecipt()
    }
  };

  return (
    <div className="w-full max-w-[250px] mx-auto h-fit bg-contract-bg p-4 rounded-[32px] flex flex-col gap-3">
      <div className="flex justify-start items-center gap-2">
        <Icons.Check4
          fill={`${
            button === "Request" || button === "Pay"
              ? "fill-[#555555]"
              : "fill-[#ff9527]"
          }`}
          className="w-[50px] h-[50px]"
        />
        <h2
          className={`text-[36px] font-pingfang ${
            button === "Request" || button === "Pay"
              ? "text-[#555555]"
              : "text-[#cccccc]"
          }`}
        >
          {percentage}
        </h2>
      </div>
      <div className="flex justify-center items-center gap-2">
        <p
          className={`${
            button === "Request" || button === "Pay"
              ? "text-[#555555]"
              : "text-[#999999]"
          } text-[16px] font-pingfang uppercase`}
        >
          USD
        </p>
        <p
          className={`${
            button === "Request" || button === "Pay"
              ? "text-[#555555]"
              : "text-[#999999]"
          } text-[16px] font-pingfang`}
        >
          {price}
        </p>
      </div>
      <button
        onClick={() => handleBtnClick(button)}
        className={`w-full h-[50px] ${
          (button === "Pay" || button === "Received?") &&
          "bg-orange-btn hover:bg-hover-orange active:bg-press-orange text-black-1"
        } 
        ${
          button === "Request" &&
          "bg-cyan-btn active:bg-press-cyan hover:bg-hover-cyan transition-all duration-300 text-black-1"
        }
        ${button === "Paid" && "bg-[#333333] text-[#999999]"}

        rounded-[25px] text-[14px] font-pingfang`}
      >
        {button}
      </button>
    </div>
  );
};

export default PayementCard;
