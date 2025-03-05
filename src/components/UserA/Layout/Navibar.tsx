import React, { useEffect, useRef, useState } from "react";
import ComponentWrapper from "../../shared/ComponentWrapper/ComponentWrapper";
import * as Icons from "../../../Svg/Icons";
import { HiOutlinePlus } from "react-icons/hi";

const Navibar: React.FC = () => {
  const [imageSrc, setImageSrc] = useState("/trumb4.webp");
  const [editMode, setEditMode] = useState(false);
  const [selectedBtn, setBtn] = useState("Order Now");
  const [name, setName] = useState("Donald Trump");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // functions ---------->

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // useeEffect ---------->
  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(name.length, name.length);
    }
  }, [editMode, name]);

  return (
    <ComponentWrapper>
      <div className="w-full cmd:flex hidden justify-start bg-cover bg-top bg-hero-gradient pt-[3rem] items-center gap-2 csm2:gap-4">
        <div className="relative">
          <img
            src={imageSrc}
            className="min-w-[60px] csm:min-w-[80px] csm2:min-w-[100px] rounded-full min-h-[60px] csm:min-h-[80px] csm2:min-h-[100px]"
            alt=""
          />
          {editMode && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="w-[30px] h-[30px] flex justify-center items-center border-[2px] border-white-1 rounded-[12px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
              >
                <HiOutlinePlus className="text-white-1 text-[25px]" />
              </label>
            </>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className="group absolute -top-2 -right-2"
          >
            <Icons.Edit
              className="w-[20px] h-[20px] transition-all duration-200"
              fill={` ${
                editMode
                  ? "fill-cyan-1"
                  : "group-hover:fill-[#999999] fill-[#555555]"
              } `}
            />
          </button>
        </div>
        <div className="flex flex-col">
          {editMode ? (
            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`text-[18px] ${
                editMode ? "text-cyan-1" : "text-white-1"
              } focus:outline-none font-pingfang-medium bg-transparent border-none`}
            />
          ) : (
            <h2
              className={`text-[18px] ${
                editMode ? "text-cyan-1" : "text-white-1"
              } font-pingfang-medium`}
            >
              {name}|
            </h2>
          )}
          <p className="text-[14px] text-[#eeeeee] font-pingfang">
            Political Speaker
          </p>
          {/* favorite + location */}
          <div className="flex flex-wrap justify-start items-center gap-y-1 gap-x-3">
            <div className="flex justify-center gap-[4px] items-center">
              <Icons.Star className="w-[20px] h-[20px]" />
              <p className="text-white-3 text-[18px] font-pingfang-medium">
                8.2
              </p>
              <p className="text-[#777777] text-[14px] font-pingfang">(299)</p>
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
      {/* navigations -------> */}
      <div className="w-full py-2 csm:py-3 hidden cmd:grid grid-cols-4 justify-center items-center">
        {navigationButtons.map((item, index) => {
          return (
            <button
              onClick={() => setBtn(item)}
              key={index}
              className={`${
                selectedBtn === item
                  ? "orderSelectedBtn text-[#ff9527] font-pingfang-semibold"
                  : "order-button-hover text-[#777777] font-pingfang"
              } py-3 text-[14px] w-full transition-all duration-300 flex justify-center items-center`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </ComponentWrapper>
  );
};

export default Navibar;

const navigationButtons = ["Profile"];