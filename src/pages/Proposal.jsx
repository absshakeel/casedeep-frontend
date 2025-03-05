import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.png';
import { useTranslation } from 'react-i18next';

function Proposal() {
  const { t } = useTranslation();
  const [showActions, setShowActions] = useState(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowActions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const proposal = {
    title: "Interior Design",
    date: "Jan 12, 2025",
    description: `We would like to renovate our living room and dining room with a modern design. The living room should have an open-plan layout with minimalist furniture, light-colored walls, and wooden flooring to create a spacious feel. Ample storage is needed while keeping the design clean and stylish. The dining area should feature a round table with contemporary chairs, and we test test test test`,
    attachments: [
      {
        type: 'link',
        name: 'Link name',
        url: 'https://link.address'
      },
      {
        type: 'file',
        name: 'filename.pdf',
        url: 'https://www.africau.edu/images/default/sample.pdf'
      },
      {
        type: 'video',
        name: 'Project Video',
        url: 'https://www.youtube.com/watch?v=BW6hxlThB_o',
        thumbnailUrl: 'https://img.youtube.com/vi/BW6hxlThB_o/maxresdefault.jpg'
      },
      {
        type: 'image',
        name: 'Design Reference',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800',
      }
    ],
    details: {
      area: '90 sqm',
      decoratingStyle: 'Scandinavian Style',
      constructionProject: 'Decision after further discussion',
      projectScale: '50 pcs',
      paymentMethod: 'Full Payment',
      deliveryDate: 'July 5, 2025'
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleDownload = (file) => {
    window.open(file.url, '_blank');
  };

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <main className="px-6 max-w-[450px] mx-auto pb-[100px]">
        {/* Proposal Header */}
        <div className="bg-[#222222] rounded-lg p-1 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#333] rounded-full overflow-hidden flex items-center justify-center">
              <img src={profileImg} alt={t('proposal.profileAlt')} className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-[#aaaaaa] text-[18px]">{proposal.title}</h1>
              <p className="text-[#aaaaaa] text-[12px]">{proposal.date}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#ccc] text-[16px]">
            {proposal.description}
          </p>
          <button className="text-[#eee] mb-2">{t('proposal.readMore')}</button>
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <h3 className="text-[#777777] text-base mb-2">{t('proposal.attachReferences')}</h3>
          <div className="space-y-2">
            {proposal.attachments.map((attachment, index) => (
              <div key={index}>
                {attachment.type === 'video' ? (
                  <div className="bg-[#222] rounded-lg overflow-hidden">
                    <div className="relative aspect-video">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/BW6hxlThB_o`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ) : attachment.type === 'image' ? (
                  <div className="bg-[#222] rounded-lg overflow-hidden">
                    <img 
                      src={attachment.url} 
                      alt={attachment.name}
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <div className="dropdown-container relative">
                    <div 
                      className="bg-[#00c8c8] rounded-lg px-4 py-1.5 flex items-center justify-between cursor-pointer"
                      onClick={() => setShowActions(showActions === index ? null : index)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {attachment.type === 'link' ? (
                          <>
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="text-black text-base">{attachment.name}</span>
                            <span className="text-black text-base ml-4">{attachment.url}</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="text-black text-base">{attachment.name}</span>
                          </>
                        )}
                      </div>
                      <svg 
                        className={`w-5 h-5 text-black transition-transform ${
                          showActions === index ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {showActions === index && (
                      <div className="absolute right-0 mt-1 bg-[#333] rounded-lg overflow-hidden shadow-lg z-10">
                        <div className="w-[100px]">
                          <button 
                            className="w-full px-4 py-2 text-left text-[#777777] hover:bg-[#444] transition-colors text-sm block"
                            onClick={() => window.open(attachment.url, '_blank')}
                          >
                            Open
                          </button>
                          {attachment.type === 'link' && (
                            <button 
                              className="w-full px-4 py-2 text-left text-[#777777] hover:bg-[#444] transition-colors text-sm block"
                              onClick={() => navigator.clipboard.writeText(attachment.url)}
                            >
                              Copy
                            </button>
                          )}
                          {attachment.type === 'file' && (
                            <button 
                              className="w-full px-4 py-2 text-left text-[#777777] hover:bg-[#444] transition-colors text-sm block"
                              onClick={() => window.open(attachment.url, '_blank')}
                            >
                              Download
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-2">
          <div>
            <h3 className="text-[#777777] text-[14px]">{t('proposal.area')}</h3>
            <p className="text-white text-[14px]">{proposal.details.area}</p>
          </div>
          <div>
            <h3 className="text-[#777777] text-[14px]">{t('proposal.decoratingStyle')}</h3>
            <p className="text-white text-[14px]">{proposal.details.decoratingStyle}</p>
          </div>
          <div>
            <h3 className="text-[#777777] text-[14px]">{t('proposal.constructionProject')}</h3>
            <p className="text-white text-[14px]">{proposal.details.constructionProject}</p>
          </div>
          <div>
            <h3 className="text-[#777777] text-[14px]">{t('proposal.projectScale')}</h3>
            <p className="text-white text-[14px]">{proposal.details.projectScale}</p>
          </div>
          <div>
            <h3 className="text-[#777777] text-[14px]">{t('proposal.paymentMethod')}</h3>
            <p className="text-white text-[14px]">{proposal.details.paymentMethod}</p>
          </div>
          <div>
            <h3 className="text-[#777777] text-[14px]">{t('proposal.deliveryDate')}</h3>
            <p className="text-white text-[14px]">{proposal.details.deliveryDate}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 mt-2 bg-black">
          <div className="max-w-[450px] mx-auto flex gap-4">
            <button className="flex-1 bg-[#00c8c8] text-black py-2 rounded-lg hover:bg-[#00A0A0] transition-colors">
              {t('proposal.sendQuote')}
            </button>
            <button className="flex-1 bg-[#ff9527] text-black py-2 rounded-lg hover:bg-[#FFA500] transition-colors">
              {t('proposal.acceptOrder')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Proposal;