import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.png';
import { useTranslation } from 'react-i18next';

function Quote() {
  const [user, setUser] = useState('A'); // 'A' or 'B'
  const [showCurrency, setShowCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('CAD');
  const [showExtraAmount, setShowExtraAmount] = useState(false);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [extraAmount, setExtraAmount] = useState('');
  const [newArticle, setNewArticle] = useState({ name: '', unitPrice: '', quantity: '' });
  const [items, setItems] = useState(
    user === 'B' ? [
      { id: 1, name: 'Area', unitPrice: 1000, quantity: '2 meter', total: 2000 },
      { id: 2, name: 'Paint on interior walls A1529-D21', unitPrice: 600, quantity: '125 sqm', total: 600 },
      { id: 3, name: 'Flooring', unitPrice: 10, quantity: '4 meter', total: 40 },
      { id: 4, name: 'test test test test test test test', unitPrice: 20, quantity: '21 sqm', total: 420 },
      { id: 5, name: 'Item name', unitPrice: 10, quantity: '4 meter', total: 40 },
      { id: 6, name: 'Item name', unitPrice: 5, quantity: '10 sqm', total: 50 }
    ] : []
  );
  const [extraItems, setExtraItems] = useState([]); // Separate array for extra amounts
  const [hoveredButton, setHoveredButton] = useState(null);
  const [pressedButton, setPressedButton] = useState(null);
  const [attachment, setAttachment] = useState('Optional');
  const [showAttachment, setShowAttachment] = useState(false);
  const [showAddArticleButton, setShowAddArticleButton] = useState(false);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);

  const currencies = [
    { code: 'USD', flag: '🇺🇸' },
    { code: 'CAD', flag: '🇨🇦' },
    { code: 'GBP', flag: '🇬🇧' },
    { code: 'EUR', flag: '🇪🇺' },
    { code: 'JPY', flag: '🇯🇵' },
    { code: 'TWD', flag: '🇹🇼' }
  ];

  const quoteData = {
    title: "Interior Design",
    date: "Jan 12, 2025",
    items: user === 'A' ? [
      { id: 1, name: 'Area', unitPrice: 1000, quantity: 2, total: 2000 },
      { id: 2, name: 'Paint on interior walls A1529-D21 test test', unitPrice: 600, quantity: 1, total: 600 }
    ] : [
      { id: 1, name: 'Area', unitPrice: 1000, quantity: '2 meter', total: 2000 },
      { id: 2, name: 'Paint on interior walls A1529-D21', unitPrice: 600, quantity: '125 sqm', total: 600 },
      { id: 3, name: 'Flooring', unitPrice: 10, quantity: '4 meter', total: 40 },
      { id: 4, name: 'test test test test test test test', unitPrice: 20, quantity: '21 sqm', total: 420 },
      { id: 5, name: 'Item name', unitPrice: 10, quantity: '4 meter', total: 40 },
      { id: 6, name: 'Item name', unitPrice: 5, quantity: '10 sqm', total: 50 }
    ]
  };

  // Currency conversion rates (example rates)
  const conversionRates = {
    CAD: 1,
    USD: 0.74,
    EUR: 0.68,
    GBP: 0.59,
    JPY: 111.24,
    TWD: 23.43
  };

  const handleCurrencySelect = (currency) => {
    const oldRate = conversionRates[selectedCurrency];
    const newRate = conversionRates[currency];
    
    // Update regular items
    const updatedItems = items.map(item => ({
      ...item,
      unitPrice: Number(((item.unitPrice * oldRate) / newRate).toFixed(2)),
      total: Number(((item.total * oldRate) / newRate).toFixed(2))
    }));

    // Update extra items
    const updatedExtraItems = extraItems.map(item => ({
      ...item,
      amount: Number(((item.amount * oldRate) / newRate).toFixed(2))
    }));

    setItems(updatedItems);
    setExtraItems(updatedExtraItems);
    setSelectedCurrency(currency);
    setShowCurrency(false);
  };

  const handleAddArticle = () => {
    if (newArticle.name && newArticle.unitPrice && newArticle.quantity) {
      const total = Number(newArticle.unitPrice) * Number(newArticle.quantity);
      const newItem = {
        id: items.length + 1,
        name: newArticle.name,
        unitPrice: Number(newArticle.unitPrice),
        quantity: Number(newArticle.quantity),
        total
      };
      setItems([...items, newItem]);
      setNewArticle({ name: '', unitPrice: '', quantity: '' });
      setShowAddArticle(false);
    }
  };

  const handleExtraAmount = () => {
    if (extraAmount.name && extraAmount.amount) {
      const newExtraItem = {
        id: extraItems.length + 1,
        name: extraAmount.name,
        amount: Number(extraAmount.amount)
      };
      setExtraItems([...extraItems, newExtraItem]);
      setExtraAmount({ name: '', amount: '' });
      setShowExtraAmount(false);
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    const itemsTotal = items.reduce((sum, item) => sum + item.total, 0);
    const extraTotal = extraItems.reduce((sum, item) => sum + item.amount, 0);
    return itemsTotal + extraTotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const withExtra = subtotal + Number(extraAmount || 0);
    return user === 'A' ? withExtra * 0.5 : withExtra;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment(file.name);
      setShowAttachment(false); // Close the attachment box after upload
    }
  };

  return (
    <div className="min-h-screen bg-[#000000]">
     

      <main className="px-6 max-w-[450px] mx-auto pb-[100px]">
          {/* Proposal Header */}
          <div className="bg-[#222222] rounded-lg p-1 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#333] rounded-full overflow-hidden flex items-center justify-center">
              <img src={profileImg} alt={t('quote.profileAlt')} className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-[#aaaaaa] text-[18px]">{t('quote.title')}</h1>
              <p className="text-[#aaaaaa] text-[12px]">{t('quote.date')}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="rounded-lg overflow-hidden mb-4">
          <table className="w-full">
            <thead className="text-[#777777] text-sm">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">{t('quote.item')}</th>
                <th className="py-2 px-4 text-right">{t('quote.unitPrice')}</th>
                <th className="py-2 px-4 text-right">{t('quote.quantity')}</th>
                <th className="py-2 px-4 text-right">{t('quote.total')}</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {items.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`${index % 2 === 0 ? 'bg-[#222]' : ''}`}
                >
                  <td className="py-2 px-1 text-[#555] text-[14px]">{item.id}</td>
                  <td className="py-2 px-1 text-[#ccc] text-[14px]">{item.name}</td>
                  <td className="py-2 px-1 text-[#ccc] text-[14px] text-right">{item.unitPrice}</td>
                  <td className="py-2 px-1 text-[#ccc] text-[14px] text-right">{item.quantity}</td>
                  <td className="py-2 px-1 text-[#ccc] text-[14px] text-right">{item.total}</td>
                </tr>
              ))}
              {/* Extra Items */}
              {extraItems.map((item, index) => (
                <tr 
                  key={`extra-${item.id}`} 
                  className={` ${index % 2 === 0 ? 'bg-[#222222]' : ''}`}
                >
                  <td className="py-2 px-4">{items.length + item.id}</td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4 text-right">{item.amount}</td>
                  <td className="py-2 px-4 text-right">1</td>
                  <td className="py-2 px-4 text-right">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Article and Extra Amount Section - Only show for User A */}
        {user === 'A' && (
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              {!showAddArticleForm && (
                <div 
                  className="relative"
                  onMouseEnter={() => setShowAddArticleButton(true)}
                  onMouseLeave={() => setShowAddArticleButton(false)}
                >
                  <button className="text-[#00c8c8] hover:text-[#00a0a0] transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>

                  {showAddArticleButton && (
                    <button
                      className="absolute left-0 top-0 flex items-center gap-2 text-[#00c8c8] text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap hover:bg-[#222] active:bg-[#333]"
                      onClick={() => {
                        setShowAddArticleForm(true);
                        setShowAddArticleButton(false);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {t('quote.addArticle')}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-1">
              <input
                type="number"
                className="w-full bg-[#222] text-white px-3 py-2 rounded-lg"
                placeholder="Add Extra Amount"
                value={extraAmount}
                onChange={(e) => setExtraAmount(e.target.value)}
              />
              {extraAmount && (
                <button 
                  className="text-[#777777] hover:text-white transition-colors"
                  onClick={() => setExtraAmount('')}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Add Article Form - Only show for User A */}
        {user === 'A' && showAddArticleForm && (
          <div className="bg-[#222] rounded-lg p-4 mb-4">
            <div className='gap-2 flex flex-col'>
              <div className="flex gap-1">
                <input
                  type="text"
                  className="bg-[#333] text-white px-3 py-2 rounded-lg"
                  placeholder={t('quote.itemName')}
                  value={newArticle.name}
                  onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
                />
                <input
                  type="number"
                  className="bg-[#333] text-white px-3 py-2 rounded-lg"
                  placeholder={t('quote.unitPrice')}
                  value={newArticle.unitPrice}
                  onChange={(e) => setNewArticle({ ...newArticle, unitPrice: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="bg-[#333] text-white px-3 py-2 rounded-lg"
                  placeholder={t('quote.quantity')}
                  value={newArticle.quantity}
                  onChange={(e) => setNewArticle({ ...newArticle, quantity: e.target.value })}
                />
                <button 
                  className="bg-[#00c8c8] text-black px-6 py-2 rounded-lg"
                  onClick={() => {
                    handleAddArticle();
                    setShowAddArticleForm(false);
                  }}
                >
                  {t('quote.add')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Totals */}
        <div className="bg-[#222222] rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-[#777777]">{t('quote.subtotal')}</span>
            <span className="text-white">{calculateSubtotal().toFixed(2)}</span>
          </div>
          {extraAmount > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-[#777777]">Extra Amount</span>
              <span className="text-white">+{Number(extraAmount).toFixed(2)}</span>
            </div>
          )}
          {user === 'A' && (
            <div className="flex justify-between">
              <span className="text-[#777777]">Discount</span>
              <span className="text-white">50% OFF</span>
            </div>
          )}
          <div className="flex justify-between mt-2 border-t border-[#333] pt-2">
            <span className="text-[#777777]">Total</span>
            <span className="text-white">{selectedCurrency} {calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Currency Selector */}
        <div className="relative mb-1 mt-1">
          <button 
            className="w-full bg-[#222222] rounded-lg p-4 flex items-center justify-between"
            onClick={() => setShowCurrency(!showCurrency)}
          >
            <span className="text-[#777777]">{t('quote.currency')}</span>
            <div className="flex items-center gap-2">
              <span className="text-white">{selectedCurrency}</span>
              <span>{currencies.find(c => c.code === selectedCurrency)?.flag}</span>
            </div>
          </button>
          {showCurrency && (
            <div className="absolute bottom-full left-0 w-full mb-1 bg-[#333] rounded-lg overflow-hidden shadow-lg z-10">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  className={`w-full px-4 py-3 text-left hover:bg-[#444] transition-colors flex items-center gap-2 ${
                    currency.code === selectedCurrency 
                      ? 'border border-[#00c8c8] text-[#00c8c8]' 
                      : 'text-[#777777]'
                  }`}
                  onClick={() => handleCurrencySelect(currency.code)}
                >
                  <span>{currency.flag}</span>
                  <span className='text-[20px] text-[#cccccc]'>{currency.code}</span>
                  {currency.code === selectedCurrency && (
                    <svg className="w-4 h-4 ml-auto text-[#00c8c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attachment Section - Show for both users but only allow upload for User A */}
        <div className="relative mb-4">
          <button 
            className="w-full bg-[#222222] rounded-lg p-4 flex items-center justify-between"
            onClick={() => user === 'A' && setShowAttachment(!showAttachment)}
          >
            <span className="text-[#777777]">{t('quote.attachment')}</span>
            <div className="flex items-center gap-2">
              <span className="text-[#777777]">{attachment}</span>
              {user === 'A' && (
                <svg className="w-4 h-4 text-[#777777]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          </button>
          {showAttachment && user === 'A' && (
            <div className="absolute bottom-full left-0 w-full mb-1 bg-[#333] rounded-lg overflow-hidden shadow-lg z-10">
              <div className="p-4">
                <label className="block text-[#777777] text-sm mb-2">
                  {t('quote.uploadPDF')}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-[#444] hover:bg-[#555] text-[#777777] text-sm px-4 py-2 rounded-lg inline-block transition-colors"
                >
                  {t('quote.chooseFile')}
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="">
          <button 
            className={`w-full py-3 rounded-lg transition-colors text-black ${
              user === 'A' 
                ? 'bg-gradient-to-r from-[#00e6e6] to-[#00b8b8] hover:from-[#00b5b5] hover:to-[#009090]'
                : 'bg-gradient-to-r from-[#ffa950] to-[#ff9527] hover:from-[#FF9500] hover:to-[#FF7A00]'
            }`}
          >
            {user === 'A' ? t('quote.sendQuote') : t('quote.placeOrder')}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Quote;