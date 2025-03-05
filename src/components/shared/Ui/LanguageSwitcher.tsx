import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const [language, setLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="z-50 shadow-lg w-[134px] text-right">
      <Menu>
        <MenuButton
          onClick={() => setIsOpen(true)}
          className={`inline-flex uppercase items-center duration-300 gap-1 group font-pingfang bg-transparent ${
            isOpen ? "text-[#00c8c8]" : "text-[#777777] hover:text-[#999999]"
          }  font-semibold text-[14px]`}
        >
          {language === "Chinese" ? "Zh" : language.substring(0, 2)}

          <FaCaretDown
            className={`size-[14px] ${
              isOpen
                ? "fill-[#00c8c8]"
                : "fill-[#777777] group-hover:fill-[#999999]"
            }  duration-300 `}
          />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className={`w-[134px] z-50 origin-top-right border-[1px] border-[#333333] rounded-[15px] font-normalfont-pingfang bg-black-1 text-[12px] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}
        >
          {languages.map((item, index) => {
            return (
              <MenuItem key={index}>
                <button
                  onClick={() => {
                    setLanguage(item.name);
                    changeLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`group ${
                    language === item.name
                      ? "bg-cyan-1 text-black-1"
                      : "bg-transparent text-[#eeeeee]  hover:bg-[#333333]"
                  } ${index === 2 && "rounded-b-[14px]"} ${
                    index === 0 && "rounded-t-[14px]"
                  }  font-pingfang px-1 py-1 flex w-full items-center gap-2 data-[focus]:bg-white/10`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="w-[30px] h-[30px] object-contain"
                  />
                  {item.name}
                </button>
              </MenuItem>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
};

const languages = [
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
export default LanguageSwitcher;
