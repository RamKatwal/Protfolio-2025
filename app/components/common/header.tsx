import React from 'react';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex justify-end items-center py-6 px-8 mb-6">
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
             <img 
                src="https://picsum.photos/id/64/100/100" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale"
            />
        </div>
      </div>
    </header>
  );
};

export default Header;