'use client';

import React from 'react';
import { Menu, Search } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Input } from '@/app/components/ui/input';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 hover:bg-muted rounded-md transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-lg">
                        R
                    </div>
                    <span className="font-semibold text-sm hidden sm:block tracking-tight text-foreground/90">Ram Katwal</span>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
                <div className="relative max-w-[200px] md:max-w-[300px] w-full hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-foreground/20 rounded-full w-full"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;
