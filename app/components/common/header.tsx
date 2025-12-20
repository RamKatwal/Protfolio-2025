import React from 'react';
import { Search } from 'lucide-react';
import { FaXTwitter, FaGithub, FaLinkedin } from 'react-icons/fa6';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="w-[calc(100%-200px)] fixed top-0 left-[200px] right-0 z-20 flex justify-end items-center py-2 px-8 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-4 pr-10 py-2 w-64 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder-gray-400"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        {/* Social Media Icons */}
        <div className="flex items-center gap-3">
          <Link 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={18} />
          </Link>
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </Link>
          <Link 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;