import React from 'react';
import { Search, Github } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="w-[calc(100%-240px)] fixed top-0 left-60 right-0 z-20 flex justify-end items-center py-2 px-8 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-4 pr-10 py-2 w-64 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder-gray-400"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <Link 
          href="https://github.com/RamKatwal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github size={20} />
        </Link>
        <Link 
          href="https://www.notion.so/Resources-Database-292b972ca4c24227b5edbd287109add8" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <path 
              d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337 2.86c.093.42 0 .841-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .841-1.168.841l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.298L7.822 9.44c-.094-.42.14-.888.42-.933l7.186-.606c.326-.047.608.233.747.606z" 
              fill="currentColor"
            />
          </svg>
        </Link>
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
             <img 
                src="/images/Ram.png" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;