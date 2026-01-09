'use client';

import React, { useState } from 'react';
import Leftbar from './Leftbar';
import Header from './header';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Leftbar isOpen={isMenuOpen} onClose={closeMenu} />
      <Header onMenuClick={toggleMenu} />
      <main className="mt-14 md:ml-[200px] md:w-[calc(100%-240px)] w-full transition-all duration-300 pb-16 md:pb-0">
        {children}
      </main>
    </>
  );
};

export default LayoutClient;

