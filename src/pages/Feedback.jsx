import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import checkImg from '../assets/submitedimg.svg'
import CaseDeepLogo from '../assets/casedeep-logo.svg';

function Feedback() {
  const { t } = useTranslation();
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [feedbackType, setFeedbackType] = useState('improvement');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAttachFile = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files].slice(0, 3)); // Limit to 3 files
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
    setShowSuccessModal(true);
  };

  const handleFileClick = (fileId) => {
    setSelectedFile(selectedFile === fileId ? null : fileId);
  };

  const openFile = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="px-6 max-w-[450px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <img src={CaseDeepLogo} alt={t('feedback.logoAlt')} />
        </div>

        {/* Feedback Type Selection */}
        <div className="relative mb-4">
          <div 
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className={`${
              document.activeElement === document.querySelector('textarea') 
                ? 'bg-[#00c8c8] text-black'
                : 'bg-[#222] text-[#555]'
            } rounded-lg cursor-pointer transition-all`}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span>
                {feedbackType === 'improvement' 
                  ? t('feedback.type.improvement') 
                  : t('feedback.type.bug')}
              </span>
              <svg 
                className={`w-4 h-4 ${
                  document.activeElement === document.querySelector('textarea')
                    ? 'text-black'
                    : 'text-[#777777]'
                } transform transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showTypeDropdown && (
            <div className="absolute w-full mt-1 bg-[#222] rounded-lg overflow-hidden z-10">
              <div 
                className={`px-4 py-3 cursor-pointer ${
                  feedbackType === 'improvement' ? 'bg-[#00c8c8] text-black' : 'text-[#00c8c8] hover:bg-[#333]'
                }`}
                onClick={() => {
                  setFeedbackType('improvement');
                  setShowTypeDropdown(false);
                }}
              >
                {t('feedback.type.improvement')}
              </div>
              <div 
                className={`px-4 py-3 cursor-pointer ${
                  feedbackType === 'bug' ? 'bg-[#00c8c8] text-black' : 'text-[#00c8c8] hover:bg-[#333]'
                }`}
                onClick={() => {
                  setFeedbackType('bug');
                  setShowTypeDropdown(false);
                }}
              >
                {t('feedback.type.bug')}
              </div>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={`rounded-lg transition-all ${
            document.activeElement === document.querySelector('textarea')
              ? 'bg-[#00c8c8]'
              : 'bg-[#222]'
          }`}>
            <textarea
              className={`w-full h-[200px] resize-none focus:outline-none bg-transparent p-4 transition-colors ${
                document.activeElement === document.querySelector('textarea')
                  ? 'text-black placeholder-black'
                  : 'text-[#777777] placeholder-[#777777]'
              }`}
              placeholder={feedbackType === 'improvement' 
                ? t('feedback.placeholder.improvement') 
                : t('feedback.placeholder.bug')}
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
            />
            
            {/* Attachments Section */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 m-1 py-2 bg-[#333333] text-[#00c8c8] rounded-lg hover:bg-[#444444] transition-colors"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  {t('feedback.attachButton')}
                </button>
                {attachments.map((file, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="flex items-center bg-[#00B5B5] rounded-lg px-3 py-2 cursor-pointer"
                      onClick={() => handleFileClick(`file-${index}`)}
                    >
                      <span className="text-black text-sm">filename filename...</span>
                      <svg 
                        className={`h-4 w-4 ml-1 text-black transform transition-transform duration-200 ${
                          selectedFile === `file-${index}` ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {selectedFile === `file-${index}` && (
                      <div className="absolute left-0 top-full mt-1 bg-[#333333] rounded-lg overflow-hidden shadow-lg z-10 min-w-[120px]">
                        <button 
                          className="w-full px-4 py-2 text-left hover:bg-[#444444] transition-colors text-sm"
                          onClick={() => openFile(file)}
                        >
                          Open
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-left text-[#777] hover:bg-[#444444] transition-colors text-sm"
                        >
                          Download
                        </button>
                        <button 
                          className="w-full px-4 py-2 text-left text-[#FF4444] hover:bg-[#444444] transition-colors text-sm"
                          onClick={() => {
                            handleRemoveAttachment(index);
                            setSelectedFile(null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg border border-[#00c8c8] flex items-center justify-center"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <span className="text-[#00c8c8] text-xl leading-none">+</span>
                </button>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleAttachFile}
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-lg mt-4 transition-all ${
              document.activeElement === document.querySelector('textarea')
                ? 'bg-gradient-to-b from-[#ffa950] to-[#ff9527] text-black hover:bg-[#FF9000]'
                : 'bg-gradient-to-b from-[#272727] to-[#1e1e1e] text-[#777777]'
            }`}
          >
            {t('feedback.submitButton')}
          </button>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-[#222] rounded-lg p-6 max-w-[400px] w-full">
              <div className="flex items-center mb-4">
                <div className="flex-2">
                  <img src={checkImg} alt={t('feedback.successImageAlt')} className='w-[70%]' />
                </div>
                <div className='flex-1'>
                  <h3 className="text-[16px] text-[#eee]">{t('feedback.successTitle')}</h3>
                  <p className="text-[#cccccc] mb-2 text-[16px]">
                    {t('feedback.successMessage')}
                  </p>
                </div>
              </div>
              <button
                className="w-full py-3 border-[#999999] border text-white rounded-full hover:bg-[#555] transition-colors"
                onClick={() => setShowSuccessModal(false)}
              >
                {t('feedback.okButton')}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Feedback;