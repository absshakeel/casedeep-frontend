import React, { useEffect, useState } from "react";
import LanguageSwitcher from "../../shared/Ui/LanguageSwitcher";
import ComponentWrapper from "../../shared/ComponentWrapper/ComponentWrapper";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaCaretDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import * as Icons from "../../../Svg/Icons";

const Navibar: React.FC = () => {
  const [location, setlocation] = useState(locations[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeBtn, setActiveBtn] = useState(buttons[0]);
  const { i18n } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleButtons, setVisibleButtons] = useState(buttons);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  // useEffect -------------------------------->

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 880) {
      setVisibleButtons(buttons.slice(0, 6));
    } else {
      setVisibleButtons(buttons);
    }
  }, [windowWidth, buttons]);

  return (
    <nav
      className={`w-full z-50 bg-hero-gradient bg-top bg-cover sticky -top-[4px] sm:-top-[70px] transition-all duration-300 max-w-[1500px] mx-auto`}
    >
      {/* top section */}
      <div className="w-full lg:px-8 px-4 flex justify-between items-center py-4">
        <button className="uppercase text-[#777777] border-[1px] border-[#555555] text-[12px] w-[100px] csm:w-[120px] h-[30px] rounded-[10px] flex justify-center items-center font-pingfang-semibold">
          Home
        </button>
        <div className="hidden csm:flex justify-center items-center gap-3">
          <LanguageSwitcher />
          <button className="group relative">
            <Icons.Notification
              className="w-[30px] h-[30px]"
              fill="fill-[#777777] group-hover:fill-[#999999] group-active:fill-cyan-1"
            />
            <div className="w-[5px] h-[5px] absolute top-[2px] right-[4px] rounded-full bg-[#ff1d1d]"></div>
          </button>
          <button className="group">
            <Icons.OutlineHeart className="w-[30px] h-[30px]" stroke="stroke-[#777777] group-hover:stroke-[#999999] group-active:stroke-cyan-1"/>
          </button>
          <button className="text-[14px] mr-3 group relative w-[80px] h-[30px] hover:text-[#999999] hover:border-[#999999] active:border-cyan-1 active:text-cyan-1 transition-all duration-300 rounded-[10px] border-[1px] border-[#777777] font-pingfang text-[#777777]">
            Orders
            <div className="w-[5px] h-[5px] group-hover:hidden group-active:hidden absolute top-[3px] right-[4px] rounded-full bg-[#ff1d1d]"></div>
          </button>
          <img
            src="/web-top-picks/trump.webp"
            className="w-[50px] h-[50px]"
            alt=""
          />
        </div>
        {/* for small screen -----> */}
        <div className="csm:hidden flex justify-center items-center gap-[6px] csm:gap-[15px]">
          <button className="h-[30px] active:bg-cyan-2 active:text-black-1 active:border-cyan-2 font-pingfang px-4 rounded-[10px] text-[14px] hover:text-cyan-1 transition duration-300 text-cyan-2 leading-0 hover:border-cyan-1 border-cyan-2 flex justify-center items-center border-[1px]">
            Log in
          </button>
          <button className="h-[30px] px-4 active:bg-[#e27700] active:border-[#e27700] font-pingfang rounded-[10px] transition-all duration-300 hover:border-[#ffddaa] hover:bg-[#ffddaa] bg-orange-1 text-[14px] text-black-1 leading-0 border-orange-1 flex justify-center items-center border-[1px]">
            Sign Up Free
          </button>
        </div>
      </div>
      {/* down-section */}
      <ComponentWrapper>
        <div className="w-full pl-0 csm:pl-2 grid pb-2 gap-5 csm2:gap-2 md:gap-4 grid-cols-2 csm2:grid-cols-[1fr,3fr,1fr]">
          {/* 1st col */}
          <div className="w-full order-1 csm2:order-1 flex justify-center items-center gap-2">
            <div className="min-w-[72px] min-h-[80px] bg-black-3"></div>
            <div className="flex flex-col">
              <h1 className="text-[30px] sm:text-[36px] font-pingfang-semibold text-white-1">
                Interior
              </h1>
              <p className="uppercase -mt-3 text-[18px] sm:text-[20px] font-pingfang">
                <span className="text-cyan-1">top</span>{" "}
                <span className="text-[#ff9527]"> pic</span>
              </p>
              {/* location ------> */}
              <div className="z-50 shadow-lg w-full">
                <Menu>
                  <MenuButton
                    onClick={() => setIsOpen(!isOpen)}
                    className={`inline-flex uppercase px-1 w-full h-[24px] border-[1px] border-[#333333] justify-between rounded-[60px] items-center duration-300 gap-1 group font-pingfang bg-transparent ${isOpen ? "text-[#00c8c8]" : "text-[#777777]"} font-semibold text-[14px]`}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <img
                        src={location.icon}
                        className="w-[16px] h-[16px]"
                        alt=""
                      />
                      <p className="text-[12px] capitalize font-pingfang text-white-3">
                        {location.name}
                      </p>
                    </div>
                    <FaCaretDown
                      className={`size-[14px] ${isOpen ? "fill-[#555555]" : "fill-[#555555]"} duration-300`}
                    />
                  </MenuButton>

                  <MenuItems
                    transition
                    anchor="bottom end"
                    className={`w-[134px] z-50 origin-top-right border-[1px] border-[#333333] rounded-[12px] font-normal font-pingfang bg-black-1 text-[12px] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}
                  >
                    {locations.map((item, index) => (
                      <MenuItem key={index}>
                        <button
                          onClick={() => {
                            setlocation(item);
                            changeLanguage(item.code);
                            setIsOpen(false);
                          }}
                          className={`group ${
                            location.name === item.name
                              ? "bg-cyan-1 text-black-1"
                              : "bg-transparent text-[#eeeeee] hover:bg-[#333333]"
                          } ${index === 2 && "rounded-b-[12px]"} ${
                            index === 0 && "rounded-t-[12px]"
                          } font-pingfang text-[12px] px-1 py-1 flex w-full items-center gap-2 data-[focus]:bg-white/10`}
                        >
                          <img
                            src={item.icon}
                            alt=""
                            className="w-[16px] h-[16px] object-contain"
                          />
                          {item.name}
                        </button>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          {/* 2nd col  */}
          <div className="w-full csm2:col-span-1 col-span-2 order-3 csm2:order-2 grid grid-cols-2 cmd:grid-cols-3 justify-center items-center lg:grid-cols-4 gap-2 csm2:gap-[4px]">
            {visibleButtons.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setActiveBtn(item)}
                  className={`w-full ${
                    activeBtn === item
                      ? "bg-cyan-1 text-black-1 font-semibold font-pingfang-semibold border-cyan-1"
                      : "bg-black-1 hover:border-[#777777] hover:text-[#cccccc] font-pingfang text-[#cccccc] border-[#333333]"
                  } rounded-[10px] transition-all duration-300 h-[30px] flex justify-center items-center border-[1px]`}
                >
                  <p className="text-[12px]">{item}</p>
                </button>
              );
            })}
          </div>
          {/* 3rd col  */}
          <div className="w-full order-2 csm2:order-3 flex justify-center items-center gap-2">
            <div className="border-[1px] border-[#333] w-[82px] h-[82px] rounded-[5px] hidden  md:flex justify-center items-center hover:border-[#777777]">
              <img
                src="/web-top-picks/qrcode.png"
                className="w-[72px] h-[72px]"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <button className="active:opacity-50 duration-300">
                <Icons.PlayStore />
              </button>
              <button className="active:opacity-50 duration-300">
                <Icons.GooglePlay />
              </button>
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </nav>
  );
};

const locations = [
  {
    icon: "/usa.png",
    name: "English",
    code: "en",
  },
  {
    icon: "/japanese.png",
    name: "Japanese",
    code: "ja",
  },
  {
    icon: "/chinese.png",
    name: "Chinese",
    code: "zh",
  },
];

const buttons = [
  "Interior Design",
  "Painting Carpentry",
  "Flooring and Tiling",
  "Walling",
  "Carpentry",
  "Plumbing",
  "Electrical Work",
  "Appliance Installation",
  "Lighting",
  "Window Treatments",
  "Flooring and Tiling",
  "More Types...",
];

export default Navibar;
