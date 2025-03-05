import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import trump from '../assets/trump.png';
import flagtw from '../assets/flags/flagtw.svg';
import medalImg from '../assets/medal.svg';
import trophyImg from '../assets/trophy.svg';
import avatarCircle from '../assets/avatar-circle.svg';

function Honors() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('medals');

  const medals = [
    {
      type: 'medal',
      projectName: t('honors.medals.projectName'),
      organization: t('honors.medals.organization'),
      date: '2024/05/09'
    },
    {
      type: 'medal',
      projectName: 'Project Name',
      organization: 'Davis Huang',
      date: '2024/02/15'
    },
    {
      type: 'medal',
      projectName: 'Project Name',
      organization: 'Alice Lee',
      date: '2024/01/25'
    }
  ];

  const trophies = [
    {
      type: 'trophy',
      projectName: t('honors.trophies.projectName'),
      organization: t('honors.trophies.organization'),
      date: '2024/03/29'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="px-6 max-w-[400px] mx-auto">
        {/* Profile Section */}
        <div className="flex items-center gap-1 mb-6">
          <div className="relative w-[120px] h-[120px]">
            <img 
              src={trump} 
              alt={t('honors.profileAlt')}
              className="w-[80%] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute inset-0"
                 style={{
                   background: `url(${avatarCircle}) no-repeat center center`,
                   backgroundSize: '100% 100%',
                   pointerEvents: 'none'
                 }}>
            </div>
            <div className="absolute bottom-[15%] right-[15%] w-4 h-4 bg-green-500 rounded-full border-2 border-black z-10"></div>
          </div>
          <div>
            <h1 className="text-[18px] text-[#eeeeee] font-medium">
              {t('honors.companyName')}
            </h1>
            <p className="text-[#eeeeee] text-[14px]">
              {t('honors.jobTitle')}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-[#eeeeee] text-[18px]">7.5</span>
              <span className="text-[#777777] text-[14px]">(299)</span>
              <img src={flagtw} alt={t('honors.flagAlt')} className="w-5 h-5 rounded-full ml-2" />
              <span className="text-[#777777] text-[12px]">
                {t('honors.location')}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-full bg-[#222] mb-3">
          <button
            className={`flex-1 py-2 rounded-full transition-colors ${
              activeTab === 'medals' ? 'bg-[#333] text-[#fff]' : 'text-[#777]'
            }`}
            onClick={() => setActiveTab('medals')}
          >
            {t('honors.medalsTab', { count: medals.length })}
          </button>
          <button
            className={`flex-1 py-2 rounded-full transition-colors ${
              activeTab === 'trophy' ? 'bg-[#333] text-[#fff]' : 'text-[#777]'
            }`}
            onClick={() => setActiveTab('trophy')}
          >
            {t('honors.trophiesTab', { count: trophies.length })}
          </button>
        </div>

        <p className="text-[#777777] text-[16px] mb-2 ml-2">
          {t('honors.awardsSummary', { 
            medals: medals.length,
            trophies: trophies.length
          })}
        </p>

        {/* Awards List */}
        <div className="space-y-1">
          {activeTab === 'medals' ? (
            medals.map((medal, index) => (
              <div key={index} className="bg-[#222222] rounded-[16px] p-[10px] flex items-center">
                <div className="relative w-12 mr-3">
                    <img src={medalImg} alt={t('honors.medalAlt')} />
                </div>
                <div>
                  <h3 className="text-[#777] text-[16px]">{medal.projectName}</h3>
                  <p className="text-[#777777] text-[12px]">{medal.organization}</p>
                  <p className="text-[#777777] text-[12px]">{medal.date}</p>
                </div>
              </div>
            ))
          ) : (
            trophies.map((trophy, index) => (
              <div key={index} className="bg-[#222222] rounded-[16px] p-[10px] flex items-center">
                <div className="relative w-12 mr-3">
                    <img src={trophyImg} alt={t('honors.trophyAlt')} />
                </div>
                <div>
                  <h3 className="text-[#777] text-[16px]">{trophy.projectName}</h3>
                  <p className="text-[#777777] text-[12px]">{trophy.organization}</p>
                  <p className="text-[#777777] text-[12px]">{trophy.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Honors;