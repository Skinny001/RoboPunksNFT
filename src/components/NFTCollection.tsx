import React from 'react';
import NFTCard from './NFTCard';
import {nft1} from '../assets/Images/index'; 
import {nft2} from '../assets/Images/index';
import {nft3} from '../assets/Images/index';
import {nft4} from '../assets/Images/index';
import {nft5} from '../assets/Images/index';
import {nft6} from '../assets/Images/index';
import {nft7} from '../assets/Images/index';
import {nft8} from '../assets/Images/index';

const NFTCollection: React.FC = () => {
  // NFT card data
  const nftCards = [
    {
      id: 1,
      image: nft1,
      name: "Crypto Punk #123",
      price: "0.5",
      description: "A unique digital collectible living on the Ethereum blockchain."
    },
    {
      id: 2,
      image: nft2,
      name: "Bored Ape #456",
      price: "1.2",
      description: "Part of the exclusive Bored Ape Yacht Club collection."
    },
    {
      id: 3,
      image: nft3,
      name: "Art Block #789",
      price: "0.3",
      description: "Generative art stored on the blockchain forever."
    },
    {
      id: 4,
      image: nft4,
      name: "Doodle #101",
      price: "0.8",
      description: "A community-driven collectible with colorful characters."
    },
    {
      id: 5,
      image: nft5,
      name: "Azuki #202",
      price: "0.6",
      description: "Anime-inspired NFT with unique traits and attributes."
    },
    {
      id: 6,
      image: nft6,
      name: "CryptoCat #303",
      price: "0.4",
      description: "Digital feline companions with varying rarities."
    },
    {
      id: 7,
      image: nft7,
      name: "Meta Hero #404",
      price: "1.5",
      description: "3D avatars ready for metaverse integration."
    },
    {
      id: 8,
      image: nft8,
      name: "Pixel Wizard #505",
      price: "0.7",
      description: "Pixelated magical characters with unique spells."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured NFTs</h2>
      
      {/* Grid with proper spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-24">
        {nftCards.map((nft) => (
          <div key={nft.id} className="h-full">
            <NFTCard
              image={nft.image}
              name={nft.name}
              price={nft.price}
              description={nft.description}
              onBuyClick={() => console.log(`Buy ${nft.name}`)}
              onDetailsClick={() => console.log(`View details for ${nft.name}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTCollection;