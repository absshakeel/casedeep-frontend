import React from "react";
import { useTranslation } from "react-i18next";
import ComponentWrapper from "../ComponentWrapper/ComponentWrapper";
import * as Icons from "../../../Svg/Icons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ComponentWrapper>
      <div className="w-full py-7 csm:py-14 max-w-[1100px] flex-col flex justify-center items-center">
        {/* links  */}
        <div className="w-full gap-5 flex justify-center items-center flex-col">
          <div className="flex justify-center items-center gap-4">
            <Icons.Twitter className="w-[25px] opacity-70 duration-300 hover:opacity-100 h-[22px]" />
            <Icons.YouTube className="w-[100px] h-[22px] opacity-70 duration-300 hover:opacity-100" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {links.map((item, index) => {
              return (
                <div key={index} className="flex justify-center items-center gap-2">
                  <Link
                    target="_blank"
                    to={item.path}
                    className="text-[14px] capitalize font-pingfang font-normal text-[#777777]"
                  >
                    {t(`footer.links.${item.name}`)}
                  </Link>
                  <div
                    className={`w-[1px] ${
                      links.length === index + 1 ? "hidden" : "block"
                    } h-[11px] bg-[#777777]`}
                  />
                </div>
              );
            })}
          </div>
          <p className="text-[14px] capitalize font-pingfang font-normal text-[#777777]">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </ComponentWrapper>
  );
};

const links = [
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "disclaimer", path: "/disclaimer" },
  { name: "terms", path: "/terms" },
  { name: "privacyPolicy", path: "/privacy-policy" },
];

export default Footer;
