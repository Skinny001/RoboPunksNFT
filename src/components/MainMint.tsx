'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useAppKitWallet } from '../context/index';
import { useNavigate } from 'react-router-dom'; // Import from react-router-dom instead

const roboPunksNFTAddress = '0x3631Ec4B0032d22Fc8C319B7B7fCB4A84a6a641d';

// Notification Component (replaces modal)
const Notification = ({ type, message, isVisible, onClose, actionText, onAction }) => {
  useEffect(() => {
    if (isVisible) {
      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  // Determine styles based on notification type
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const iconType = type === 'error' ? '❌' : '✅';
  
  return (
    <div className="fixed top-4 right-4 z-50 animate-fadeIn">
      <div className={`${bgColor} text-white rounded-lg shadow-lg p-4 max-w-md flex flex-col items-start`}>
        <div className="flex w-full items-start">
          <div className="mr-2 text-xl">{iconType}</div>
          <div className="flex-1">
            <p className="font-medium">{message}</p>
          </div>
          <button 
            onClick={onClose} 
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        {actionText && onAction && (
          <button 
            onClick={() => {
              onAction();
              onClose();
            }}
            className="mt-2 bg-white text-gray-800 px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

const MainMint = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const { isConnected, address } = useAppKitWallet();
  const navigate = useNavigate(); // Use React Router's navigate
  
  // Notification state
  const [notification, setNotification] = useState({
    isVisible: false,
    type: 'error', // 'error' or 'success'
    message: "",
    actionText: null,
    onAction: null
  });

  // Function to show notification
  const showNotification = (type, message, actionText = null, onAction = null) => {
    setNotification({
      isVisible: true,
      type,
      message,
      actionText,
      onAction
    });
  };

  // Function to close notification
  const closeNotification = () => {
    setNotification({
      ...notification,
      isVisible: false
    });
  };

  // Function to handle navigation to mint page
  const navigateToMintPage = () => {
    navigate('/mint'); // Navigate to mint page route
  };

  async function handleMint() {
    try {
      // Force page refresh of MetaMask connection
      if (typeof window.ethereum !== 'undefined') {
        // Simple approach: reload the provider connection
        console.log("Requesting MetaMask accounts...");
        
        // Use the most basic request possible
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        if (!accounts || accounts.length === 0) {
          showNotification('error', "Please connect your MetaMask account");
          return;
        }
        
        console.log("Connected account:", accounts[0]);
        
        // Calculate the mint price (hardcoded to avoid contract calls)
        const mintPrice = ethers.parseEther("0.02"); // 0.02 ETH per NFT
        const totalCost = mintPrice * BigInt(mintAmount);
        
        // Call the mint function using low-level API
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: accounts[0],
            to: roboPunksNFTAddress,
            value: "0x" + totalCost.toString(16), // Convert to hex
            data: '0xa0712d68' + ethers.AbiCoder.defaultAbiCoder().encode(
              ['uint256'],
              [mintAmount]
            ).slice(2) // mint function selector + encoded parameters
          }]
        });
        
        console.log("Transaction sent:", txHash);
        
        // Store mint info in localStorage for the Mint page to access
        saveMintInfo(accounts[0], txHash, mintAmount);
        
        // Show success notification with action to view NFTs
        showNotification(
          'success', 
          `Successfully minted ${mintAmount} RoboPunk NFT${mintAmount > 1 ? 's' : ''}! Transaction hash: ${txHash.substring(0, 10)}...`,
          "View Your NFTs", 
          navigateToMintPage
        );
        
      } else {
        console.error("MetaMask is not installed");
        showNotification('error', "Please install MetaMask to mint NFTs");
      }
    } catch (error) {
      console.error("Error during minting:", error);
      showNotification('error', `${error.message || "Transaction failed"}`);
    }
  }
  
  // Function to save mint information to localStorage
  const saveMintInfo = (ownerAddress, txHash, amount) => {
    try {
      // Get existing mint info from localStorage
      const existingMintInfoJSON = localStorage.getItem('roboPunksMintInfo') || '[]';
      const existingMintInfo = JSON.parse(existingMintInfoJSON);
      
      // Generate random token IDs for now (in production, these would come from the contract)
      const startTokenId = Math.floor(Math.random() * 1000);
      const mintTimestamp = new Date().toISOString();
      
      // Create new mint records
      const newMintRecords: Array<{ tokenId: string; owner: string; transactionHash: string; mintedAt: string }> = [];
      for (let i = 0; i < amount; i++) {
        newMintRecords.push({
          tokenId: (startTokenId + i).toString(),
          owner: ownerAddress,
          transactionHash: txHash,
          mintedAt: mintTimestamp
        });
      }
      
      // Combine and save back to localStorage
      const updatedMintInfo = [...existingMintInfo, ...newMintRecords];
      localStorage.setItem('roboPunksMintInfo', JSON.stringify(updatedMintInfo));
    } catch (error) {
      console.error("Error saving mint info:", error);
    }
  };
  
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  }; 
  
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-4"> 
      <div className="flex flex-col items-center text-center">
        <h1 className='text-3xl md:text-4xl font-bold underline mb-4'>RoboPunks NFT</h1>
        <p className='text-xl md:text-2xl max-w-2xl mx-auto mb-8'>
          It's 2025. Can the RoboPunks NFT save humans from destructive rampant NFT speculation? Mint RoboPunks to find out.
        </p>
        
        {isConnected ? (
          <div className="flex flex-col items-center">
            <div className='flex items-center justify-center mb-4'>
              <button 
                onClick={handleDecrement} 
                className='mr-2 cursor-pointer px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition'
              >
                -
              </button>
              <input 
                type="number" 
                value={mintAmount} 
                readOnly 
                className="w-16 text-center py-2 bg-gray-800 rounded" 
              />
              <button 
                onClick={handleIncrement} 
                className='ml-2 cursor-pointer px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition'
              >
                +
              </button>
            </div>
            <button 
              onClick={handleMint} 
              className="px-6 py-2 bg-orange-600 rounded hover:bg-orange-500 transition cursor-pointer"
            >
              Mint Now
            </button>
          </div>
        ) : (
          <p className="text-lg bg-gray-800 px-6 py-3 rounded-lg">
            You must be connected to mint.
          </p>
        )}

        {/* Notification Component with Action Button */}
        <Notification 
          type={notification.type}
          message={notification.message}
          isVisible={notification.isVisible}
          onClose={closeNotification}
          actionText={notification.actionText}
          onAction={notification.onAction}
        />
      </div>
    </div>
  );
};

export default MainMint;