import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CaseDeepLogo from '../assets/casedeep-logo.svg';
import { useTranslation } from 'react-i18next';

function Signature() {
  const { t } = useTranslation();
  const [signature, setSignature] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  
  const fileInputRef = useRef(null);
  const cropAreaRef = useRef(null);
  const imageRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignature(e.target.result);
        setIsCropping(true);
        setPosition({ x: 0, y: 0 });
        setScale(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    // Add bounds checking here if needed
    setPosition({
      x: newX,
      y: newY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(2, prev + 0.1));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.1));
  };

  const handleExtract = async () => {
    if (!cropAreaRef.current || !signature) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Get the crop area dimensions
        const cropArea = cropAreaRef.current.getBoundingClientRect();
        
        // Set canvas size to match the visible area (inside green guides)
        canvas.width = cropArea.width - 32; // Subtract padding (16px each side)
        canvas.height = cropArea.height - 32; // Subtract padding (16px each side)

        // Clear the canvas with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the image with current position and scale
        ctx.save();
        
        // Center the context to the middle of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Apply the current position offset
        ctx.translate(position.x, position.y);
        
        // Apply the current scale
        ctx.scale(scale, scale);
        
        // Center the image
        ctx.translate(-img.width / 2, -img.height / 2);
        
        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        ctx.restore();

        // Get the cropped image
        const croppedImage = canvas.toDataURL('image/png');
        setSignature(croppedImage);
        setIsCropping(false);
        setPosition({ x: 0, y: 0 });
        setScale(1);
      };

      img.src = signature;
    } catch (error) {
      console.error('Error extracting signature:', error);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #00252a, #000e10 22%, #000 29%)' }}>
      <main className="px-6">
        <div className="flex justify-center mb-12">
          <img src={CaseDeepLogo} alt={t('signature.logoAlt')} />
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-center text-[#ccc] text-[16px] mb-8 font-light">
            {t('signature.instruction')}
          </p>

          {!isCropping ? (
            <div className="flex flex-col gap-6">
              <div className="aspect-[2/1] bg-white rounded-lg flex items-center justify-center">
                {signature && (
                  <img 
                    src={signature} 
                    alt="Signature" 
                    className="max-h-full max-w-full object-contain p-4"
                  />
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 bg-gradient-to-b from-[#272727] to-[#1e1e1e] text-[#aaa] rounded-lg hover:bg-[#2a2a2a] transition-colors"
              >
                {t('signature.uploadButton')}
              </button>
            </div>
          ) : (
            <div className="bg-[#222] rounded-lg p-4">
              <p className="text-[#00c8c8] text-center text-sm mb-4">
                {t('signature.cropInstruction')}
              </p>
              
              <div 
                className="relative aspect-[2/1] bg-[#333] rounded-lg mb-4 overflow-hidden" 
                ref={cropAreaRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div 
                  ref={imageRef}
                  className="absolute cursor-move"
                  style={{ 
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: 'center center'
                  }}
                  onMouseDown={handleMouseDown}
                >
                  {signature && (
                    <img 
                      src={signature} 
                      alt="Signature for cropping" 
                      className="max-w-none"
                      draggable="false"
                    />
                  )}
                </div>

                {/* Corner Guides */}
                <div className="absolute inset-4 pointer-events-none">
                  {/* Valid Area Corners (Green) */}
                  {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                    <div key={corner} className={`absolute ${corner.replace('-', '-0 ')} w-3 h-3`}>
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00c8c8]" />
                      <div className="absolute top-0 left-0 w-0.5 h-full bg-[#00c8c8]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex justify-center gap-4 mb-4">
                <button 
                  onClick={handleZoomOut}
                  className="w-8 h-8 bg-[#333] rounded-full text-[#666666] flex items-center justify-center hover:bg-[#444]"
                >
                  -
                </button>
                <button 
                  onClick={handleZoomIn}
                  className="w-8 h-8 bg-[#333] rounded-full text-[#666666] flex items-center justify-center hover:bg-[#444]"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setIsCropping(false);
                    setPosition({ x: 0, y: 0 });
                    setScale(1);
                  }}
                  className="flex-1 h-12 bg-[#333] rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button 
                  onClick={handleExtract}
                  className="flex-1 h-12 bg-[#00c8c8] text-white rounded-full"
                >
                  {t('signature.extractButton')}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Signature;