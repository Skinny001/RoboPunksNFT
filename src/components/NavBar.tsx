import React, { useState, useEffect } from 'react';
import Github from '../assets/Images/github.png';
import Email from '../assets/Images/email.png';
import Twitter from '../assets/Images/letter-x.png';
import { useAppKitWallet } from '../context'; 
import { Link } from "react-router-dom";


// Define props interface
interface NavBarProps {
}

const NavBar: React.FC<NavBarProps> = () => {
  const { isConnected, connect, disconnect, address } = useAppKitWallet(); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to connect wallet
  function openWalletSelector() {
    connect(); // Use AppKit connect function
  }

  // Disconnect wallet function
  function disconnectAccount() {
    disconnect(); // Use AppKit disconnect function
    setShowWalletMenu(false);
  }

  // Truncate wallet address for display
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (!target.closest('.wallet-menu-container')) {
        setShowWalletMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <nav className={`fixed w-full py-4 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Logo/Brand */}
          <Link to="/"className="text-white font-bold text-2xl">0xSkinny</Link>
          
          {/* Center - Navigation links */}
          <div className="flex items-center space-x-8">
          <Link to ="/" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">
              Home
            </Link>
            <Link to ="/about.tsx" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">
              About
            </Link>
            <Link to ="/mintpage.tsx" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">
              Mint
            </Link>
            {/* <a href="#team" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">Team</a> */}
          </div>
          
          {/* Right side - Social icons and wallet connect */}
          <div className="flex items-center space-x-6">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 mr-4">
              <a href="https://github.com/Skinny001" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                <img src={Github} alt="GitHub" className="w-6 h-6" />
              </a>
              <a href="mailto:Bamigboyetemitope84@gmail.com" className="hover:opacity-80 transition">
                <img src={Email} alt="Email" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/0xSkinny001" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                <img src={Twitter} alt="Twitter" className="w-6 h-6 filter invert" />
              </a>
            </div>
            
            {/* Wallet Section */}
            <div className="wallet-menu-container relative">
              {isConnected ? (
                <div>
                  <button 
                    onClick={() => setShowWalletMenu(!showWalletMenu)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition cursor-pointer"
                  >
                    <span>{truncateAddress(address || '')}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {showWalletMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          onClick={disconnectAccount}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          role="menuitem"
                        >
                          Disconnect Wallet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={openWalletSelector}
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition font-medium cursor-pointer"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
        <Link to="/"className="text-white font-bold text-2xl">0xSkinny</Link>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 mt-4 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
            <Link to ="/" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">
              Home
            </Link>
            <Link to ="/about.tsx" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">
              About
            </Link>
            <Link to ="/mintpage.tsx" className="text-gray-300 hover:text-white transition-colors font-medium text-lg">
              Mint
            </Link>
              {/* <a 
                href="#team" 
                className="text-gray-300 hover:text-white transition-colors text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </a> */}
              <div className="pt-2 border-t border-gray-700">
                {isConnected ? (
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">
                        {truncateAddress(address || '')}
                      </span>
                    </div>
                    <button
                      onClick={disconnectAccount}
                      className="text-red-400 hover:text-red-300 text-left"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      openWalletSelector();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition font-medium cursor-pointer"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
              <div className="flex justify-center space-x-6 pt-3 border-t border-gray-700">
                <a href="https://github.com/Skinny001" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                  <img src={Github} alt="GitHub" className="w-6 h-6" />
                </a>
                <a href="mailto:Bamigboyetemitope84@gmail.com" className="hover:opacity-80 transition">
                  <img src={Email} alt="Email" className="w-6 h-6" />
                </a>
                <a href="https://twitter.com/0xSkinny001" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
                  <img src={Twitter} alt="Twitter" className="w-6 h-6 filter invert" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;