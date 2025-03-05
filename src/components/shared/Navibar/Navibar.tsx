import React, { useEffect, useState, useMemo, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { RxCross2 } from "react-icons/rx";
import { HiOutlinePlus } from "react-icons/hi";
import LanguageSwitcher from "../Ui/LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Icons from "../../../Svg/Icons";
import { useAuthRedux } from "../../../hooks/useAuthRedux";


const Navibar: React.FC = () => {
  // states ------------->  
  const { profile } = useAuthRedux();
  const imageSrc = profile?.personProfile?.vedioUrl || "/trumb4.webp";
  const name = profile?.personProfile?.legalFullName || "Guest User";
  const title = profile?.personProfile?.jobTitle || "Guest";
  const userLocation = profile?.personProfile?.city || "Not specified";
  const rating = profile?.personProfile?.rating || "0.0";
  const reviewCount = profile?.personProfile?.reviewCount || "0";

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [shouldTranslateFromTop, setShouldTranslateFromTop] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const { isAuthenticated, user, handleLogout: logout } = useAuthRedux();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  // data --------------->
  const logoSrc = useMemo(() => {
    switch (i18n.language) {
      case 'ja':
        return '/logo/logo_wide_ja.svg';
      case 'cn':
        return '/logo/logo_wide_cn.svg';
      default:
        return '/logo/logo_wide_en.svg';
    }
  }, [i18n.language]);

  const smallLogoSrc = useMemo(() => {
    switch (i18n.language) {
      case 'ja':
        return '/logo/logo_wide_small_ja.svg';
      case 'cn':
        return '/logo/logo_wide_small_cn.svg';
      default:
        return '/logo/logo_wide_small_en.svg';
    }
  }, [i18n.language]);

  const links = useMemo(() => [
    {
      path: "#how-it-works",
      name: t("a040b3f1-9d73-4541-a360-1f60f4355775"),
    },
    {
      path: "#features-section", 
      name: t("8d17067f-a79a-4576-bfc6-9411f6117c9d"),
    },
    {
      path: "#pricing-section",
      name: t("205ddd48-9766-4b00-acdb-00e712dd5678"),
    },
    {
      path: "#certification-section",
      name: t("46374906-c73f-423c-a87d-ee1853a0c3be"),
    },
  ], [t]);

  // functions ------------------>

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSectionScroll = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        const headerOffset = 0;
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 0);
    } else {
      const element = document.getElementById(sectionId);
      const headerOffset = 210; 
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.path.replace('#', ''));
      const scrollPosition = window.scrollY;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop - 100;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);


  return (
    <React.Fragment>
      <nav
        className={`w-full ${
          isSticky
            ? shouldTranslateFromTop
              ? "top-0 animate-slide-down sticky"
              : "top-0 sticky"
            : "top-0"
        } max-w-[1500px] shadow-xl mx-auto lg:px-8 px-4 pt-0 sm:pt-4 bg-hero-gradient bg-top bg-cover sticky -top-[4px] sm:-top-[50px] transition-all duration-300 z-50`}
      >
        <div className="w-full gap-3 sm:py-0 pt-4 pb-3 flex justify-between sm:justify-end items-center">
          {/* logo for small screen --->  */}
          <div
            onClick={() => {
              if (window)
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
            }}
            className="w-[110px] z-50  flex sm:hidden justify-center items-center "
          >
              <img src={smallLogoSrc} alt="" />

          </div>
          {/* language switcher ------->  */}
          <div className="flex z-50 justify-center items-center gap-2 sm:gap-6">
            <LanguageSwitcher />
            <div className="flex justify-center items-center gap-[15px]">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="h-[30px] active:bg-cyan-2 active:text-black-1 active:border-cyan-2 font-pingfang px-4 rounded-[10px] text-[14px] hover:text-cyan-1 transition duration-300 text-cyan-2 leading-0 hover:border-cyan-1 border-cyan-2 hidden sm:flex justify-center items-center border-[1px]">
                    Log in
                  </Link>
                  <Link to="/signup" className="h-[30px] px-4 active:bg-[#e27700] active:border-[#e27700] font-pingfang rounded-[10px] transition-all duration-300 hover:border-[#ffddaa] hover:bg-[#ffddaa] bg-orange-1 text-[14px] text-black-1 leading-0 border-orange-1 hidden sm:flex justify-center items-center border-[1px]">
                    Sign Up Free
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <img
                    src={imageSrc}
                    className="w-[40px] h-[40px] rounded-full cursor-pointer"
                    alt="profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditMode(false);
                      setIsProfileOpen(!isProfileOpen);
                    }}
                  />
                  <div className={`absolute right-0 mt-2 w-[200px] bg-black border border-[#333333] rounded-[10px] shadow-lg transition-all duration-300 z-[1000] ${isProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={(e) => e.stopPropagation()}>
                  
                  <div className="border-t border-[#333333] flex flex-col">
                    <Link to="/dashboard" className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                        Dashboard
                      </Link>
                      {/* <Link to="/upgrade" className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                        Upgrade
                      </Link> */}
                      <Link to="/profile/settings" className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                        Profile
                      </Link>
                      <Link to="/billing" className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                        Billing
                      </Link>
                      <Link to="/support" className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                        Support
                      </Link>
                      <button onClick={handleLogout} className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                        Log out
                      </button>
                </div>
                  </div>
                </div>
              )}
            </div>
            {/* hamburger  */}
            <RxHamburgerMenu
              onClick={toggleDrawer}
              className="text-[25px] cursor-pointer sm:hidden block text-[#777777]"
            />
          </div>
        </div>
        <div className="w-full mt-7 xl:gap-0 gap-6 relative hidden sm:flex z-50 justify-center items-center">
          <div
            onClick={() => {
              if (window)
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
            }}
            className="w-[300px] cursor-pointer md:w-[440px]   flex justify-center items-center "
          >
            <img src={logoSrc} alt="" />
          </div>
          <div className="flex relative xl:absolute right-0 xl:right-[11rem] flex-col justify-center items-center gap-2 z-[10]">
            <button className="active:opacity-50 duration-300">
              <Icons.PlayStore />
            </button>
            <button className="active:opacity-50 duration-300">
              <Icons.GooglePlay />
            </button>
          </div>
        </div>
        <div className="w-full max-w-[1500px] mx-auto lg:px-8 px-4 mt-6">
          <div className="w-full hidden sm:flex justify-center items-center">
          <div className="w-full max-w-[1000px] grid grid-cols-4">
              {links.map((item, index) => (
                <React.Fragment key={index}>
                  <button
                    onClick={() => handleSectionScroll(item.path.replace('#', ''))}
                    className={`w-full flex
                      ${activeSection === item.path.replace('#', '') ? "selectedBtn" : "button-hover"}
                      text-[#777777] capitalize justify-center text-[14px] font-normal font-pingfang items-center py-3`}
                  >
                    {item.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer section */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="drawer !bg-black-3 !w-[100%]"
      >
        <div className="flex flex-col p-6 justify-center items-center ">
          {/* =========>top bar */}
          <div className="w-full flex justify-end items-center">
            <RxCross2
              onClick={toggleDrawer}
              className="text-[30px] text-white-1/60 "
            />
          </div>
          {/* links ---> */}
          <div className="w-full flex-col flex pt-10 justify-center items-center gap-4">
          {links.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                toggleDrawer();
                handleSectionScroll(item.path.replace('#', ''));
              }}
              className={`w-full flex
                ${activeSection === item.path.replace('#', '') ? "text-orange-1" : "text-white-3"}
                justify-center capitalize text-[19px] font-arial-medium`}
            >
              {item.name}
            </button>
            ))}
          </div>
          <div className="w-full flex pt-8 justify-center items-center gap-2">
            <Link to="/login" className="h-[30px] font-pingfang px-4 rounded-[10px] text-[16px] text-cyan-1 leading-0 border-cyan-1 flex justify-center items-center border-[1px]">
              Log in
            </Link>
            <Link to="/signup" className="h-[30px] px-4 font-pingfang rounded-[10px] bg-orange-1 text-[16px] text-black-1 leading-0 border-orange-1 flex justify-center items-center border-[1px]">
              Sign Up Free
            </Link>
          </div>
          <div className="flex justify-center items-center pt-8 gap-2">
            <button className="">
              <img
                src="/applestore.png"
                className="w-[134px] h-[40px]"
                alt=""
              />
            </button>
            <button className="">
              <img
                src="/googleplay.png"
                className="w-[134px] h-[40px]"
                alt=""
              />
            </button>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default Navibar;
