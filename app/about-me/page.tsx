import { LinkPreview } from "@/app/components/ui/link-preview";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-[50vw] h-full bg-white flex flex-col items-start border-r border-gray-200">
      <div className="flex flex-col items-start px-4 py-8 gap-8 w-full">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
          <Image 
            src="/images/Ram.png" 
            alt="Profile" 
            width={96}
            height={96}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Main Heading */}
        <div className="flex flex-col gap-4">
          <h1 className="text-md font-bold text-gray-900 leading-tight">
            Hey there! I&apos;m <LinkPreview href="https://www.instagram.com/visualsofalex11/">visualsofalex11</LinkPreview>, a designer, writer, and minimalist based in Amsterdam, The Netherlands.
          </h1>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            I develop things as a Senior Frontend Software Engineer. Previously, I worked as a Senior Frontend Software Engineer at heycar, Frontend Software Engineer at Yemeksepeti, Fullstack Software Engineer at Sistas, Mobile Developer at Tanbula, and Specialist at Apple.
          </p>
        </div>

        {/* Values Section */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            Two things I value the most: <span className="font-medium text-gray-900">bold, innovative problem breaking</span> and <span className="font-medium text-gray-900">meticulous, beat-by-beat care to detail</span>.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col gap-2">
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FaLinkedin size={16} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
              <span>LinkedIn</span>
            </Link>
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FaXTwitter size={16} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
              <span>Twitter</span>
            </Link>
            <Link 
              href="mailto:your.email@example.com" 
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <Mail size={16} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
              <span>Email</span>
            </Link>
            <Link 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <FileText size={16} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
              <span>Resume</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

