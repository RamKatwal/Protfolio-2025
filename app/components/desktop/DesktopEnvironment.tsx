'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Window from './Window';
import Guestbook from '../common/Guestbook';
import DailyReads from '../common/DailyReads';
import {
    BookOpen,
    BookMarked,
    ArrowRight,
    Github
} from 'lucide-react';
import GitHubContributions from '../common/GitHubContributions';
import { AnimatePresence, motion } from 'motion/react';

const DESKTOP_WINDOW_EVENT = 'open-desktop-window';

const DesktopEnvironment = () => {
    // Start with no windows open
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);
    const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());

    const toggleWindow = useCallback((id: string) => {
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
            setOpenWindows((prev) => [...prev, id]);
            setActiveWindow(id);
        }
    }, [openWindows, minimizedWindows]);

    // Listen for open requests from Leftbar
    useEffect(() => {
        const handler = (e: CustomEvent<string>) => {
            const id = e.detail;
            if (id === 'guestbook' || id === 'github') toggleWindow(id);
        };
        window.addEventListener(DESKTOP_WINDOW_EVENT as keyof WindowEventMap, handler as EventListener);
        return () => window.removeEventListener(DESKTOP_WINDOW_EVENT as keyof WindowEventMap, handler as EventListener);
    }, [toggleWindow]);

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

                if (id === 'github') {
                    return (
                        <Window
                            key={id}
                            title="GitHub"
                            icon={<Github size={16} className="text-muted-foreground" />}
                            isOpen={true}
                            onClose={() => closeWindow(id)}
                            onMinimize={() => minimizeWindow(id)}
                            isActive={activeWindow === id}
                            onFocus={() => setActiveWindow(id)}
                            initialPosition={{ x: 200, y: 100 }}
                        >
                            <GitHubContributions isEmbedded={true} username="RamKatwal" />
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
        </div>
    );
};
export default DesktopEnvironment;
