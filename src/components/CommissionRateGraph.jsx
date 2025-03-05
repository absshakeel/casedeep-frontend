import { useState } from "react";


function CommissionRateGraph() {
  const [selectedRate, setSelectedRate] = useState('26.5%');
  const [showChangeMessage, setShowChangeMessage] = useState(false);
  const [hoverAverage, setHoverAverage] = useState(false);
  const [hoverOpportunities, setHoverOpportunities] = useState(false);

  const rates = [
    { value: '16.5%', selected: false },
    { value: '19%', selected: false },
    { value: '21.5%', selected: true, isMaxAcceptable: true },
    { value: '24%', selected: false },
    { value: '26.5%', selected: true, isAverage: true },
    { value: '29%', selected: false },
    { value: '31.5%', selected: false },
    { value: '34%', selected: false },
    { value: '36.5%', selected: true, isMostOpportunities: true }
  ];

  return (
    <div className="relative">
      {/* Header texts positioned above their respective circles */}
      <div className="absolute left-[44%] -top-12">
        <div 
          className={`text-sm text-center transition-colors duration-200 ${
            hoverAverage ? 'text-white' : 'text-[#00c8c8]'
          }`}
          onMouseEnter={() => setHoverAverage(true)}
          onMouseLeave={() => setHoverAverage(false)}
        >
          Average<br />Deal
        </div>
      </div>
      <div className="absolute -right-[4%] -top-12">
        <div 
          className={`text-sm text-center transition-colors duration-200 ${
            hoverOpportunities ? 'text-white' : 'text-[#00FF00]'
          }`}
          onMouseEnter={() => setHoverOpportunities(true)}
          onMouseLeave={() => setHoverOpportunities(false)}
        >
          Most<br />Opportunities
        </div>
      </div>

      {/* Main rate display line */}
      <div className="flex justify-between items-center">
        {rates.map((rate, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center"
            onClick={() => {
              setSelectedRate(rate.value);
              setShowChangeMessage(true);
              setTimeout(() => setShowChangeMessage(false), 3000);
            }}
          >
            {/* Triangle indicators */}
            {(rate.isAverage || rate.isMostOpportunities) && (
              <div className={`w-0 h-0 mb-2
                border-l-[6px] border-l-transparent 
                border-r-[6px] border-r-transparent 
                border-b-[6px]
                ${rate.isMostOpportunities ? 'border-b-[#00FF00]' : 'border-b-[#00c8c8]'}
              `} />
            )}

            {/* Circle with percentage */}
            {(rate.isMaxAcceptable || rate.isAverage || rate.isMostOpportunities) ? (
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                  transition-all duration-200
                  ${selectedRate === rate.value 
                    ? rate.isMostOpportunities 
                      ? 'bg-[#00FF00] border-[#00FF00]' 
                      : rate.isAverage 
                        ? 'bg-[#00c8c8] border-[#00c8c8]'
                        : rate.isMaxAcceptable
                          ? 'bg-white border-white'
                          : 'border-white'
                    : rate.isMostOpportunities 
                      ? 'border-[#00FF00] hover:bg-[#00FF00]' 
                      : rate.isAverage 
                        ? 'border-[#00c8c8] hover:bg-[#00c8c8]'
                        : rate.isMaxAcceptable
                          ? 'border-white bg-white'
                          : 'border-white'
                  } border-2`}
              >
                <span className={`text-[12px] transition-colors duration-200 ${
                  selectedRate === rate.value || rate.isMaxAcceptable 
                    ? 'text-black' 
                    : 'text-white'
                }`}>
                  {rate.value}
                </span>
              </div>
            ) : (
              <span className="text-[#666666] text-sm">{rate.value}</span>
            )}

            {/* Bottom text */}
            {rate.isMaxAcceptable && (

              <div className="absolute -bottom-16">
              <div 
                className={`text-sm text-center transition-colors duration-200 text-[#eeeeee]'
                }`}
                onMouseEnter={() => setHoverOpportunities(true)}
                onMouseLeave={() => setHoverOpportunities(false)}
              >
              Maximum<br />
              Acceptable<br />
              Commission
              </div>
              </div>
                          
            )}
          </div>
        ))}
      </div>

      {showChangeMessage && (
        <div className="text-white text-xs mt-2">
          Changed to {selectedRate}
        </div>
      )}
    </div>
  );
}

export default CommissionRateGraph;