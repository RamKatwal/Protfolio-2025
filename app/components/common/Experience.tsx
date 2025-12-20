'use client';

import React, { useState } from 'react';
import { ExperienceData } from '@/types';
import experienceData from '@/data/experience.json';
import { ChevronRightIcon } from './icons';

const experiences: ExperienceData[] = experienceData as ExperienceData[];

interface ExperienceItemProps {
  experience: ExperienceData;
  isOpen: boolean;
  onToggle: () => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-0 hover:bg-transparent transition-colors group cursor-pointer"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm font-medium text-gray-900">{experience.title}</h3>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-gray-600">{experience.company}</span>
          </div>
          <p className="text-xs text-gray-500">{experience.period}</p>
        </div>
        <div
          className={`ml-4 w-4 h-4 flex-shrink-0 transition-transform duration-200 text-gray-400 group-hover:text-gray-600 ${
            isOpen ? 'rotate-90' : ''
          }`}
        >
          <ChevronRightIcon />
        </div>
      </button>
      
      {isOpen && (
        <div className="pt-2 pb-4 pl-0">
          <ul className="space-y-2">
            {experience.points.map((point, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start leading-relaxed">
                <span className="mr-2.5 text-gray-400 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Experience: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="w-full py-4 px-4 border-t border-gray-200 pb-8">
      <h2 className="text-base font-bold mb-2">Experience</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-xs">
        My professional journey and key achievements.
      </p>
      
      <div className="space-y-0">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            isOpen={openItems.has(experience.id)}
            onToggle={() => toggleItem(experience.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;

