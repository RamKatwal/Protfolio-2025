'use client';

import { useState } from 'react';
import Casestudysection from "@/app/components/Reusable/casestudysection";
import Experience from "@/app/components/common/Experience";
import PersonalProjects from "@/app/components/common/PersonalProjects";
import GitHubContributions from "@/app/components/common/GitHubContributions";
import Guestbook from "@/app/components/common/Guestbook";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import { LinkPreview }   from "@/app/components/ui/link-preview";
import Image from "next/image";
import { BookOpen } from 'lucide-react';
import { ShimmerButton } from '@/app/components/ui/shimmer-button';

export default function Home() {
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[calc(100vh-56px)] flex flex-col md:flex-row overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 h-full bg-white flex flex-col items-start border-r border-gray-200 overflow-y-auto overscroll-contain scroll-smooth thin-scrollbar">
          <div className="w-full flex flex-col">
            <ScrollReveal delay={0}>
              <div className="w-full pt-2 pb-4 px-4">
                <div className="flex gap-3 items-top">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
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
                    <p className="text-xs text-gray-900">
                      Hi I&apos;m Ram {" "}
                      <LinkPreview href="https://www.instagram.com/visualsofalex11/">visualsofalex11</LinkPreview>
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

        {/* Guestbook Section - Desktop only */}
        <div className="hidden md:block flex-1 h-full overflow-hidden border-t md:border-t-0 border-gray-200">
          <Guestbook />
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setIsGuestbookOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Open Guestbook"
        >
          <BookOpen className="w-5 h-5 text-gray-900" />
          <span className="text-xs font-medium text-gray-900">Guestbook</span>
        </button>
        
        {/* Write Message Button with Shimmer Effect */}
        <ShimmerButton
          onClick={() => setIsGuestbookOpen(true)}
          shimmerColor="rgba(255, 255, 255, 0.3)"
          background="rgba(0, 0, 0, 1)"
          className="border-black/20"
          aria-label="Write Message"
        >
          Write message
        </ShimmerButton>
      </div>

      {/* Mobile Guestbook Overlay */}
      {isGuestbookOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-white">
          <Guestbook isMobileOverlay onClose={() => setIsGuestbookOpen(false)} />
        </div>
      )}
    </>
  );
}

