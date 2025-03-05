import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CaseDeepLogo from '../assets/casedeep-logo.svg';
import CaseDeepLogoJP from '../assets/casedeep-logo-ja.png';
import CaseDeepLogoCN from '../assets/casedeep-logo-zh.png';
import { useTranslation } from 'react-i18next';

function ManageAccount() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEditing, setIsEditing] = useState({
    email: true,
    password: true,
    username: true
  });
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);

  const languages = [
    { code: 'en-US', name: 'United States', flag: '🇺🇸', logo: CaseDeepLogo },
    { code: 'en-CA', name: 'Canada', flag: '🇨🇦', logo: CaseDeepLogo },
    { code: 'en-UK', name: 'United Kingdom', flag: '🇬🇧', logo: CaseDeepLogo },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵', logo: CaseDeepLogoJP },
    { code: 'zh-TW', name: '中文', flag: '🇹🇼', logo: CaseDeepLogoCN }
  ];

  const getCurrentLogo = () => {
    return languages.find(lang => lang.code === selectedLanguage)?.logo || CaseDeepLogo;
  };

  useEffect(() => {
    if (isEditing.email || isEditing.password || isEditing.username) {
      setIsConfirmed(false);
    }
  }, [isEditing]);

  const handleChange = (field) => {
    setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="h-[72px] px-6 flex items-center justify-between">
 

      </header>

      <main className="px-6 max-w-[400px] mx-auto">
        {/* Dynamic Logo */}
        <div className="flex justify-center mb-[30px]">
          <img src={getCurrentLogo()} alt={t('manageAccount.logoAlt')} width={320} className='h-26' />
        </div>

        <h1 className="text-[#555555] text-[20px] font-light mb-[30px] text-center">
          {t('manageAccount.title')}
        </h1>

        <div className="space-y-6">
          {/* Email Field */}
          <div className={`w-[380px] h-[46px] rounded-[23px] flex items-center ${
            isEditing.email ? 'bg-[#222222]' : 'bg-[#00c8c8]'
          }`}>
            <input
              type="email"
              placeholder={t('manageAccount.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing.email}
              className={`flex-1 h-full pl-[15px] outline-none rounded-l-[23px] ${
                isEditing.email ? 'bg-[#222222] text-[#777777]' : 'bg-[#00c8c8] text-[#000000]'
              }`}
            />
            <button
              onClick={() => handleChange('email')}
              className={`w-[46px] h-[46px] ${isEditing.email ? 'bg-[#333333]' : 'bg-[#55ffff]'} rounded-full text-[#aaaaaa] text-[10px]`}
            >
              {t('manageAccount.changeButton')}
            </button>
          </div>

          {/* Password Field */}
          <div className={`w-[380px] h-[46px] rounded-[23px] flex items-center ${
            isEditing.password ? 'bg-[#222222]' : 'bg-[#00c8c8]'
          }`}>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing.password}
              className={`flex-1 h-full pl-[15px] outline-none rounded-l-[23px] ${
                isEditing.password ? 'bg-[#222222] text-[#777777]' : 'bg-[#00c8c8] text-[#000000]'
              }`}
            />
            <button
              onClick={() => handleChange('password')}
              className={`w-[46px] h-[46px] ${isEditing.password ? 'bg-[#333333]' : 'bg-[#55ffff]'} rounded-full text-[#aaaaaa] text-[10px]`}
            >
              Change
            </button>
          </div>

          {/* Username Field */}
          <div className={`w-[380px] h-[46px] rounded-[23px] flex items-center ${
            isEditing.username ? 'bg-[#222222]' : 'bg-[#222222]'
          }`}>
            <span className={`pl-[15px] text-[#777777] bg-[#222222]
            `}>casedeep.com/</span>
            <input
              type="text"
              placeholder="test456"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing.username}
              className={`flex-1 h-full outline-none ${
                isEditing.username ? 'bg-[#222222] text-[#777777]' : 'bg-[#00c8c8] text-[#000000]'
              }`}
            />
            <button
              onClick={() => handleChange('username')}
              className={`w-[46px] h-[46px] ${isEditing.username ? 'bg-[#333333]' : 'bg-[#55ffff]'} rounded-full text-[#aaaaaa] text-[10px]`}
            >
              Change
            </button>
          </div>

          {error && (
            <p className="text-[#666666] text-sm">{error}</p>
          )}

          {/* Confirm Button */}
          <button
            onClick={() => setIsConfirmed(true)}
            disabled={isConfirmed}
            className={`w-[380px] h-[60px] mt-[43px] rounded-[10px] text-[20px] ${
              isConfirmed 
                ? 'bg-gradient-to-b from-[#272727] to-[#1e1e1e] text-[#555555]' 
                : 'bg-gradient-to-b from-[#ffa950] to-[#ff9527] text-[#000000] shadow-[0_2px_15px_0_rgba(0,0,0,0.2)]'
            }`}
          >
            {t('manageAccount.confirmButton')}
          </button>
        </div>
      </main>

      {/* Click outside to close language selector */}
      {showLanguageSelect && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowLanguageSelect(false)}
        />
      )}
    </div>
  );
}

export default ManageAccount;