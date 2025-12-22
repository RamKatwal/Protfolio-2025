'use client';

import React from 'react';
import { Search, Menu } from 'lucide-react';
import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="w-full md:w-[calc(100%-200px)] fixed top-0 left-0 md:left-[200px] right-0 z-30 flex justify-between md:justify-end items-center py-2 px-4 md:px-8 border-b border-gray-200 bg-white">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-gray-900" />
      </button>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-4 pr-10 py-2 w-64 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder-gray-400"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        {/* Social Media Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
          <Link 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;