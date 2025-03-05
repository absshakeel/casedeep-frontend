import {
    Button,
    Card,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    NavbarBrand,
    Row,
    UncontrolledDropdown,
    Spinner,
  } from "reactstrap";
  import logoImg from "../../assets/logo.png";
  import dummyProfileImg from "../../assets/user-2.png";
  import { dummyKeywords, profileDropdownOptions } from "../../dummyData";
  import playstoreImg from "../../assets/playstore.png";
  import appstoreImg from "../../assets/appstore.png";
  import CountrySelectInput from "../inputs/CountrySelectInput";
  import dummyQRimg from "../../assets/dummy-qr.png";
  import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
  import { IoNotificationsOutline } from "react-icons/io5";
  import { FaRegHeart } from "react-icons/fa";
  import { useGetProfileQuery } from "../../store/services/profileApi";
  import { useState } from "react";
  import { useTranslation } from 'react-i18next';
  import { useAuthRedux } from "../../hooks/useAuthRedux";
  
  const HeaderTop = () => {
    const { relatedTo } = useParams();
    const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
    const { isAuthenticated, user, handleLogout: logout } = useAuthRedux();
    
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { i18n } = useTranslation();
    
    const languages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
      { code: 'zh', name: 'Chinese', flag: '🇹🇼' }
    ];
  
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    
    const changeLanguage = (langCode) => {
      i18n.changeLanguage(langCode);
      setDropdownOpen(false);
    };
    
    const handleLogout = async () => {
      await logout();
      navigate('/');
    };
    
    return (
      <Navbar className="main-header px-xl-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link
            to={"/"}
            style={{ width: "120px", borderColor: "#333" }}
            className="btn text-white"
          >
            Home
          </Link>
          <div className="d-flex align-items-center gap-3">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle
                className="bg-transparent header-link p-0 border-none"
                caret
              >
                {i18n.language.toUpperCase() || 'EN'}
              </DropdownToggle>
              <DropdownMenu className="language-dropdown" style={{ backgroundColor: '#111', borderRadius: '12px', overflow: 'hidden', minWidth: '160px', minHeight: 'auto' }}>
                {languages.map((lang) => (
                  <DropdownItem 
                    key={lang.code} 
                    onClick={() => changeLanguage(lang.code)}
                    className="py-2"
                    style={{ 
                      backgroundColor: i18n.language === lang.code ? '#222' : 'transparent',
                      color: '#ccc'
                    }}
                  >
                    <span style={{ fontSize: '24px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {lang.flag}
                    </span>
                    <span style={{ fontSize: '16px' }}>{lang.name}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            {/* Only show these elements if user is authenticated */}
            {isAuthenticated && (
              <>
                <Link className="header-link" to={"/"}>
                  <IoNotificationsOutline size={25} />
                </Link>
                <Link className="header-link" to={"/"}>
                  <FaRegHeart size={25} />
                </Link>
                <Link className="btn header-link" to={"/orders"}>
                  Orders
                </Link>
                
                <UncontrolledDropdown className="profile-dropdown">
                  <DropdownToggle className="bg-transparent header-link p-0 border-none">
                    <img
                      src={profileData?.personProfile?.profileImage || dummyProfileImg}
                      height={50}
                      width={50}
                      className="object-fit-cover"
                      alt={profileData?.personProfile?.legalFullName || "Profile"}
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <div className="d-flex justify-content-end">
                    <div className="chevron-up"></div>
                    </div>
                    <div className="border-t border-[#333333] flex flex-col">
                        <Link to="/dashboard" className="w-full px-4 py-2 text-[14px] text-[#777777] hover:text-cyan-1 hover:bg-[#111] transition-colors duration-200 text-center">
                          Dashboard
                        </Link>
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
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
            )}
            
            {!isAuthenticated && (
              <Link to="/login" className="btn header-link">
                Login
              </Link>
            )}
          </div>
        </div>
      </Navbar>
    );
  };
  
  export default HeaderTop;
  