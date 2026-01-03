'use client';

import React, { useState, useEffect } from 'react';
import { CaseStudyData } from '@/types'; 
import caseStudies from '@/data/caseStudies.json';
import { Badge } from '@/app/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { PasswordModal } from '@/app/components/ui/password-modal'; 

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const STORAGE_KEY = 'case_study_authenticated';
  const EXPECTED_PASSWORD = process.env.NEXT_PUBLIC_CASE_STUDY_PASSWORD || '';

  // Helper function to check authentication status
  const checkAuthentication = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const authStatus = localStorage.getItem(STORAGE_KEY);
      return authStatus === 'true';
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return false;
    }
  };

  // Check localStorage on mount and update state
  useEffect(() => {
    const isAuth = checkAuthentication();
    setIsAuthenticated(isAuth);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Only protect "Case Study" links
    if (label !== 'Case Study') {
      // For non-case study links, navigate directly
      if (url.startsWith('/')) {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    // For "Case Study" links, check authentication directly from localStorage
    // This ensures we always have the latest authentication status
    const isAuth = checkAuthentication();
    
    // Update state to reflect current authentication status
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      // Already authenticated, redirect immediately
      if (url.startsWith('/')) {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } else {
      // Not authenticated, show password modal
      setIsModalOpen(true);
      setErrorMessage('');
    }
  };

  const handlePasswordSubmit = (passwordInput: string) => {
    if (!EXPECTED_PASSWORD) {
      setErrorMessage('Password protection is not configured. Please contact the administrator.');
      return;
    }

    if (passwordInput === EXPECTED_PASSWORD) {
      // Password correct - store authentication and redirect
      if (typeof window !== 'undefined') {
        try {
          // Set authentication in localStorage
          localStorage.setItem(STORAGE_KEY, 'true');
          
          // Verify it was saved correctly
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved !== 'true') {
            setErrorMessage('Failed to save authentication. Please try again.');
            return;
          }
          
          // Update state immediately
          setIsAuthenticated(true);
          setIsModalOpen(false);
          setErrorMessage('');
          
          // Redirect to the URL immediately
          // localStorage.setItem is synchronous, so it's safe to redirect right away
          if (url.startsWith('/')) {
            window.location.href = url;
          } else {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        } catch (error) {
          console.error('Error saving authentication:', error);
          setErrorMessage('Failed to save authentication. Please try again.');
        }
      }
    } else {
      // Password incorrect
      setErrorMessage('Incorrect password. Please try again.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setErrorMessage('');
  };

  // For "Case Study" links, render a button instead of Link
  if (label === 'Case Study') {
    return (
      <>
        <button
          onClick={handleClick}
          className="inline-block"
        >
          <Badge 
            variant={variant} 
            className={`${spacingClass} cursor-pointer hover:bg-gray-50 transition-colors`}
          >
            {label}
          </Badge>
        </button>
        <PasswordModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handlePasswordSubmit}
          errorMessage={errorMessage}
        />
      </>
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