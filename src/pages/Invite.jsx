import { useState } from 'react';
import groupImage from '../assets/group.png';
import inviteIcon from '../assets/invite.svg';
import { useTranslation } from 'react-i18next';

function Invite() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://codedeal.com/invite/username";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <main className="px-6 md:max-w-[960px] mx-auto">
        {/* Hero Section */}
        <div className="flex flex-row items-center flex-start mb-[20px]">
          <div className="mx-0 mr-2 md:mr-4 w-[60px] h-[60px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden">
            <img 
              src={groupImage} 
              alt={t('referralSystem.groupImageAlt')}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left mt-0 ml-2 md:ml-0">
            <h1 className="text-[18px] md:text-[46px] m-0 leading-none font-bold font-arial">
              <span className="text-[#00c8c8] block">{t('referralSystem.heroTitle1')}</span>
              <span className="text-[#ff9527] block">{t('referralSystem.heroTitle2')}</span>
            </h1>
          </div>
        </div>

        {/* Share Link Section */}
        <div className="mb-[10px]">
          <p className="md:max-w-[480px] flex text-[#999999] text-base mb-[10px] md:mb-[10px] items-center md:items-end">
            <img src={inviteIcon} width={30} height={30} alt={t('referralSystem.inviteIconAlt')} /> 
            <span>{t('referralSystem.shareLinkText')}</span>
          </p>
          <div className="md:max-w-[480px]">
            <div className="relative">
              <input 
                type="text" 
                value={inviteLink}
                readOnly
                className="w-full h-[48px] bg-[#00c8c8] rounded-full pl-6
                  text-[#000000] text-base focus:outline-none"
              />
              <button 
                onClick={handleCopy}
                className={`text-[10px] absolute right-[0px] top-1/2 -translate-y-1/2 h-[50px] w-[50px] rounded-full transition-all
                  ${copied 
                    ? 'bg-[#00E5FF] text-black' 
                    : 'bg-[#333333] text-white hover:bg-[#555555]'
                  }`}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 mb-8">
          {/* They will receive */}
          <div className="rounded-xl border border-[#333] overflow-hidden">
            <div className="bg-[#333333] p-2">
              <h2 className="text-[24px] text-center font-light text-[#cccccc]">
                {t('referralSystem.theyWillReceive')}
              </h2>
            </div>
            <div className="bg-gradient-to-r from-[#252525] to-[#151515] p-6 space-y-4">
              <div>
                <p className="text-[#999999]">{t('referralSystem.personalUsers')}</p>
                <p className="text-xl">
                  <span className="text-[#cccccc] text-[16px] md:text[20px] font-bold">
                    {t('referralSystem.personalValue')}
                  </span>
                  <span className="text-[#00c8c8] text-[12px] md:text-base">
                    {t('referralSystem.valueVoucher')}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[#999999]">Business Users</p>
                <p className="text-xl">
                  <span className="text-[#cccccc] text-[16px]  md:text[20px]  font-bold">$342</span>
                  <span className="text-[#00c8c8] text-[12px] md:text-base"> value 1-year free usage voucher</span>
                </p>
              </div>
            </div>
          </div>

          {/* You will earn */}
          <div className="rounded-xl border border-[#333] overflow-hidden">
            <div className="bg-[#333333] p-2">
              <h2 className="text-[24px] text-center font-light text-[#cccccc]">
                {t('referralSystem.youWillEarn')}
              </h2>
            </div>
            <div className="bg-gradient-to-r from-[#252525] to-[#151515] p-6 space-y-4">
              <div>
                <p className="text-[#999999]">{t('referralSystem.personalUsers')}</p>
                <p className="text-xl">
                  <span className="text-[#cccccc] text-[16px] md:text[20px] font-bold">
                    {t('referralSystem.personalReward')}
                  </span>
                  <span className="text-[#ff9527] text-[12px] md:text-base">
                    {t('referralSystem.perPerson')}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-[#999999]">Business Users</p>
                <p className="text-xl">
                  <span className="text-[#cccccc] text-[16px] md:text[20px] font-bold">$100</span>
                  <span className="text-[#ff9527] text-[12px] md:text-base"> per company</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invites List */}
        <div className="border border-[#333] rounded-xl p-6">
          <div className="space-y-4">
            <div className="md:flex md:justify-between md:items-center">
              <div>
                <p className="text-base text-[#999]">
                  {t('referralSystem.friendsInvited', { count: 159 })}
                  {t('referralSystem.upgradedUsers', { personal: 1, business: 2 })}
                </p>
              </div>
              <input
                type="text"
                placeholder={t('referralSystem.searchPlaceholder')}
                className="w-full md:w-[280px] h-[40px] bg-transparent border border-[#333333] rounded-full px-4 
                  text-[#FFFFFF] placeholder-[#777] text-[12px]
                  hover:border-[#444444] focus:border-[#555555] focus:outline-none transition-colors
                  mt-4 md:mt-0"
              />
            </div>

            <div className="space-y-4 mt-6">
              {/* Unpaid Personal User */}
              <div className="border-b border-[#333333] pb-4">
                <p className="text-[#eee]">Username (Display Name) <span className="text-[10px] block md:inline  text-[#777777]"> Joined On: Jan 12, 2025</span></p>
                <p className="text-[#777777] text-[12px]">This personal user has not yet paid for the upgrade.</p>

              </div>

              {/* Paid Business User */}
              <div className="">
              <p className="text-[#eee]">
              <svg className="w-4 h-4 text-[#4CAF50] inline mr-1"  fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                Mixbone1998 (Display Name) <span className="text-[10px] block md:inline  text-[#777777]"> Joined On: Jan 12, 2025</span>
              </p>

               
                <p className="text-[#aaaaaa] text-[12px]">This business user has paid for the upgrade. Upgrade Time: Jan 15, 2025.</p>
               
                <p className="text-[#aaaaaa] text-[12px] mt-1">
                If no refund is processed within 1 month, you will receive $100.
                <br></br>
                You have received $100.
                
                  <button className="text-[#00c8c8] hover:text-[#00E5FF]/80 ml-1 transition-colors">
                    View Billing
                  </button>
                </p>
                <button className="w-full  md:w-[50%]  mt-5 h-[30px] rounded-full text-[#777]
                border border-[#777] 
                hover:bg-[#333333] active:bg-[#444444] transition-colors">
                Show more
              </button>
              </div>

             
            </div>
          </div>
        </div>
   
      </main>
    </div>
  );
}

export default Invite;