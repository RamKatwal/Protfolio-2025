import React from 'react';
import { CaseStudyData } from '@/types'; 
import caseStudies from '@/data/caseStudies.json';
import { Badge } from '@/app/components/ui/badge';
import Link from 'next/link'; 

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
  const variant = 'default'; 
  const spacingClass = 'mr-2 mb-2'; // Tailwind spacing for layout

  return (
    // Use Next.js Link component for client-side navigation
    <Link 
      href={url}
      target={url.startsWith('/') ? '_self' : '_blank'} 
      rel={url.startsWith('/') ? '' : 'noopener noreferrer'}
    >
      <Badge 
        variant={variant} 
        className={`${spacingClass} cursor-pointer hover:bg-gray-50 transition-colors`}
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
  return (
    <div className="mb-8">
      {/* Project Title (e.g., Puffless App) */}
      <h3 className="text-sm font-medium">{study.title}</h3> 
      
      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {study.description}
      </p>
      
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
  );
};


// --- Main Component: Casestudysection ---
const Casestudysection: React.FC = () => {
  return (
    <section className="w-full py-4 px-4 border-t border-gray-200 pb-8">
      {/* Main Section Heading */}
      <h2 className="text-2xl font-bold">Case Studies</h2>
      
      {/* Subtext from the image */}
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
        Your personal playlists. Updated daily.
      </p>
      
      <div className="space-y-6">
        {/* Map over the case studies data and render the items */}
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