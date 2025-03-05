import React from "react";
import { useLocation } from "react-router-dom";

const Support: React.FC = () => {
  const location = useLocation();

  return (
    <button
      className={`fixed right-0 csm:right-2 -bottom-3 csm:-bottom-4 block`}
    >
      <img
        src="/support.png"
        className="w-[50px] hover:scale-110 transition-all duration-500 xl:w-[120px] lg:w-[80px] lg:h-[90px] h-[60px] xl:h-[135px]"
        alt=""
      />
    </button>
  );
};

export default Support;
