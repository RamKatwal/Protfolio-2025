import Casestudysection from "@/app/components/Reusable/casestudysection";
import Experience from "@/app/components/common/Experience";
import Guestbook from "@/app/components/common/Guestbook";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import { LinkPreview }   from "@/app/components/ui/link-preview";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 h-full bg-white flex flex-col items-start border-r border-gray-200 overflow-hidden">
        <ScrollReveal delay={0}>
          <div className="flex flex-col items-start px-4 py-2 gap-4"> 
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
              <Image 
                src="/images/ramlogo.png" 
                alt="Profile" 
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <p className="text-xs">
              Hi I&apos;m Ram {" "}
              <LinkPreview href="https://www.instagram.com/visualsofalex11/">visualsofalex11</LinkPreview>
              , a software engineer, DJ, writer, and minimalist based in Amsterdam, The Netherlands.
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <Casestudysection />
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <Experience />
        </ScrollReveal>
      </div>

      {/* Guestbook Section */}
      <div className="flex-1 h-full overflow-hidden">
        <Guestbook />
      </div>
    </div>
  );
}

