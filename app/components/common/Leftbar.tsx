'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { X } from 'lucide-react';

import { 
  HouseIcon, 
  PencilSimpleIcon, 
  StackSimpleIcon, 
  LineSegmentIcon, 
  BookmarkSimpleIcon, 
  QuestionMarkIcon 
} from './icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  href: string;
  onNavigate?: () => void;
}


const NavItem = ({ icon, label, href, isActive = false, onNavigate }: NavItemProps) => {
  return (
    <Link href={href} className="w-full" onClick={onNavigate}>
      <div 
        className={`box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer transition-all duration-200 ease-in-out ${
          isActive 
            ? 'bg-black text-white shadow-lg' 
            : 'bg-transparent hover:bg-gray-100 text-zinc-950'
        }`}
      >
        <div className={`relative shrink-0 size-[16px] ${isActive ? 'text-white' : 'text-zinc-950'}`}>
          {icon}
        </div>
        <p className={`font-medium leading-[18px] not-italic relative shrink-0 text-xs text-nowrap whitespace-pre ${
          isActive ? 'text-white' : 'text-zinc-950'
        }`}>
          {label}
        </p>
      </div>
    </Link>
  );
};

interface LeftbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Leftbar: React.FC<LeftbarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen z-50 bg-white w-50 border-r border-zinc-200 flex flex-col items-start transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between w-full px-4 py-3.5 border-b border-zinc-200 md:hidden">
          <p className="font-semibold text-sm text-zinc-950">
            Ram Katwal
          </p>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-zinc-950" />
          </button>
        </div>

        {/* Desktop title */}
        <p className="hidden md:block w-full font-semibold text-sm text-zinc-950 px-4 py-3.5 border-b border-zinc-200">
          Ram Katwal
        </p>

        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full px-2 py-2">
          <NavItem icon={<HouseIcon />} label="Home" href='/' isActive={pathname === '/'} onNavigate={onClose} />
          <NavItem icon={<LineSegmentIcon />} label="About" href='/about-me' isActive={pathname === '/about-me'} onNavigate={onClose} />
          <NavItem icon={<PencilSimpleIcon />} label="Writing" href='/writing' isActive={pathname === '/writing'} onNavigate={onClose} />
          <NavItem icon={<StackSimpleIcon />} label="Stacks" href='/stacks' isActive={pathname === '/stacks'} onNavigate={onClose} />
          <NavItem icon={<BookmarkSimpleIcon />} label="Bookmarks" href='/bookmarks' isActive={pathname === '/bookmarks'} onNavigate={onClose} />
          <NavItem icon={<QuestionMarkIcon />} label="Resources" href='/resources' isActive={pathname === '/resources'} onNavigate={onClose} />
        </div>
      </div>
    </>
  );
};

export default Leftbar;
