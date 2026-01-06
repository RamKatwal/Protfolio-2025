'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PersonalProjectData } from '@/types';
import projectsMarqueeData from '@/data/projectsMarquee.json';

const projects: PersonalProjectData[] = projectsMarqueeData as PersonalProjectData[];

// Duplicate items to create a seamless infinite loop
// Two sets ensure that when the first set moves off-screen, the second identical set is ready
const loopedProjects = [...projects, ...projects];

const ProjectsMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollPos, setStartScrollPos] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Calculate the width of one set of projects
    const singleSetWidth = content.scrollWidth / 2;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default vertical scrolling
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      lastScrollTimeRef.current = now;

      // Mark that user is scrolling
      setIsUserScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Update scroll position (convert vertical scroll to horizontal)
      setScrollPosition((prev) => {
        let newPos = prev + e.deltaY * 0.5; // Adjust scroll speed
        
        // Handle infinite loop: if we've scrolled past one set, reset
        if (newPos >= singleSetWidth) {
          newPos = newPos - singleSetWidth;
        } else if (newPos <= -singleSetWidth) {
          newPos = newPos + singleSetWidth;
        }
        
        return newPos;
      });
      
      // Reset to automatic animation after 2 seconds of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
        // Smoothly reset to a position that aligns with animation start
        setScrollPosition((prev) => {
          // Normalize to 0-50% range for seamless animation restart
          const normalized = prev % singleSetWidth;
          return normalized < 0 ? normalized + singleSetWidth : normalized;
        });
      }, 2000);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle drag-to-scroll
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const singleSetWidth = content.scrollWidth / 2;

    const handleMouseDown = (e: MouseEvent) => {
      // Only start dragging on left mouse button
      if (e.button !== 0) return;
      
      hasDraggedRef.current = false;
      setIsDragging(true);
      setStartX(e.clientX);
      setStartScrollPos(scrollPosition);
      setIsUserScrolling(true);
      
      // Prevent text selection while dragging
      e.preventDefault();
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      e.preventDefault();
      
      const diff = startX - e.clientX; // Inverted: drag right = scroll left
      
      // Mark that user has dragged if movement is significant
      if (Math.abs(diff) > 5) {
        hasDraggedRef.current = true;
      }
      
      let newPos = startScrollPos + diff;
      
      // Handle infinite loop
      if (newPos >= singleSetWidth) {
        newPos = newPos - singleSetWidth;
        setStartScrollPos(newPos);
        setStartX(e.clientX);
      } else if (newPos <= -singleSetWidth) {
        newPos = newPos + singleSetWidth;
        setStartScrollPos(newPos);
        setStartX(e.clientX);
      }
      
      setScrollPosition(newPos);
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      
      // Reset drag flag after a short delay to allow click events
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
      
      // Reset to automatic animation after 2 seconds of no interaction
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
        setScrollPosition((prev) => {
          const normalized = prev % singleSetWidth;
          return normalized < 0 ? normalized + singleSetWidth : normalized;
        });
      }, 2000);
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        // Reset to automatic animation after timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false);
          setScrollPosition((prev) => {
            const normalized = prev % singleSetWidth;
            return normalized < 0 ? normalized + singleSetWidth : normalized;
          });
        }, 2000);
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging, startX, startScrollPos, scrollPosition]);

  // Apply transform based on scroll position or animation
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (isUserScrolling) {
      // Manual scrolling: use transform and disable animation
      content.style.transform = `translateX(-${scrollPosition}px)`;
      content.style.animation = 'none';
      content.classList.remove('marquee-content');
    } else {
      // Automatic animation: enable CSS animation
      content.style.transform = '';
      content.style.animation = '';
      content.classList.add('marquee-content');
    }
  }, [scrollPosition, isUserScrolling]);

  if (!projects.length) return null;

  return (
    <section className="w-full py-4 px-4 border-t border-gray-200">
      <h2 className="text-sm font-bold">Projects</h2>
      <p className="text-gray-500 mb-3 text-xs">
        Products I have worked on.
      </p>

      <div 
        ref={containerRef} 
        className={`relative overflow-hidden ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        style={{ userSelect: isDragging ? 'none' : 'auto' }}
      >
        {/* Fade edges for a softer look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={contentRef}
          className="flex w-max"
        >
          {loopedProjects.map((project, index) => (
            <a
              key={`${project.id}-${index}`}
              href={project.url}
              target={project.url ? '_blank' : undefined}
              rel={project.url ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center justify-start min-w-[140px] flex-shrink-0"
              onClick={(e) => {
                // Prevent link navigation if user was dragging
                if (hasDraggedRef.current) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50 transition-all duration-200 group-hover:border-gray-300 group-hover:bg-gray-100">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-[10px] text-gray-400 px-2 text-center">
                    {project.title}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] text-gray-800 text-center line-clamp-2 group-hover:text-gray-900">
                {project.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsMarquee;


