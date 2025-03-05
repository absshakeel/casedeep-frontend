import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trump from '../assets/trump.png';
import flagtw from '../assets/flags/ny.svg'
import starImg from '../assets/star.svg'
import avatarCircle from '../assets/avatar-circle.svg'
import { useTranslation } from 'react-i18next';

function Rating() {
  const { t } = useTranslation();
  const [userType, setUserType] = useState('A'); // 'A' or 'B'

  const systemScores = {
    completionRate: { value: 97, weight: 50 },
    repeatOrderRate: { value: 25, weight: 10 },
    bidSuccessRate: { value: 50, weight: 10 },
  };

  const userRatings = {
    A: {
      contractualSpirit: { value: 8.5, weight: 10 },
      professionalLevel: { value: 6.0, weight: 10 },
      levelOfCooperation: { value: 7.5, weight: 10 },
      totalScore: 7.5,
    },
    B: {
      contractualSpirit: { value: 9.7, weight: 10 },
      clientStandards: { value: 8.9, weight: 10 },
      levelOfNegotiation: { value: 8.0, weight: 10 },
      totalScore: 8.2,
    }
  };

  const contributionScores = {
    A: {
      honors: { value: 68, total: 100, weight: 10 },
      invites: { value: 29, total: 100, weight: 10 },
      disputeVote: { value: 0, total: 100, weight: 10, available: false },
    },
    B: {
      honors: { value: 999, total: 100, weight: 10 },
      invites: { value: 1200, total: 100, weight: 10 },
      disputeVote: { value: 0, total: 100, weight: 10, available: false },
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="px-6 max-w-[400px] mx-auto">
        {/* Profile Section */}
        <div className="flex items-center gap-1 mb-2">
          <div className="relative w-[120px] h-[120px]">
            <img 
              src={trump} 
              alt={t('rating.profileAlt')}
              className="w-[80%] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute inset-0 "
                 style={{
                   background: `url(${avatarCircle}) no-repeat center center`,
                   backgroundSize: '100% 100%',
                   pointerEvents: 'none'
                 }}>
            </div>
            <div className="absolute bottom-[15%] right-[15%] w-4 h-4 bg-green-500 rounded-full border-2 border-black z-10"></div>
          </div>
          <div>
            <h1 className="text-[18px] text-[#eeeeee] font-medium">{t('rating.companyName')}</h1>
            <p className="text-[#eeeeee] text-[14px]">{t('rating.jobTitle')}</p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-[#eeeeee] text-[18px]">7.5</span>
              <span className="text-[#777777] text-[14px]">(299)</span>
              <img src={flagtw} alt={t('rating.flagAlt')} className="w-5 h-5 rounded-full ml-2" />
              <span className="text-[#777777] text-[12px]">{t('rating.location')}</span>
            </div>
          </div>
        </div>

        {/* System Score Section */}
        <div className="mb-2">
          <h2 className="text-[#777777] text-[12px] mb-1">{t('rating.systemScore')}</h2>
          <div className="space-y-1">
            {Object.entries(systemScores).map(([key, { value, weight }]) => (
              <div key={key} className="bg-gradient-to-b from-[#fff] to-[#ccc] rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={starImg} alt="Star" className="" />
                    <span className="text-[#000] text-[18px]">{value}%</span>
                    <span className="text-[#000] text-[16px] capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <span className="text-[#333] text-[12px]">Weight {weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Rating Section */}
        <div className="mb-2">
          <h2 className="text-[#777777] text-[12px] mb-1">{t('rating.userRating')}</h2>

          <div className="space-y-1">
            {Object.entries(userType === 'A' ? userRatings.A : userRatings.B)
              .filter(([key]) => key !== 'totalScore')
              .map(([key, { value, weight }]) => (
                <div key={key} className={`rounded-lg p-4 ${userType === 'A' ? 'bg-gradient-to-b from-[#00e6e6] to-[#00b8b8] ' : 'bg-gradient-to-b from-[#ffa950] to-[#ff9527] '}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-[#000] text-[18px]">{value}</span>
                      <span className="text-[#000] text-[16px] capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <span className="text-[#333] text-[12px]">Weight {weight}%</span>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Contribution Score Section */}
        <div className="mb-2">
          <h2 className="text-[#777777] text-[12px] mb-1">{t('rating.contributionScore')}</h2>
          <div className="space-y-1">
            {Object.entries(userType === 'A' ? contributionScores.A : contributionScores.B).map(([key, { value, total, weight, available }]) => (
              <div key={key} className="bg-gradient-to-b from-[#454545] to-[#333333] rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img src={starImg} alt="Star"  />
                    <span className="text-white text-[18px]">{value}<span className="text-[10px]">/{total}</span></span>
                    <span className="text-[#fff] text-[16px] capitalize">{key}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[#ccc] text-[12px]">Weight {weight}%</div>
                    
                  </div>
                  
                </div>
                {available === false && (
                      <div className="text-[#ccc] ml-3  text-[12px]">Not Available</div>
                    )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Rating;