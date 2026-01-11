'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { X, Github, Twitter, Linkedin, Dribbble } from 'lucide-react';

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
                className={`box-border content-stretch flex gap-[8px] h-[36px] items-center px-[16px] py-[8px] relative rounded-[6px] shrink-0 w-full cursor-pointer transition-all duration-200 ease-in-out ${isActive
                    ? 'bg-accent text-foreground shadow-sm'
                    : 'bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground'
                    }`}
            >
                <div className={`relative shrink-0 size-[16px] ${isActive ? 'text-foreground' : 'text-foreground'}`}>
                    {icon}
                </div>
                <p className={`font-medium leading-[18px] not-italic relative shrink-0 text-xs text-nowrap whitespace-pre ${isActive ? 'text-foreground' : 'text-foreground'
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

    const socialLinks = [
        { name: 'Dribbble', href: 'https://dribbble.com/ramkatwal', icon: Dribbble },
        { name: 'GitHub', href: 'https://github.com/RamKatwal', icon: Github },
        { name: 'X', href: 'https://x.com/visualsofalex11', icon: Twitter },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ram-katwal/', icon: Linkedin },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-screen z-50 bg-background w-[200px] border-r border-border flex flex-col items-start transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Mobile close button */}
                <div className="flex items-center justify-between w-full px-4 py-3.5 border-b border-border md:hidden">
                    <p className="font-semibold text-sm text-foreground">
                        Ram Katwal
                    </p>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-accent transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5 text-foreground" />
                    </button>
                </div>

                {/* Desktop title */}
                <p className="hidden md:flex w-full font-semibold text-sm text-foreground px-4 h-14 border-b border-border items-center">
                    Ram Katwal
                </p>


                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full px-2 py-2 flex-1">
                    <NavItem icon={<HouseIcon />} label="Home" href='/' isActive={pathname === '/'} onNavigate={onClose} />
                    <NavItem icon={<LineSegmentIcon />} label="About" href='/about-me' isActive={pathname === '/about-me'} onNavigate={onClose} />
                    <NavItem icon={<PencilSimpleIcon />} label="Writing" href='/writing' isActive={pathname === '/writing'} onNavigate={onClose} />
                    <NavItem icon={<StackSimpleIcon />} label="Stacks" href='/stacks' isActive={pathname === '/stacks'} onNavigate={onClose} />
                    <NavItem icon={<BookmarkSimpleIcon />} label="Bookmarks" href='/bookmarks' isActive={pathname === '/bookmarks'} onNavigate={onClose} />
                    <NavItem icon={<QuestionMarkIcon />} label="Resources" href='/resources' isActive={pathname === '/resources'} onNavigate={onClose} />
                </div>

                {/* Social Links at bottom */}
                <div className="w-full px-4 py-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200"
                                title={link.name}
                            >
                                <link.icon size={16} />
                            </a>
                        ))}
                    </div>
                    <p className="mt-4 text-[10px] text-muted-foreground font-medium">
                        © 2026 Ram Katwal
                    </p>
                </div>
            </div>
        </>
    );
};

export default Leftbar;
