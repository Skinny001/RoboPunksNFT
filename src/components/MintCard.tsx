'use client';

import React from 'react';

const MintCard = ({ tokenId, address, transactionHash }) => {
  // Generate a pseudo-random image based on tokenId
  // This is just for visual demonstration - in a real app you'd fetch the actual NFT image
  const getRandomRobotImage = (id) => {
    // Use the tokenId to deterministically generate robot features
    const robotId = parseInt(id) % 1000;
    const background = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A1'][robotId % 5];
    const eyeColor = ['#FFFFFF', '#00FFFF', '#FFFF00', '#FF00FF'][robotId % 4];
    
    return (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="200" height="200" fill={background} />
        
        {/* Robot Body */}
        <rect x="50" y="70" width="100" height="100" fill="#444" rx="10" />
        
        {/* Robot Head */}
        <rect x="65" y="30" width="70" height="60" fill="#666" rx="5" />
        
        {/* Robot Eyes */}
        <circle cx="85" cy="55" r="10" fill={eyeColor} />
        <circle cx="115" cy="55" r="10" fill={eyeColor} />
        
        {/* Robot Mouth */}
        <rect x="80" y="75" width="40" height="5" fill="#888" />
        
        {/* Robot Antenna */}
        <rect x="95" y="15" width="10" height="15" fill="#888" />
        <circle cx="100" cy="15" r="5" fill="#FF0000" />
        
        {/* TokenId Text */}
        <text x="100" y="185" fontSize="12" fontWeight="bold" fill="#FFF" textAnchor="middle">
          #{tokenId}
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-xs mx-auto transition-transform hover:scale-105">
      <div className="p-1 bg-gradient-to-r from-orange-500 to-purple-600">
        <div className="bg-gray-900 p-4">
          {/* SVG Robot Image */}
          <div className="mb-4">
            {getRandomRobotImage(tokenId)}
          </div>
          
          {/* NFT Info */}
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white mb-2">RoboPunk #{tokenId}</h3>
            <div className="text-gray-400 text-sm mb-2 truncate">
              <span className="font-semibold">Owner:</span> {address.substring(0, 6)}...{address.substring(address.length - 4)}
            </div>
            {transactionHash && (
              <div className="text-gray-400 text-sm truncate">
                <span className="font-semibold">Tx:</span> {transactionHash.substring(0, 6)}...{transactionHash.substring(transactionHash.length - 4)}
              </div>
            )}
          </div>
          
          {/* Mint Badge */}
          <div className="mt-4 flex justify-end">
            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              Minted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintCard;