import { useState } from 'react';
import { Link } from 'react-router-dom';
import CommissionRateGraph from '../components/CommissionRateGraph';
import TermsAndConditions from '../components/TermsAndConditions';
import certificateLogo from '../assets/certificate.svg';
import CaseDeepLogo from '../assets/casedeep-logo.svg';
import submittedImg from '../assets/submitedimg.svg'
import congratsImg from '../assets/congratsimg.svg'

import {
  useCreateCertificationMutation,
  useUploadIdentityMutation,
  useUploadDealMutation,
  useSubmitCertificationMutation,
  useSignCertificationMutation,
  useProcessCertificationPaymentMutation,
  useSetCommissionRateMutation,
  useGetCertificationQuery
} from '../store/services/certificationApi';

function Certificate() {
  // RTK Mutations
  const [createCertification] = useCreateCertificationMutation();
  const [uploadIdentity] = useUploadIdentityMutation();
  const [uploadDeal] = useUploadDealMutation();
  const [submitCertification] = useSubmitCertificationMutation();
  const [signCertification] = useSignCertificationMutation();
  const [processCertificationPayment] = useProcessCertificationPaymentMutation();
  const [setCommissionRate] = useSetCommissionRateMutation();

  // Combined states
  const [currentStep, setCurrentStep] = useState(1);
  const [identityDocs, setIdentityDocs] = useState([]);
  const [dealDocs, setDealDocs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [userName, setUserName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [certificationId, setCertificationId] = useState(null);

  // File handling functions
  const handleFileUpload = async (fileList, setFiles, maxFiles = 20, isIdentity = true) => {
    const currentFiles = setFiles.length;
    const remainingSlots = maxFiles - currentFiles;

    if (remainingSlots <= 0) {
      alert(`Maximum ${maxFiles} documents can be uploaded`);
      return;
    }

    const newFiles = Array.from(fileList).slice(0, remainingSlots).map(file => ({
      name: file.name,
      file: file
    }));

    // Upload files to server
    try {
      const formData = new FormData();
      newFiles.forEach(file => formData.append('files', file.file));

      if (isIdentity) {
        await uploadIdentity({ cenobase62: certificationId, formData });
      } else {
        await uploadDeal({ cenobase62: certificationId, formData });
      }

      setFiles(prev => [...prev, ...newFiles]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  const removeFile = (index, files, setFiles) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const openFile = (file) => {
    const url = URL.createObjectURL(file.file);
    window.open(url, '_blank');
  };

  const handleFileClick = (fileId) => {
    setSelectedFile(selectedFile === fileId ? null : fileId);
  };

  const canSubmit = dealDocs.length >= 2 && identityDocs.length >= 1;

  const handleSubmit = async () => {
    if (canSubmit) {
      try {
        // Create certification first
        const result = await createCertification().unwrap();
        setCertificationId(result.cenobase62);

        // Submit the certification
        await submitCertification(result.cenobase62);

        setCurrentStep(2);
      } catch (error) {
        console.error('Error submitting certification:', error);
        alert('Failed to submit certification. Please try again.');
      }
    }
  };

  const handlePayment = async () => {
    if (!certificationId) return;

    try {
      await processCertificationPayment({
        cenobase62: certificationId,
        amount: 250 // or 1000 for business users
      });
      setCurrentStep(4);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleSignTerms = async () => {
    if (!certificationId || !userName) return;

    try {
      await signCertification({
        cenobase62: certificationId,
        signname: userName
      });
      setCurrentStep(5);
    } catch (error) {
      console.error('Error signing terms:', error);
      alert('Failed to sign terms. Please try again.');
    }
  };

  const handleCommissionRateChange = async (rate) => {
    if (!certificationId) return;

    try {
      await setCommissionRate({
        cenobase62: certificationId,
        rate: rate
      });
    } catch (error) {
      console.error('Error updating commission rate:', error);
      alert('Failed to update commission rate. Please try again.');
    }
  };

  return (
    <div className="min-h-screen text-white"
    style={{
      backgroundImage: 'radial-gradient(circle at 50% 0%, #00252a, #000e10 22%, #000 29%)'
    }}>


    <main className="px-6 mt-4 max-w-[450px] mx-auto">
    {/* Step 1: Initial Application */}
    <div className={`transition-all duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
    <div className="flex justify-center mb-2">
    <img src={CaseDeepLogo} alt="CaseDeep" />
    </div>

    <div className="mb-8">
    <h1 className="text-[#00c8c8] text-[16px] font-light mb-4">CASE Certificate Application</h1>
    <p className="text-[#cccccc] text-[14px] font-light mb-4">
    Note: Your initial rating will be determined by the quality of your portfolio and the number of valid
    successful case proofs you provide.
    </p>
    <ol className="list-decimal list-inside text-[#cccccc] text-[12px] font-light space-y-2">
    <li>Ensure that you have at least 4 high-quality portfolios in your Showcase before applying for certification. This will improve your initial rating.</li>
    <li>The more successful case proofs you provide, the higher your initial rating will be.</li>
    </ol>
    </div>

    {/* Identity Document Section */}
    <div className="bg-[#222222] rounded-lg p-6 mb-4">
    <div className="flex items-start gap-6 mb-8">
    <div className="w-12 h-12 rounded-full bg-[#555555] flex items-center justify-center flex-shrink-0">
    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    </div>
    <div>
    <h2 className="text-[#aaaaaa] text-[20px] font-light mb-4">Proof of Identity Document</h2>
    <p className="text-[#777777] text-[12px] font-light leading-relaxed mb-2">
    We accept a photocopy of any one of the following 2 types of documents. You must ensure the authenticity
    of the provided documents and assume legal responsibility for them:
    </p>
    <p className="text-[#777777] text-[16px] font-light">US Drivers License / Passport</p>
    </div>
    </div>

    <div className="space-y-4">
    {identityDocs.map((doc, index) => (
    <div key={index} className="relative">
    <div
    className="flex items-center bg-[#00c8c8] rounded-lg p-4 cursor-pointer"
    onClick={() => handleFileClick(`identity-${index}`)}
    >
    <span className="flex-1 text-black text-lg">{doc.name}</span>
    <svg
    className={`h-5 w-5 text-black transform transition-transform duration-200 ${
      selectedFile === `identity-${index}` ? 'rotate-180' : ''
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
    </div>
    {selectedFile === `identity-${index}` && (
    <div className="absolute right-3 top-full mt-1 bg-[#333333] rounded-lg overflow-hidden shadow-lg z-10">
    <button
    className="w-full px-6 py-2 text-left text-[#00c8c8] hover:bg-[#444444] transition-colors"
    onClick={() => openFile(doc)}
    >
    Open
    </button>
    <button
    className="w-full px-6 py-2 text-left text-[#00c8c8] hover:bg-[#444444] transition-colors"
    >
    Download
    </button>
    <button
    className="w-full px-6 py-2 text-left text-[#FF4444] hover:bg-[#444444] transition-colors"
    onClick={() => {
      removeFile(index, identityDocs, setIdentityDocs);
      setSelectedFile(null);
    }}
    >
    Remove
    </button>
    </div>
    )}
    </div>
    ))}

    <div className="mt-4">
    <div
    className="bg-[#333333] rounded-lg p-4 text-center cursor-pointer hover:bg-[#444444] transition-colors"
    onClick={() => document.getElementById('identityUpload').click()}
    >
    <div className="flex items-center justify-center gap-2">
    <div className="w-6 h-6 rounded-full border border-[#00c8c8] flex items-center justify-center">
    <span className="text-[#00c8c8] text-xl leading-none">+</span>
    </div>
    <span className="text-[#00c8c8]">Upload</span>
    </div>
    <input
    id="identityUpload"
    type="file"
    className="hidden"
    accept=".pdf"
    multiple
    onChange={(e) => handleFileUpload(e.target.files, setIdentityDocs, 20)}
    />
    </div>
    </div>
    </div>
    </div>

    {/* Deal Documents Section */}
    <div className="bg-[#222222] rounded-lg p-6">
    <div className="flex items-start gap-6 mb-8">
    <div className="w-12 h-12 rounded-full bg-[#555555] flex items-center justify-center flex-shrink-0">
    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    </div>
    <div>
    <h2 className="text-[#aaaaaa] text-[20px] font-light mb-4">Proof of 2 successful deals</h2>
    <p className="text-[#777777] text-[12px] font-light leading-relaxed mb-2">
    We accept a photocopy of any one of the following 4 types of documents. You must ensure the authenticity
    of the provided documents and assume legal responsibility for them:
    </p>
    <p className="text-[#777777] text-[16px] font-light">Contract with Signature / Invoice / Receipt / Quotation</p>
    </div>
    </div>

    <div className="space-y-4">
    {dealDocs.map((doc, index) => (
    <div key={index} className="relative">
    <div
    className="flex items-center bg-[#00c8c8] rounded-lg p-4 cursor-pointer"
    onClick={() => handleFileClick(`deal-${index}`)}
    >
    <span className="flex-1 text-black text-lg">{doc.name}</span>
    <svg
    className={`h-5 w-5 text-black transform transition-transform duration-200 ${
      selectedFile === `deal-${index}` ? 'rotate-180' : ''
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
    </div>
    {selectedFile === `deal-${index}` && (
    <div className="absolute right-3 top-full mt-1 bg-[#333333] rounded-lg overflow-hidden shadow-lg z-10">
    <button
    className="w-full px-6 py-2 text-left text-[#00c8c8] hover:bg-[#444444] transition-colors"
    onClick={() => openFile(doc)}
    >
    Open
    </button>
    <button
    className="w-full px-6 py-2 text-left text-[#00c8c8] hover:bg-[#444444] transition-colors"
    >
    Download
    </button>
    <button
    className="w-full px-6 py-2 text-left text-[#FF4444] hover:bg-[#444444] transition-colors"
    onClick={() => {
      removeFile(index, dealDocs, setDealDocs);
      setSelectedFile(null);
    }}
    >
    Remove
    </button>
    </div>
    )}
    </div>
    ))}

    <div className="mt-4">
    <div
    className="bg-[#333333] rounded-lg p-4 text-center cursor-pointer hover:bg-[#444444] transition-colors"
    onClick={() => document.getElementById('dealUpload').click()}
    >
    <div className="flex items-center justify-center gap-2">
    <div className="w-6 h-6 rounded-full border border-[#00c8c8] flex items-center justify-center">
    <span className="text-[#00c8c8] text-xl leading-none">+</span>
    </div>
    <span className="text-[#00c8c8]">Upload</span>
    </div>
    <input
    id="dealUpload"
    type="file"
    className="hidden"
    accept=".pdf"
    multiple
    onChange={(e) => handleFileUpload(e.target.files, setDealDocs, 20)}
    />
    </div>
    </div>
    </div>
    </div>

    <button
    onClick={handleSubmit}
    className={`w-full py-4 rounded-lg mt-8 ${
      canSubmit
      ? 'bg-[#FFB800] hover:bg-[#FFC833] text-black'
      : 'bg-[#333333] text-[#666666] cursor-not-allowed'
    } transition-colors`}
    disabled={!canSubmit}
    >
    Submit Application
    </button>
    </div>

    {/* Step 2: Application Submitted */}
    <div className={`transition-all duration-300 ${currentStep === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
    <div className="text-center mb-12">
    <div className="flex items-center justify-center mx-auto mb-5">
    <img src={submittedImg} alt="" />
    </div>
    <h2 className="text-[#eee] text-[20px] font-light mb-4">Your information has been submitted</h2>
    <p className="text-[#cccccc] text-[16px] font-light max-w-2xl mx-auto">
    Your application is under review, typically taking 1-3 business days. Once approved, a wheat sheaf
    will appear around your profile picture, and your ranking information will be displayed on this page.
    If your application is not approved, the page will revert to its pre-application state. We will also
    send the results to you via email.
    </p>
    </div>
    </div>

    {/* Step 3: Approved */}
    <div className={`transition-all duration-300 ${currentStep === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
    <div className="text-center">
    <div className="flex items-center justify-center mx-auto mb-5">
    <img src={congratsImg} alt="" />
    </div>

    <h2 className="text-[30px] text-[#eee]">Congratulations!</h2>
    <p className="text-[18px] text-[#eee]">You have earned the CASE Certification!</p>
    <p className="text-[16px] text-[#ccc] font-light mb-4">
    This gives your business the opportunity to be<br />
    featured on the Top Picks ranking page.<br />
    Start setting up your ad commission now!
    </p>

    <div className="flex flex-col items-center mb-4">
    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-[#666666] mb-8" />

    <p className="text-[16px] text-[#ccc]">Regular Certification Fee</p>
    <p className="text-[16px] text-[#ccc]">Personal User: $250 per person</p>
    <p className="text-[16px] text-[#ccc]">Business User: $1,000 per company</p>
    <p className="text-[12px] text-[#777] mb-2">
    If you have a invite code from the official source,<br />
    you will be exempt from this certification fee.
    </p>

    <div className="w-full md:w-[60%] max-w-md space-y-2">
    <div className="relative">
    <input
    type="text"
    value={inviteCode}
    onChange={(e) => setInviteCode(e.target.value)}
    placeholder="invite code"
    className="w-full bg-transparent text-white placeholder-[#777] outline-none border border-[#333333] rounded-lg p-2 text-[14px]"
    />
    {inviteCode && (
    <div className="absolute right-4 top-1/2 -translate-y-1/2">
    <svg className="w-6 h-6 text-[#00bb55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    </div>
    )}
    </div>

    <button
    onClick={() => setCurrentStep(4)}
    className="w-full py-2 bg-[#ff9527] text-black rounded-lg hover:bg-[#FFC833] transition-colors text-[14px]"
    >
    Pay Now
    </button>
    </div>
    </div>

    <div className="w-full max-w-md mx-auto">
    <button
    onClick={() => setShowTerms(true)}
    className={`w-full py-2 rounded-lg text-[18px] ${
      inviteCode ? 'bg-[#ff9527] text-black hover:bg-[#ff9527]' : 'bg-[#222222] text-[#444444] cursor-not-allowed'
    } transition-colors`}
    disabled={!inviteCode}
    >
    View Terms and Conditions
    </button>
    </div>
    </div>
    </div>

    {/* Step 4: Terms and Conditions */}
    <div className={`transition-all duration-300 ${currentStep === 4 ? 'opacity-100' : 'opacity-0 hidden'}`}>
    <div className="max-w-2xl mx-auto">
    <h2 className="text-[14px] font-light mb-2">CASE PROMOTIONAL TERMS AND CONDITIONS</h2>
    <div className="bg-[#222222] rounded-lg p-6 mb-6 h-[372px] overflow-y-auto">
    <div className="space-y-4 text-[#cccccc]">
    <section className='text-[#aaa] text-[12px]'>
    <p>
    Purpose and Scope
    CASEDEEP requires all users participating in the CASE Promotional Plan to agree to the CASE Promotional Terms and Conditions online. These terms apply to all users who meet the CASE certification requirements and may be revised periodically in accordance with the CASE Promotional Terms and Conditions.

    Obligations of Users
    </p>
    <p>
    1. Respond to client inquiries promptly, ideally within 6 hours, and provide a quotation within 3 business days at the latest.

    </p>
    <p>
    2. If no transaction occurs, CASEDEEP will not charge any promotional fees. For successful transactions, users must remit the applicable promotional commission within 3 business days of receiving the client’s initial payment. In case of order cancellation with sufficient proof, the promotional commission will be fully refunded.

    </p>
    <p>
    3. Avoid delays in promotional commission payments; any delay beyond 3 business days will incur a late fee of 1% per day.

    </p>
    <p>
    4. The service quotes provided by users must include promotional commission to ensure that their original income is not reduced.

    </p>
    <p>
    5. It is strictly prohibited to include information that directs clients to conduct communication or transactions through channels outside the CASEDEEP in chats, calls, profile pages, videos, portfolios, or other platform-related content.

    </p>
    <p>
    6. Users must ensure all materials, works, and services provided are genuine and do not infringe on any third party’s intellectual property rights or other legal rights. In case of infringement, the user will be held accountable, and CASEDEEP reserves the right to terminate the partnership.

    </p>
    <p>
    7. Users must not interfere with the normal operation of the CASEDEEP, including manipulating reviews, falsifying transaction records, or abusing promotional campaigns.

    </p>
    <p>
    8. Users must not disseminate defamatory or malicious statements about CASEDEEP or other users. Violation may result in legal action and termination of the partnership.

    </p>
    <p>
    9. After completing transactions, users are obligated to provide agreed-upon after-sales support. Failure to do so may result in complaints and platform-imposed penalties, including deduction of deposits or reduced credit ratings.

    </p>

    <p>
    Consequences of Violations
    Violation of any of the above terms will result in CASEDEEP issuing a warning and may lead to the cancellation of the user’s participation in the promotional plan or revocation of CASE certification.</p>
    </section>
    {/* Add more terms sections as needed */}
    </div>
    </div>

    <div className="mb-6">
    <p className="text-[#cccccc] mb-2">Please enter your name to sign and confirm your agreement to the Terms of Service:</p>
    <input
    type="text"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
    placeholder="e.g., Johnathan Walker"
    className="w-full bg-[#333333] rounded p-4 text-white placeholder-[#666666] outline-none"
    />
    <p className="text-[#FF4444] text-sm mt-1">Please enter your full name exactly as registered.</p>
    </div>

    <div className="space-y-4">

    <button
    onClick={() => setCurrentStep(5)}
    className="w-full py-4 bg-[#FFB800] text-black rounded-lg hover:bg-[#FFC833] transition-colors"
    >
    Agree to Terms and Conditions
    </button>
    </div>
    </div>
    </div>

    {/* Step 5: Commission Rate Setting */}
    <div className={`transition-all duration-300 ${currentStep === 5 ? 'opacity-100' : 'opacity-0 hidden'}`}>
    <div className="flex flex-col items-center text-center mb-12">
    <div className="relative w-32 h-32 mb-2">
    <img src={certificateLogo} alt="CASE" className="w-full" />
    </div>
    <div className="text-[#cccccc] text-[20px] mb-2">You are currently Certification Ranking on the Top Picks ranking page.</div>

    <div className="text-[#cccccc] text-[42px] font-light">12th</div>
    <div className="text-[#ccc] text-[12px]">Maximum Acceptable Commission: 21.5%</div>
    <div className="text-[#aaa] text-[12px]"> By combining your overall rating with a higher commission rate,
    you will achieve a higher ranking, increasing your chances of
    gaining more business opportunities</div>

    </div>

    {/* Commission Rate Graph */}
    <div className=" rounded-lg py-10 mb-8">
    
    <CommissionRateGraph />
    
    </div>

    {/* Info Box */}
    <div className="bg-[#00252a] rounded-lg p-4 mb-8">
    <p className="text-[#00aaaa] text-[10px] text-center">
    Your ranking is based on your rating and the ad commission you set.<br />
    When dealing with the same client again, the commission rate<br />
    will decrease incrementally, down to a minimum of 6.5%
    </p>
    </div>

    {/* Action Buttons */}
    <div className="space-y-4">
    <button
    className="w-full py-4 bg-[#333333] text-[#aaa] rounded-lg hover:bg-[#444444] transition-colors"
    onClick={() => setShowTerms(true)}
    >
    Signed Terms and Conditions
    </button>
    <button
    className="w-full py-4 bg-[#333333] text-[#aaa] rounded-lg hover:bg-[#444444] transition-colors"
    >
    View Ranking Rules
    </button>
    </div>
    </div>

    {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
    </main>
    </div>
    );
    }

    export default Certificate;
    