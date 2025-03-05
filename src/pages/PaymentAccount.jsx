import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CaseDeepLogo from '../assets/casedeep-logo.svg';
import visaIcon from '../assets/payment/visa.svg';
import mastercardIcon from '../assets/payment/mastercard.svg';
import discoverIcon from '../assets/payment/discover.svg';
import amexIcon from '../assets/payment/amex.svg';
import jcbIcon from '../assets/payment/jcb.svg';
import usFlag from '../assets/flags/us.svg';
import caFlag from '../assets/flags/cn.svg';
import gbFlag from '../assets/flags/uk.svg';
import jpFlag from '../assets/flags/jp.svg';
import twFlag from '../assets/flags/tn.svg';
import { useTranslation } from 'react-i18next';

function PaymentAccount() {
  const [activeTab, setActiveTab] = useState('receiving');
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showAccountTypeDialog, setShowAccountTypeDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardType, setCardType] = useState(null);
  
  // Add these new state variables
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  
  const [billingName, setBillingName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [showBillingAddressDialog, setShowBillingAddressDialog] = useState(false);
  const [isEditing, setIsEditing] = useState({ name: false, address: false });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [stateIsOpen, setStateIsOpen] = useState(false);
  const [cityIsOpen, setCityIsOpen] = useState(false);

  const countries = [
    { code: 'US', name: 'United States', flag: usFlag },
    { code: 'CA', name: 'Canada', flag: caFlag },
    { code: 'GB', name: 'United Kingdom', flag: gbFlag },
    { code: 'JP', name: 'Japan', flag: jpFlag },
    { code: 'TW', name: 'Taiwan', flag: twFlag },
  ];

  const accountTypes = ['Savings', 'Checking'];

  const locationData = {
    'United Kingdom': {
      states: [
        'England',
        'Scotland',
        'Wales',
        'Northern Ireland'
      ],
      cities: {
        'England': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
        'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
        'Wales': ['Cardiff', 'Swansea', 'Newport', 'Bangor'],
        'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Bangor']
      }
    },
    'United States': {
      states: [
        'California',
        'New York',
        'Texas',
        'Florida'
      ],
      cities: {
        'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
        'New York': ['New York City', 'Buffalo', 'Albany', 'Rochester'],
        'Texas': ['Houston', 'Austin', 'Dallas', 'San Antonio'],
        'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville']
      }
    },
    // Add more countries as needed
  };

  // Card type detection
  useEffect(() => {
    if (!cardNumber) {
      setCardType(null);
      return;
    }

    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) {
      setCardType('visa');
    } else if (/^5[1-5]/.test(number)) {
      setCardType('mastercard');
    } else if (/^3[47]/.test(number)) {
      setCardType('amex');
    } else if (/^(6011|65)/.test(number)) {
      setCardType('discover');
    } else if (/^35/.test(number)) {
      setCardType('jcb');
    } else {
      setCardType(null);
    }
  }, [cardNumber]);

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const number = value.replace(/\s/g, '');
    const parts = [];
    for (let i = 0; i < number.length; i += 4) {
      parts.push(number.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Address Dialog Component
  const AddressDialog = ({ onClose, onSave }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [stateIsOpen, setStateIsOpen] = useState(false);
    const [cityIsOpen, setCityIsOpen] = useState(false);

    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const states = locationData[searchQuery]?.states || [];
    const cities = locationData[searchQuery]?.cities[selectedState] || [];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-black rounded-[32px] w-[380px] p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl">Address</h2>
              <button 
                onClick={onClose}
                className="text-[#666666] hover:text-[#999999]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Country Selection */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedState('');
                  setSelectedCity('');
                }}
                onClick={() => {
                  setIsOpen(true);
                  setStateIsOpen(false);
                  setCityIsOpen(false);
                }}
                placeholder="Country / Territory"
                className="w-full h-[56px] bg-[#333333] rounded-[16px] px-4 text-white placeholder-[#777777] outline-none"
              />
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#333333] rounded-[16px] max-h-[240px] overflow-y-auto z-50">
                  {filteredCountries.map(country => (
                    <button
                      key={country.code}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#00B5B5] hover:text-black transition-colors text-white"
                      onClick={() => {
                        setSearchQuery(country.name);
                        setIsOpen(false);
                      }}
                    >
                      {country.flag ? (
                        <img 
                          src={country.flag} 
                          alt={country.name} 
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-[#444444] flex items-center justify-center text-xs">
                          {country.code}
                        </span>
                      )}
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* State Selection */}
            <div className="relative">
              <div
                onClick={() => {
                  if (searchQuery) {
                    setStateIsOpen(!stateIsOpen);
                    setCityIsOpen(false);
                  }
                }}
                className="w-full h-[56px] bg-[#333333] rounded-[16px] px-4 flex items-center text-white cursor-pointer"
              >
                {selectedState || <span className="text-[#777777]">State / Province / Region</span>}
              </div>
              {stateIsOpen && states.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#333333] rounded-[16px] max-h-[240px] overflow-y-auto z-50">
                  {states.map(state => (
                    <button
                      key={state}
                      className="w-full px-4 py-3 text-left hover:bg-[#00B5B5] hover:text-black transition-colors text-white"
                      onClick={() => {
                        setSelectedState(state);
                        setSelectedCity('');
                        setStateIsOpen(false);
                      }}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City Selection */}
            <div className="relative">
              <div
                onClick={() => {
                  if (selectedState) {
                    setCityIsOpen(!cityIsOpen);
                  }
                }}
                className="w-full h-[56px] bg-[#333333] rounded-[16px] px-4 flex items-center text-white cursor-pointer"
              >
                {selectedCity || <span className="text-[#777777]">City</span>}
              </div>
              {cityIsOpen && cities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#333333] rounded-[16px] max-h-[240px] overflow-y-auto z-50">
                  {cities.map(city => (
                    <button
                      key={city}
                      className="w-full px-4 py-3 text-left hover:bg-[#00B5B5] hover:text-black transition-colors text-white"
                      onClick={() => {
                        setSelectedCity(city);
                        setCityIsOpen(false);
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Address Input */}
            <input
              type="text"
              placeholder="Address"
              className="w-full h-[56px] bg-[#00B5B5] rounded-[16px] px-4 text-black placeholder-black outline-none"
            />

            {/* Postal Code Input */}
            <input
              type="text"
              placeholder="Postal / ZIP Code"
              className="w-full h-[56px] bg-[#333333] rounded-[16px] px-4 text-[#777777] placeholder-[#777777] outline-none"
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button 
                className="px-8 py-3 rounded-full text-[#666666] hover:text-[#999999] transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="px-8 py-3 bg-[#00B5B5] text-black rounded-full hover:bg-[#00C5C5] transition-colors"
                onClick={() => {
                  onSave(`${searchQuery}, ${selectedState}, ${selectedCity}`);
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Account Type Dialog Component
  const AccountTypeDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#333333] rounded-lg overflow-hidden w-full max-w-xs mx-4">
        {accountTypes.map((type, index) => (
          <button
            key={type}
            className={`w-full p-4 text-left hover:bg-[#00c8c8] hover:text-[#000] transition-colors ${
              selectedAccountType === type ? 'text-[#00B5B5]' : 'text-white'
            }`}
            onClick={() => {
              setSelectedAccountType(type);
              setShowAccountTypeDialog(false);
            }}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );

  // Payment Methods Tab Content
  const PaymentMethodsContent = ({ FormInput }) => {
    const { t } = useTranslation();
    
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-lg mb-2">{t('paymentAccount.creditDebitCards')}</h2>
          <div className="flex gap-2 mb-2">
            <img src={visaIcon} alt="Visa" />
            <img src={mastercardIcon} alt="Mastercard" />
            <img src={discoverIcon} alt="Discover" />
            <img src={amexIcon} alt="American Express" />
            <img src={jcbIcon} alt="JCB" />
          </div>
        </div>
    
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder={t('paymentAccount.cardNumber')}
              maxLength="19"
              className="w-full bg-[#222222] rounded-lg p-4 pr-12 text-white placeholder-[#777777] outline-none"
            />
            {cardType && (
              <img
                src={
                  cardType === 'visa' ? visaIcon :
                  cardType === 'mastercard' ? mastercardIcon :
                  cardType === 'amex' ? amexIcon :
                  cardType === 'discover' ? discoverIcon :
                  cardType === 'jcb' ? jcbIcon : null
                }
                alt={cardType}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6"
              />
            )}
          </div>
    
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder={t('paymentAccount.nameOnCard')}
            className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
          />
    
          <div className="flex gap-2">
            <input
              type="text"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
              placeholder="MM / YY"
              maxLength="5"
              className="w-[275px] bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />
            <input
              type="text"
              value={cardCVC}
              onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="CVC"
              maxLength="4"
              className="w-24 bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />
          </div>
        </div>
    
        <div>
          <h2 className="text-lg mb-2">{t('paymentAccount.billingInfo')}</h2>
          <div className="space-y-2">
            <div className="w-full h-[46px] rounded-[23px] flex items-center bg-[#222222]">
              <input
                type="text"
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                placeholder="Name/Company Name"
                disabled={!isEditing.name}
                className="flex-1 h-full pl-[15px] outline-none rounded-l-[23px] bg-[#222222] text-white placeholder-[#777777]"
              />
              <button
                onClick={() => setIsEditing(prev => ({ ...prev, name: !prev.name }))}
                className={`w-[46px] h-[46px] ${
                  !isEditing.name ? 'bg-[#333333] text-[#cccccc]' : 'bg-[#00B5B5] text-black'
                } rounded-full text-[10px] hover:bg-[#555555]`}
              >
                Edit
              </button>
            </div>
    
            <div className="w-full h-[46px] rounded-[23px] flex items-center bg-[#222222]">
              <input
                type="text"
                value={billingAddress}
                placeholder="1940 W Pinnacle Peak Rd, Phoenix, AZ 85027"
                readOnly
                className="flex-1 h-full pl-[15px] outline-none rounded-l-[23px] bg-[#222222] text-white placeholder-[#777777] cursor-pointer"
                onClick={() => setShowAddressDialog(true)}
              />
              <button
                onClick={() => setShowAddressDialog(true)}
                className="w-[46px] h-[46px] bg-[#00B5B5] rounded-full text-black text-[10px] hover:bg-[#555]"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
    
        <button className="w-full bg-[#00B5B5] text-black rounded-lg p-4 font-medium hover:bg-[#00C5C5] transition-colors">
          {t('paymentAccount.save')}
        </button>
      </div>
    );
  };

  // Validation rules
  const validatePaymentForm = () => {
    const newErrors = {};
    
    if (activeTab === 'payment') {
      if (!cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardName) newErrors.cardName = 'Name on card is required';
      if (!cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      if (!cardCVC) newErrors.cardCVC = 'CVC is required';
      if (!billingName) newErrors.billingName = 'Billing name is required';
      if (!billingAddress) newErrors.billingAddress = 'Billing address is required';
    } else {
      if (!beneficiaryName) newErrors.beneficiaryName = 'Beneficiary name is required';
      if (!bankName) newErrors.bankName = 'Bank name is required';
      if (!bankAddress) newErrors.bankAddress = 'Bank address is required';
      if (!accountNumber) newErrors.accountNumber = 'Account number is required';
      if (!routingNumber) newErrors.routingNumber = 'Routing number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Show success/error message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validatePaymentForm()) {
      showMessage('error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      showMessage('success', 'Changes saved successfully');
    } catch (error) {
      showMessage('error', 'Failed to save changes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Message component
  const MessageToast = () => {
    if (!message.text) return null;
    
    return (
      <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        message.type === 'success' ? 'bg-[#00B5B5] text-black' : 'bg-[#FF4444] text-white'
      }`}>
        {message.text}
      </div>
    );
  };

  // Loading Spinner component
  const LoadingSpinner = () => (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00B5B5] border-t-transparent"></div>
    </div>
  );

  // Input with error handling
  const FormInput = ({ type = 'text', value, onChange, placeholder, error, name, ...props }) => (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e);
          setFormTouched(prev => ({ ...prev, [name]: true }));
        }}
        placeholder={placeholder}
        className={`w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none ${
          error && formTouched[name] ? 'border border-[#FF4444]' : ''
        }`}
        {...props}
      />
      {error && formTouched[name] && (
        <span className="absolute -bottom-5 left-0 text-[#FF4444] text-xs">{error}</span>
      )}
    </div>
  );

  // Enhanced button component
  const SubmitButton = ({ children }) => (
    <button
      onClick={handleSubmit}
      disabled={isLoading}
      className={`w-full py-4 rounded-lg font-medium transition-all relative ${
        isLoading
          ? 'bg-[#004444] text-[#666666] cursor-not-allowed'
          : 'bg-[#00B5B5] bg-gradient-to-b from-[#00e6e6] to-[#00b8b8] text-black hover:bg-[#00C5C5]'
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin h-5 w-5 border-2 border-[#666666] border-t-transparent rounded-full mr-2"></div>
          Saving...
        </div>
      ) : children}
    </button>
  );

  // Add this to handle address dialog save
  const handleAddressSave = (address) => {
    setBillingAddress(address);
    setShowAddressDialog(false);
  };

  return (
    <div className="min-h-screen  bg-black text-white relative">
    

      <main className="px-6 max-w-[400px] mx-auto">
        <div className="flex justify-center">
        <img src={CaseDeepLogo} alt="CASEDEEP" className='' />
        </div>
        {/* Tab Navigation */}
        <div className="flex rounded-lg bg-[#222] p-1 mb-8">
          <button
            className={`flex-1 py-3 rounded-lg transition-colors ${
              activeTab === 'payment' ? 'bg-[#333] text-[#fff]' : 'text-[#777]'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Methods
          </button>
          <button
            className={`flex-1 py-3 rounded-lg transition-colors ${
              activeTab === 'receiving' ? 'bg-[#333] text-[#fff]' : 'text-[#777]'
            }`}
            onClick={() => setActiveTab('receiving')}
          >
            Receiving Account
          </button>
        </div>

        {activeTab === 'payment' ? (
          <PaymentMethodsContent FormInput={FormInput} />
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              placeholder="Beneficiary Name"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank Name"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <input
              type="text"
              value={bankAddress}
              onChange={(e) => setBankAddress(e.target.value)}
              placeholder="Bank Address"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <input
              type="text"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              placeholder="Routing Number"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <input
              type="text"
              placeholder="Branch Name - Optional"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <div className="relative">
              <input
                type="text"
                placeholder="Account Type - Optional"
                className="w-full bg-[#222222]  rounded-lg p-4 text-white placeholder-[#777777] outline-none cursor-pointer"
                readOnly
                value={selectedAccountType}
                onClick={() => setShowAccountTypeDialog(true)}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#666666]" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6"/>
              </svg>
            </div>

            <input
              type="text"
              placeholder="SWIFT/BIC - Optional"
              className="w-full bg-[#222222] rounded-lg p-4 text-white placeholder-[#777777] outline-none"
            />

            <SubmitButton>
              Save
            </SubmitButton>
          </div>
        )}

        {showAddressDialog && (
          <AddressDialog 
            onClose={() => setShowAddressDialog(false)}
            onSave={handleAddressSave}
          />
        )}
        {showAccountTypeDialog && <AccountTypeDialog />}
        {isLoading && <LoadingSpinner />}
        <MessageToast />
      </main>
    </div>
  );
}

export default PaymentAccount;