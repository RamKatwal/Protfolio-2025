'use client';

import React, { useState } from 'react';
import { CaseStudyData } from '@/types';
import caseStudies from '@/data/caseStudies.json';
import { Badge } from '@/app/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

// Import JSON data
// Use a type assertion to inform TypeScript about the structure of the imported JSON
const caseStudiesData: CaseStudyData[] = caseStudies as CaseStudyData[];


// --- Helper Component: CaseStudyLinkBadge (Your Reusable Chip) ---
interface CaseStudyLinkBadgeProps {
  label: string;
  url: string; // Changed href to url to match LinkData structure
}


// Wrapper component to use the Badge as a clickable link
const CaseStudyLinkBadge: React.FC<CaseStudyLinkBadgeProps> = ({ label, url }) => {
  const variant = 'secondary';
  // Use zinc colors to ensure the "gray" look in light mode and appropriate contrast in dark mode
  // bg-secondary is usually light gray, but we reinforce with zinc-100/200 logic if needed or rely on secondary.
  // User asked for "gray badge" and "check hover". 
  // secondary = bg-secondary (zinc-100ish). hover = bg-secondary/80.
  // We will override hover to be darker (zinc-200) for better feedback.
  // User asked to explicitly ensure "little gray" on light hover and fix any "red" issue.
  // We use standard tailwind zinc colors.
  const spacingClass = 'mr-2 mb-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-200';

  // For "Case Study" links, bypass the password gate for now.
  if (label === 'Case Study') {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Badge
          variant={variant}
          className={`${spacingClass} cursor-pointer transition-colors`}
        >
          {label}
        </Badge>
      </Link>
    );
  }

  // For other links, use the original Link component
  return (
    <Link
      href={url}
      target={url.startsWith('/') ? '_self' : '_blank'}
      rel={url.startsWith('/') ? '' : 'noopener noreferrer'}
    >
      <Badge
        variant={variant}
        className={`${spacingClass} cursor-pointer transition-colors`}
      >
        {label}
      </Badge>
    </Link>
  );
};


// --- Helper Component: CaseStudyItem (The Project Block) ---
interface CaseStudyItemProps {
  study: CaseStudyData;
}

const CaseStudyItem: React.FC<CaseStudyItemProps> = ({ study }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`py-2 border-b border-border last:border-b-0 transition-all duration-200 ease-out ${isHovered ? 'bg-muted/50 rounded-lg -mx-2 px-2 shadow-sm' : ''
      }`}>
      <div className="flex gap-3">
        {/* Logo */}
        {study.logo && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border flex items-center justify-center transition-all duration-200 ${isHovered ? 'border-border bg-accent shadow-sm scale-105' : 'border-border bg-muted'
            }`}>
            <Image
              src={study.logo}
              alt={`${study.title} logo`}
              width={40}
              height={40}
              className="w-full h-full object-contain p-1.5 transition-transform duration-200"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w- 0">
          {/* Title and Description Container */}
          <div
            className="cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Project Title (e.g., Puffless App) */}
            <h3 className={`text-sm font-medium transition-colors duration-200 ${isHovered ? 'text-foreground' : 'text-foreground/90'
              }`}>
              {study.title}
            </h3>

            {/* Description */}
            <p className={`text-xs transition-colors duration-200 ${isHovered ? 'text-muted-foreground' : 'text-muted-foreground/80'
              }`}>
              {study.description}
            </p>
          </div>

          {/* Badges Container */}
          <div className="flex flex-wrap items-center">
            {study.links.map((link, index) => (
              <CaseStudyLinkBadge
                key={index}
                label={link.label}
                url={link.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// Main Component: Casestudysection
const Casestudysection: React.FC = () => {
  return (
    <section className="w-full py-4 px-2 border-t border-border relative">
      <h2 className="font-bold text-h1 mb-2">Case Studies</h2>

      <div>
        {caseStudiesData.map((study) => (
          <CaseStudyItem
            key={study.id}
            study={study}
          />
        ))}
      </div>
    </section>
  );
};

export default Casestudysection;