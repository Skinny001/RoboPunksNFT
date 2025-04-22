import React, { useState, useEffect } from 'react';
import { useAppKitWallet } from '../context/index';
import { Link } from 'react-router-dom';
import MintCard from './MintCard'; 

const MintPage = () => {
  const [mintedNFTs, setMintedNFTs] = useState<{ tokenId: string; owner: string; transactionHash: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected, address } = useAppKitWallet();
  
  useEffect(() => {
    // Load NFTs when component mounts or when wallet connects/changes
    if (isConnected && address) {
      loadMintedNFTs(address);
    } else {
      // If not connected, clear NFTs
      setMintedNFTs([]);
    }
    
    setIsLoading(false);
  }, [isConnected, address]);
  
  const loadMintedNFTs = (walletAddress) => {
    try {
      // Load from localStorage
      const mintInfoJSON = localStorage.getItem('roboPunksMintInfo');
      
      if (mintInfoJSON) {
        const allMintInfo = JSON.parse(mintInfoJSON);
        
        // Filter for NFTs owned by this address
        const userNFTs = allMintInfo.filter(nft => 
          nft.owner.toLowerCase() === walletAddress.toLowerCase()
        );
        
        setMintedNFTs(userNFTs);
      }
    } catch (error) {
      console.error("Error loading minted NFTs:", error);
      setMintedNFTs([]);
    }
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Your RoboPunks Collection</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : isConnected ? (
          <>
            {mintedNFTs.length > 0 ? (
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {mintedNFTs.map((nft) => (
                    <MintCard
                      key={`${nft.transactionHash}-${nft.tokenId}`}
                      tokenId={nft.tokenId}
                      address={nft.owner}
                      transactionHash={nft.transactionHash}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-lg px-8 max-w-lg mx-auto">
                <h3 className="text-xl font-medium mb-4">No NFTs Found</h3>
                <p className="text-gray-400 mb-6">
                  You haven't minted any RoboPunks NFTs yet. Head over to the main page to mint your first RoboPunk!
                </p>
                <Link 
                  to="/" 
                  className="px-6 py-2 bg-orange-600 rounded hover:bg-orange-500 transition cursor-pointer inline-block"
                >
                  Mint Your First NFT
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg px-8 max-w-lg mx-auto">
            <h3 className="text-xl font-medium mb-4">Connect Your Wallet</h3>
            <p className="text-gray-400">
              Please connect your wallet to view your RoboPunks NFT collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintPage;