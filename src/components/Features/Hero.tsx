import React from "react";
import ComponentWrapper from "../shared/ComponentWrapper/ComponentWrapper";

const Hero: React.FC = () => {
  return (
    <ComponentWrapper styles="py-6 sm:py-10">
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="w-full flex justify-center items-center flex-col gap-3">
          <p className="text-[20px] text-[#00c8c8] font-normal font-zen">Standard Provider</p>
          <div
            style={{
              backgroundImage: `url('/circular-blue.svg')`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
            className="w-full max-w-[220px] h-[330px]"
          >
            <div className="flex flex-col h-full pb-[8rem] w-full justify-center items-center">
                <p className="text-black-1 text-[30px] font-pingfang-medium font-medium">0%</p>
                <p className="text-[20px] font-normal text-black-1 font-pingfang">Completely Free</p>
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default Hero;
