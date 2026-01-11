import { LinkPreview } from "@/app/components/ui/link-preview";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-2xl h-full bg-background flex flex-col items-start px-4 py-2 gap-2 transition-colors duration-300">
      {/* Profile Image */}
      <div className="w-16 h-16 rounded-xl overflow-hidden border border-border">
        <Image
          src="/images/Ram.png"
          alt="Ram Katwal"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Heading */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium text-foreground leading-relaxed">
          Hey, I&apos;m <LinkPreview href="https://www.instagram.com/design.alex11/">Ram</LinkPreview>, a designer based in Nepal.
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Designing thoughtful interfaces. Building polished digital products. Always exploring the tiny details that bring experiences to life.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4 w-full py-6">
        {/* Item 1 - Image */}
        <div className="relative rounded-2xl overflow-hidden border border-border break-inside-avoid">
          <Image
            src="/aboutusimages/WhatsApp%20Image%202026-01-11%20at%207.44.25%20PM.jpeg"
            alt="Gallery Image 1"
            width={500}
            height={500}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Item 2 - Video */}
        <div className="relative rounded-2xl overflow-hidden border border-border break-inside-avoid">
          <video
            src="/aboutusimages/WhatsApp%20Video%202026-01-11%20at%207.46.06%20PM.mp4"
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Item 3 - Image */}
        <div className="relative rounded-2xl overflow-hidden border border-border break-inside-avoid">
          <Image
            src="/aboutusimages/WhatsApp%20Image%202026-01-11%20at%207.47.25%20PM.jpeg"
            alt="Gallery Image 2"
            width={500}
            height={500}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Item 4 - Image */}
        <div className="relative rounded-2xl overflow-hidden border border-border break-inside-avoid">
          <Image
            src="/aboutusimages/WhatsApp%20Image%202026-01-11%20at%207.51.41%20PM.jpeg"
            alt="Gallery Image 3"
            width={500}
            height={500}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Item 5 - New Image 1 */}
        <div className="relative rounded-2xl overflow-hidden border border-border break-inside-avoid">
          <Image
            src="/aboutusimages/WhatsApp%20Image%202026-01-11%20at%207.45.04%20PM.jpeg"
            alt="Gallery Image 4"
            width={500}
            height={500}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Item 6 - New Image 2 */}
        <div className="relative rounded-2xl overflow-hidden border border-border break-inside-avoid">
          <Image
            src="/aboutusimages/WhatsApp%20Image%202026-01-11%20at%207.57.56%20PM.jpeg"
            alt="Gallery Image 5"
            width={500}
            height={500}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-3 pt-4 border-t border-border w-full mt-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Connect</h2>
        <div className="flex gap-6">
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Twitter"
          >
            <FaXTwitter size={18} />
          </Link>
          <Link
            href="mailto:your.email@example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Resume"
          >
            <FileText size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
