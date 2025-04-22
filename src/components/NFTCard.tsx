
import React, { useState, useEffect } from 'react';

interface NFTCardProps {
  image?: string;
  name?: string;
  price?: string;
  description?: string;
  onBuyClick?: () => void;
  onDetailsClick?: () => void;
  showPrice?: boolean;
  showButtons?: boolean;
  className?: string;
  imageHeight?: string;
  customButtons?: React.ReactNode;
  animatedBorder?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ 
  image = "/api/placeholder/300/300",
  name = "Crypto Punk #123",
  price = "0.5",
  description = "A unique digital collectible living on the Ethereum blockchain.",
  onBuyClick,
  onDetailsClick,
  showPrice = true,
  showButtons = true,
  className = "",
  imageHeight = "h-48",
  customButtons,
  animatedBorder = true
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // Create animated border effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (animatedBorder) {
      // Speed up animation when hovered
      const speed = isHovered ? 8 : 20;
      intervalId = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, speed);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [animatedBorder, isHovered]);
  
  const handleBuyClick = () => {
    if (onBuyClick) onBuyClick();
  };
  
  const handleDetailsClick = () => {
    if (onDetailsClick) onDetailsClick();
  };
  
  return (
    <div 
      className={`relative w-full h-full ${className} transition-transform duration-300 ease-in-out ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border container */}
      {animatedBorder && (
        <div 
          className={`absolute -inset-1 rounded-lg transition-all duration-300 ${isHovered ? 'opacity-100 blur-sm' : 'opacity-75 blur-lg'}`}
          style={{ 
            background: `conic-gradient(from ${rotation}deg, #e2f346, #cccf05, #4287ff, #0e43d4)`,
            zIndex: 0 
          }}
        />
      )}
      
      {/* Card content */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden p-1 z-10 h-full">
        <div className="bg-gray-900 rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300">
          <div className="relative overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className={`w-full ${imageHeight} object-cover rounded-t-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            />
            {showPrice && (
              <div className={`absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg font-medium transition-all duration-300 ${isHovered ? 'bg-orange-500' : ''}`}>
                {price} ETH
              </div>
            )}
          </div>
          
          <div className="p-4 flex-grow flex flex-col">
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isHovered ? 'text-blue-400' : 'text-white'}`}>{name}</h3>
            <p className="text-gray-300 text-sm mb-3">{description}</p>
            
            {showButtons && (
              <div className="flex justify-between items-center mt-auto">
                {customButtons ? (
                  customButtons
                ) : (
                  <>
                    <button 
                      onClick={handleBuyClick}
                      className={`bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ${isHovered ? 'shadow-lg shadow-blue-500/50' : ''}`}
                    >
                      Sold Out
                    </button>
                    {/* <button 
                      onClick={handleDetailsClick}
                      className={`bg-transparent text-gray-300 border border-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isHovered ? 'bg-gray-800 border-gray-400' : ''}`}
                    >
                      View Details
                    </button> */}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;