'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

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
}


const NavItem = ({ icon, label, href, isActive = false }: NavItemProps) => {
  return (
    <Link href={href} className="w-full">
      <div 
        className={`box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer ${
          isActive ? 'bg-zinc-100' : 'bg-white'
        }`}
      >
        <div className="relative shrink-0 size-[16px] text-zinc-950">
          {icon}
        </div>
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-950 whitespace-pre">
          {label}
        </p>
      </div>
    </Link>
  );
};

const Leftbar = () => {
  const pathname = usePathname();

  return (
    <div 
      className="bg-white border-[0px_1px_0px_0px] border-solid max-w-64 border-zinc-200 box-border content-stretch flex flex-col gap-[16px] items-start relative size-full"
    >
      <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[12px] py-[16px] relative shrink-0 w-full">
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[18px] text-zinc-950 text-nowrap tracking-[-0.45px] whitespace-pre">
            Ram Katwal
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
          <NavItem icon={<HouseIcon />} label="Home" href='/home' isActive={pathname === '/home' || pathname === '/'} />
          <NavItem icon={<PencilSimpleIcon />} label="Writing" href='/writing' isActive={pathname === '/writing'} />
          <NavItem icon={<StackSimpleIcon />} label="Stacks" href='/stacks' isActive={pathname === '/stacks'} />
          <NavItem icon={<LineSegmentIcon />} label="About me" href='/about-me' isActive={pathname === '/about-me'} />
          <NavItem icon={<BookmarkSimpleIcon />} label="Bookmarks" href='/bookmarks' isActive={pathname === '/bookmarks'} />
          <NavItem icon={<QuestionMarkIcon />} label="Resources" href='/resources' isActive={pathname === '/resources'} />
          <NavItem icon={<QuestionMarkIcon />} label="Career" href='/career' isActive={pathname === '/career'} />
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
