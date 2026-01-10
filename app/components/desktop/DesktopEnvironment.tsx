'use client';

import React, { useState } from 'react';
import Window from './Window';
import Guestbook from '../common/Guestbook';
import DailyReads from '../common/DailyReads';
import { FloatingDock } from '@/components/ui/floating-dock';
import {
    BookOpen,
    BookMarked,
    Settings,
    Music,
    Camera,
    FileText,
    Globe,
    PanelRightClose,
    PanelRightOpen,
    ArrowRight
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const DesktopEnvironment = () => {
    // Start with no windows open
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);
    const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());

    // Dock visibility state
    const [isDockVisible, setIsDockVisible] = useState(true);

    const toggleWindow = (id: string) => {
        if (openWindows.includes(id)) {
            if (minimizedWindows.has(id)) {
                const newMinimized = new Set(minimizedWindows);
                newMinimized.delete(id);
                setMinimizedWindows(newMinimized);
                setActiveWindow(id);
            } else {
                setActiveWindow(id);
            }
        } else {
            setOpenWindows([...openWindows, id]);
            setActiveWindow(id);
        }
    };

    const closeWindow = (id: string) => {
        setOpenWindows(openWindows.filter(w => w !== id));
        if (activeWindow === id) {
            setActiveWindow(null);
        }
    };

    const minimizeWindow = (id: string) => {
        const newMinimized = new Set(minimizedWindows);
        newMinimized.add(id);
        setMinimizedWindows(newMinimized);
        setActiveWindow(null);
    };

    const dockItems = [
        {
            title: "Guestbook",
            icon: <BookOpen className="h-full w-full text-muted-foreground" />,
            onClick: () => toggleWindow('guestbook'),
            href: '#'
        },
        {
            title: "Daily Reads",
            icon: <BookMarked className="h-full w-full text-muted-foreground" />,
            onClick: () => toggleWindow('daily-reads'),
            href: '#'
        },
        {
            title: "Notes",
            icon: <FileText className="h-full w-full text-muted-foreground" />,
            href: '#',
            onClick: () => { } // Placeholder
        },
        {
            title: "Music",
            icon: <Music className="h-full w-full text-muted-foreground" />,
            href: '#',
            onClick: () => { } // Placeholder
        },
        {
            title: "Gallery",
            icon: <Camera className="h-full w-full text-muted-foreground" />,
            href: '#',
            onClick: () => { } // Placeholder
        },
        {
            title: "Browser",
            icon: <Globe className="h-full w-full text-muted-foreground" />,
            href: '#',
            onClick: () => { } // Placeholder
        },
        {
            title: "Settings",
            icon: <Settings className="h-full w-full text-muted-foreground" />,
            href: '#',
            onClick: () => { } // Placeholder
        },
    ];

    return (
        <div className="w-full h-full relative overflow-hidden bg-background select-none">
            {/* Dot Pattern Background */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

            {/* Windows Layer */}
            {openWindows.map((id) => {
                if (minimizedWindows.has(id)) return null;

                if (id === 'guestbook') {
                    return (
                        <Window
                            key={id}
                            title="Guestbook"
                            icon={<BookOpen size={16} className="text-muted-foreground" />}
                            isOpen={true}
                            onClose={() => closeWindow(id)}
                            onMinimize={() => minimizeWindow(id)}
                            isActive={activeWindow === id}
                            onFocus={() => setActiveWindow(id)}
                            defaultMaximized={true}
                        >
                            <div className="w-full h-full flex flex-col">
                                <Guestbook isEmbedded={true} />
                            </div>
                        </Window>
                    );
                }

                if (id === 'daily-reads') {
                    return (
                        <Window
                            key={id}
                            title="Daily Reads"
                            icon={<BookMarked size={16} className="text-muted-foreground" />}
                            isOpen={true}
                            onClose={() => closeWindow(id)}
                            onMinimize={() => minimizeWindow(id)}
                            isActive={activeWindow === id}
                            onFocus={() => setActiveWindow(id)}
                            initialPosition={{ x: 150, y: 80 }}
                        >
                            <DailyReads />
                        </Window>
                    );
                }

                return null;
            })}

            {/* Helper Message (when no windows open) */}
            <AnimatePresence>
                {openWindows.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute top-1/2 -translate-y-1/2 right-32 z-10 flex items-center gap-4 select-none pointer-events-none"
                    >
                        <span className="text-xl text-muted-foreground font-['Gochi_Hand'] -rotate-2 transform pt-2">
                            Here for different experiments
                        </span>
                        <ArrowRight className="w-6 h-6 animate-pulse text-muted-foreground/60" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Vertical Floating Dock (Right Side) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 z-50 flex items-center">
                <AnimatePresence mode="wait">
                    {isDockVisible ? (
                        <motion.div
                            key="dock"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col items-center pr-2"
                        >
                            <div className="relative">
                                <FloatingDock
                                    items={dockItems}
                                    desktopClassName="bg-background/80 border border-border shadow-xl backdrop-blur-md"
                                    orientation="vertical"
                                />

                                {/* Toggle Button Positioned relative to dock */}
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2">
                                    <button
                                        onClick={() => setIsDockVisible(false)}
                                        className="p-2 bg-background border border-border shadow-md rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                        title="Hide Dock"
                                    >
                                        <PanelRightClose size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="toggle"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <button
                                onClick={() => setIsDockVisible(true)}
                                className="p-3 bg-background border-y border-l border-border shadow-md rounded-l-full rounded-r-none text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group"
                                title="Show Dock"
                            >
                                <PanelRightOpen size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
export default DesktopEnvironment;
