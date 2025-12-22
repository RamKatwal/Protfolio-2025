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
  onHover: (study: CaseStudyData | null, position: { x: number; y: number }) => void;
  isHovered: boolean;
}

const CaseStudyItem: React.FC<CaseStudyItemProps> = ({ study, onHover, isHovered }) => {
  const handleContentMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (study.previewImage) {
      onHover(study, {
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleContentMouseLeave = () => {
    onHover(null, { x: 0, y: 0 });
  };

  const handleContentMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (study.previewImage) {
      onHover(study, {
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  return (
    <div className={`py-2 border-b border-gray-200 last:border-b-0 transition-all duration-200 ease-out ${
      isHovered ? 'bg-gray-50/50 rounded-lg -mx-2 px-2 shadow-sm' : ''
    }`}>
      <div className="flex gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Description Container */}
          <div
            className="cursor-pointer"
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={handleContentMouseLeave}
            onMouseMove={handleContentMouseMove}
          >
            {/* Project Title (e.g., Puffless App) */}
            <h3 className={`text-sm font-medium transition-colors duration-200 ${
              isHovered ? 'text-gray-900' : ''
            }`}>
              {study.title}
            </h3> 
            
            {/* Description */}
            <p className={`text-xs transition-colors duration-200 ${
              isHovered ? 'text-gray-700' : 'text-gray-600'
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
        
        {/* Logo */}
        {study.logo && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border flex items-center justify-center transition-all duration-200 ${
            isHovered ? 'border-gray-300 bg-gray-100 shadow-sm scale-105' : 'border-gray-200 bg-gray-50'
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
      </div>
    </div>
  );
};


// --- Main Component: Casestudysection ---
const Casestudysection: React.FC = () => {
  const [hoveredStudy, setHoveredStudy] = useState<CaseStudyData | null>(null);
  const [imagePosition, setImagePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleHover = (study: CaseStudyData | null, position: { x: number; y: number }) => {
    setHoveredStudy(study);
    setImagePosition(position);
  };

  return (
    <section className="w-full py-4 px-4 border-t border-gray-200 relative">
      <h2 className="font-bold text-h1">Case Studies</h2>
      
      {/* Subtext from the image */}
      <p className="text-gray-500 mb-4 text-xs">
        Your personal playlists. Updated daily.
      </p>
      
      <div>
        {/* Map over the case studies data and render the items */}
        {caseStudiesData.map((study) => (
          <CaseStudyItem
            key={study.id}
            study={study}
            onHover={handleHover}
            isHovered={hoveredStudy?.id === study.id}
          />
        ))}
      </div>

      {/* Floating Preview Image */}
      {hoveredStudy?.previewImage && (
        <div
          className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
          style={{
            transform: 'translateY(-10%)',
            left: `${imagePosition.x}px`,
            top: `${imagePosition.y - 180}px`,
            opacity: hoveredStudy ? 1 : 0,
            willChange: 'transform, opacity',
          }}
        >
          <div className="relative w-64 h-40 rounded-lg overflow-hidden shadow-2xl border border-gray-200 bg-white transition-transform duration-200">
            <Image
              src={hoveredStudy.previewImage}
              alt={hoveredStudy.title}
              fill
              className="object-cover transition-transform duration-200"
              sizes="256px"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Casestudysection;