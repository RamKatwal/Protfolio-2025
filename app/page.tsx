'use client';

import Casestudysection from "@/app/components/Reusable/casestudysection";
import ProjectsMarquee from "@/app/components/common/ProjectsMarquee";
import PersonalProjects from "@/app/components/common/PersonalProjects";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import { LinkPreview } from "@/app/components/ui/link-preview";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-[calc(100vh-56px)] flex bg-background text-foreground">
        {/* Main Content - max width, vertical border full to viewport */}
        <div className="w-full max-w-3xl min-h-[calc(100vh-56px)] bg-background flex flex-col items-start overflow-y-auto overscroll-contain scroll-smooth thin-scrollbar border-r border-border">
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
                      Hi I&apos;m {" "}
                      <LinkPreview href="https://www.instagram.com/design.alex11/">Ram Katwal</LinkPreview>
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

            <ScrollReveal delay={250}>
              <PersonalProjects />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </>
  );
}

