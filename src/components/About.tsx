import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">About RoboPunks NFT Collection</h1>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome to the Future of Digital Collectibles</h2>
        <p className="mb-6">
          RoboPunks is a limited collection of 1,000 uniquely generated robot-inspired digital collectibles living on the Ethereum blockchain. Each RoboPunk is more than just an NFT – it's a digital identity, a piece of art, and a membership to an exclusive community of forward-thinking collectors.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">The Vision</h2>
        <p className="mb-6">
          Born at the intersection of nostalgia and futurism, RoboPunks pays homage to the early days of cyberpunk culture while pushing the boundaries of what's possible in the NFT space. Our vision is to create a collection that not only appreciates in value but also provides real utility and community benefits to our holders.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Collection Details</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Limited Supply: Only 1,000 RoboPunks will ever exist</li>
          <li className="mb-2">Fair Distribution: Maximum of 3 RoboPunks per wallet to ensure wider community ownership</li>
          <li className="mb-2">Fair Pricing: Mint price of 0.02 ETH makes collecting accessible to more enthusiasts</li>
          <li className="mb-2">Verified Smart Contract: Built with security and longevity in mind</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-8">What Makes RoboPunks Special</h2>
        <p className="mb-6">
          Each RoboPunk is algorithmically generated with a combination of traits that makes it completely unique. From classic robot designs to futuristic cybernetic enhancements, our artists have crafted hundreds of individual elements that come together to create compelling, one-of-a-kind characters.
        </p>

        <h2 className="text-2xl font-bold mb-4 mt-8">Community Benefits</h2>
        <p className="mb-4">
          Owning a RoboPunk means more than just having a cool profile picture. As we grow, RoboPunk holders will gain:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Access to exclusive Discord channels</li>
          <li className="mb-2">Voting rights on future collection developments</li>
          <li className="mb-2">Priority access to future drops and collaborations</li>
          <li className="mb-2">Invitations to virtual and real-world events</li>
          <li className="mb-2">Potential future airdrops and rewards</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-8">Roadmap</h2>
        
        <h3 className="text-xl font-bold mb-2 mt-6">Phase 1: Launch</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Complete minting of the entire collection</li>
          <li className="mb-2">Community building and social media growth</li>
          <li className="mb-2">Secondary market listings and verification</li>
        </ul>
        
        <h3 className="text-xl font-bold mb-2 mt-6">Phase 2: Expansion</h3>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Launch of the RoboPunks DAO</li>
          <li className="mb-2">Introduction of community treasury</li>
          <li className="mb-2">Interactive experiences for holders</li>
        </ul>
        
        <h3 className="text-xl font-bold mb-2 mt-6">Phase 3: Evolution</h3>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Metaverse integration</li>
          <li className="mb-2">Expanded utility for RoboPunk holders</li>
          <li className="mb-2">Collaborative projects with other respected NFT communities</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 mt-8">Join the RoboPunks Revolution</h2>
        <p className="mb-6">
          Whether you're a seasoned NFT collector or just getting started in the space, RoboPunks offers an opportunity to own a piece of digital art with both cultural significance and future potential. Mint your RoboPunk today and become part of our growing community!
        </p>
        
        <p className="italic text-sm mt-10 border-t border-gray-600 pt-4">
          RoboPunks is not affiliated with other "Punks" collections and represents an original concept created by our team.
        </p>
      </div>
    </div>
  );
};

export default About;