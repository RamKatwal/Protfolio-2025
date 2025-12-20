import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

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
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
             <Image 
                src="/images/Ram.png" 
                alt="Profile" 
                width={32}
                height={32}
                className="w-full h-full object-cover grayscale"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;