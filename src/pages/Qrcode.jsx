import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import CaseDeepLogo from '../assets/casedeep-logo.svg';
import { useTranslation } from 'react-i18next';

function Qrcode() {
  const { t } = useTranslation();
  const [qrColor, setQrColor] = useState('white');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const svg = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      // Add text
      ctx.fillStyle = qrColor === 'white' ? 'black' : 'white';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CASE', canvas.width/2, canvas.height/2);
      
      const a = document.createElement("a");
      a.download = "qr-code.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };
  const socialLinks = [
    { name: t('qrcode.social.twitter'), url: '#' },
    { name: t('qrcode.social.linkedin'), url: '#' },
    { name: t('qrcode.social.facebook'), url: '#' },
    { name: t('qrcode.social.instagram'), url: '#' },
    { name: t('qrcode.social.whatsapp'), url: '#' },
    { name: t('qrcode.social.line'), url: '#' }
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #00252a, #000e10 22%, #000 29%)' }}>
      <main className="px-6 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <img src={CaseDeepLogo} alt={t('qrcode.logoAlt')} className="" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
          <div className="w-full md:w-1/2">
            <div className="flex gap-2 mb-4">
              <button 
                className={`flex-1 py-2 text-[16px] rounded-md ${qrColor === 'white' ? 'bg-[#333]' : 'bg-[#222]'}`}
                onClick={() => setQrColor('white')}
              >
                {t('qrcode.white')}
              </button>
              <button 
                className={`flex-1 py-2 text-[16px] rounded-md ${qrColor === 'black' ? 'bg-[#333]' : 'bg-[#222]'}`}
                onClick={() => setQrColor('black')}
              >
                {t('qrcode.black')}
              </button>
            </div>

            <div className={`p-4 rounded-lg ${qrColor === 'white' ? 'bg-white' : 'bg-black'} relative`}>
              <div className="relative aspect-square">
                <QRCodeSVG
                  value="https://your-url-here.com"
                  size={256}
                  bgColor={qrColor === 'white' ? '#FFFFFF' : '#000000'}
                  fgColor={qrColor === 'white' ? '#000000' : '#FFFFFF'}
                  level="Q"
                  includeMargin={false}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    style={{
                      color: qrColor === 'white' ? 'black' : 'white',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '24px',
                      fontWeight: '500',
                      letterSpacing: '0.5em',
                      paddingLeft: '0.5em',
                      textTransform: 'uppercase',
                      background: qrColor === 'white' ? 'white' : 'black',
                      padding: '0 10px',
                      lineHeight: '1'
                    }}
                  >
                    Case
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button 
                onClick={handleDownload}
                className="w-full py-3 bg-gradient-to-b from-[#272727] to-[#1e1e1e] text-[#aaa] rounded-lg hover:bg-[#444] transition-colors"
              >
                {t('qrcode.download')}
              </button>
              <button 
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="w-full py-3 bg-gradient-to-b from-[#272727] to-[#1e1e1e] text-[#aaa] rounded-lg hover:bg-[#444] transition-colors"
              >
                {t('qrcode.share')}
              </button>
            </div>
          </div>

          {showShareOptions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#333333] rounded-lg w-full max-w-xs">
                <div className="flex justify-between items-center p-4 border-b border-[#222]">
                  <h3 className="text-lg">{t('qrcode.shareTo')}</h3>
                  <button 
                    onClick={() => setShowShareOptions(false)}
                    className="text-[#666666] hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block px-4 py-3 text-[14px] text-[#999] hover:text-[#eee] hover:bg-[#3d3d3d] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Qrcode;