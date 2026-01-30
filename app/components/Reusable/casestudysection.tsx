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
  const variant = 'secondary';
  // Use zinc colors to ensure the "gray" look in light mode and appropriate contrast in dark mode
  // bg-secondary is usually light gray, but we reinforce with zinc-100/200 logic if needed or rely on secondary.
  // User asked for "gray badge" and "check hover". 
  // secondary = bg-secondary (zinc-100ish). hover = bg-secondary/80.
  // We will override hover to be darker (zinc-200) for better feedback.
  // User asked to explicitly ensure "little gray" on light hover and fix any "red" issue.
  // We use standard tailwind zinc colors.
  const spacingClass = 'mr-2 mb-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-200';
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
            className={`${spacingClass} cursor-pointer transition-colors`}
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