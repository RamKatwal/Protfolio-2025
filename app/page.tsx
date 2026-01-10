'use client';

import { useState } from 'react';
import Casestudysection from "@/app/components/Reusable/casestudysection";
import Experience from "@/app/components/common/Experience";
import ProjectsMarquee from "@/app/components/common/ProjectsMarquee";
import PersonalProjects from "@/app/components/common/PersonalProjects";
import GitHubContributions from "@/app/components/common/GitHubContributions";
import Guestbook from "@/app/components/common/Guestbook";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import { LinkPreview } from "@/app/components/ui/link-preview";
import Image from "next/image";
import { BookOpen, PanelBottomClose, PanelBottomOpen } from 'lucide-react';
import DesktopEnvironment from "@/app/components/desktop/DesktopEnvironment";
import { FloatingDock } from "@/components/ui/floating-dock";
import { AnimatePresence, motion } from "motion/react";
import {
  BookMarked,
  Settings,
  Music,
  Camera,
  FileText,
  Globe
} from 'lucide-react';

export default function Home() {
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isMobileDockVisible, setIsMobileDockVisible] = useState(false);

  return (
    <>
      <div className="w-full h-[calc(100vh-56px)] flex flex-col md:flex-row overflow-hidden bg-background text-foreground">
        {/* Main Content */}
        <div className="flex-1 h-full bg-background flex flex-col items-start border-r border-border overflow-y-auto overscroll-contain scroll-smooth thin-scrollbar">
          <div className="w-full flex flex-col">
            <ScrollReveal delay={0}>
              <div className="w-full pt-2 pb-4 px-2">
                <div className="flex gap-3 items-top">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-border flex items-center justify-center bg-muted">
                    <Image
                      src="/images/ramlogo.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 line-height-1">
                    <p className="text-xs text-foreground">
                      Hi I&apos;m Ram {" "}
                      <LinkPreview href="https://www.instagram.com/design.alex11/">visualsofalex11</LinkPreview>
                      , a designer based in Nepal. <br />
                      Designing thoughtful interfaces. Building polished digital products. Always exploring the tiny details that bring experiences to life.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Casestudysection />
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <ProjectsMarquee />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Experience />
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <PersonalProjects />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <GitHubContributions username="RamKatwal" />
            </ScrollReveal>
          </div>
        </div>

        {/* Desktop Environment Section - Replaces Guestbook on Desktop */}
        <div className="hidden md:block flex-1 h-full overflow-hidden border-t md:border-t-0 border-border">
          <DesktopEnvironment />
        </div>
      </div>

      {/* Mobile Floating Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 md:hidden w-auto flex items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            {isMobileDockVisible ? (
              <motion.div
                key="dock"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-center gap-2"
              >
                <FloatingDock
                  mobileClassName="hidden" // Hide the default mobile toggle
                  desktopClassName="flex md:flex bg-background/90 border border-border shadow-xl rounded-2xl gap-3 px-4 py-3 h-16 items-end" // Force the desktop row layout on mobile
                  items={[
                    {
                      title: "Guestbook",
                      icon: <BookOpen className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      onClick: () => setIsGuestbookOpen(true),
                      href: '#'
                    },
                    {
                      title: "Daily Reads",
                      icon: <BookMarked className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      href: '#',
                      onClick: () => { }
                    },
                    {
                      title: "Notes",
                      icon: <FileText className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      href: '#',
                      onClick: () => { }
                    },
                    {
                      title: "Music",
                      icon: <Music className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      href: '#',
                      onClick: () => { }
                    },
                    {
                      title: "Gallery",
                      icon: <Camera className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      href: '#',
                      onClick: () => { }
                    },
                    {
                      title: "Browser",
                      icon: <Globe className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      href: '#',
                      onClick: () => { }
                    },
                    {
                      title: "Settings",
                      icon: <Settings className="h-full w-full text-muted-foreground dark:text-foreground" />,
                      href: '#',
                      onClick: () => { }
                    },
                  ]}
                />
                <button
                  onClick={() => setIsMobileDockVisible(false)}
                  className="p-2 bg-background/90 border border-border shadow-xl rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  title="Hide Dock"
                >
                  <PanelBottomClose size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="toggle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <button
                  onClick={() => setIsMobileDockVisible(true)}
                  className="p-3 bg-background/90 border border-border shadow-xl rounded-full text-muted-foreground hover:text-foreground transition-colors group"
                  title="Show Dock"
                >
                  <PanelBottomOpen size={24} className="group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Guestbook Overlay */}
      {isGuestbookOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background">
          <Guestbook isMobileOverlay onClose={() => setIsGuestbookOpen(false)} />
        </div>
      )}
    </>
  );
}

