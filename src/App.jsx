import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppKitProvider } from './config';
import AppKitContextProvider from './context';
import MainMint from './components/MainMint';
import NavBar from './components/NavBar';
import './App.css';
import NFTCollection from './components/NFTCollection';
import About from './components/About';
import MintPage from './components/MintPage';

function App() {
  return (
    <AppKitProvider>
      <AppKitContextProvider>
        <div className="overlay">
          <div className='App'>
            <NavBar />
            <Routes>
              <Route path="/" element={
                <>
                  <MainMint />
                  <NFTCollection/>
                </>
              } />
              <Route path="/about.tsx" element={<About/>} />
              <Route path="/mintpage.tsx" element={<MintPage/>} />
            </Routes>
            <div className='footer'>
              <p>© 2025 All rights reserved. Made with ❤️ by <a href="https://twitter.com/0xSkinny001" target="_blank" rel="noreferrer">0xSkinny001</a></p>
            </div>
          </div>
          <div className='moving-background'></div>
        </div>
      </AppKitContextProvider>
    </AppKitProvider>
  )
}

export default App