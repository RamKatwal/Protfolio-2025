'use client';

import React from 'react';
import { PersonalProjectData } from '@/types';
import personalProjectsData from '@/data/personalProjects.json';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const personalProjects: PersonalProjectData[] = personalProjectsData as PersonalProjectData[];

interface PersonalProjectItemProps {
  project: PersonalProjectData;
}

const PersonalProjectItem: React.FC<PersonalProjectItemProps> = ({ project }) => {
  const content = (
    <div className="flex gap-3 items-start">
      {/* Logo */}
      {project.logo && (
        <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50 mt-3">
          <Image 
            src={project.logo} 
            alt={`${project.title} logo`} 
            width={40}
            height={40}
            className="w-full h-full object-contain p-1.5"
          />
        </div>
      )}
      
      <div className="flex-1 flex items-center py-3 px-0 group">
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-xs font-medium text-gray-900">{project.title}</h3>
          </div>
          {project.description && (
            <p className="text-xs text-gray-500">{project.description}</p>
          )}
        </div>
        <div className="ml-2 w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
          <ArrowUpRight className="w-full h-full" />
        </div>
      </div>
    </div>
  );

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-gray-200 last:border-b-0 block hover:bg-transparent transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {content}
    </div>
  );
};

const PersonalProjects: React.FC = () => {
  return (
    <section className="w-full py-4 px-4 border-t border-gray-200 pb-8">
      <h2 className="text-sm font-bold">My personal projects</h2>
      <p className="text-gray-500 mb-2 text-xs">
        Personal projects and side work I&apos;ve built.
      </p>
      
      <div className="space-y-0">
        {personalProjects.map((project) => (
          <PersonalProjectItem
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
};

export default PersonalProjects;

