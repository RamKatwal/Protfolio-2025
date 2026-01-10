'use client';

import React, { useState } from 'react';
import { ExperienceData } from '@/types';
import experienceData from '@/data/experience.json';
import { ChevronRightIcon } from './icons';
import Image from 'next/image';

const experiences: ExperienceData[] = experienceData as ExperienceData[];

interface ExperienceItemProps {
  experience: ExperienceData;
  isOpen: boolean;
  onToggle: () => void;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isOpen, onToggle }) => {
  return (
    <div className="border-b border-border last:border-b-0">
      <div className="flex gap-3 items-start">
        {/* Logo */}
        {experience.logo && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-border flex items-center justify-center bg-muted mt-3">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={40}
              height={40}
              className="w-full h-full object-contain p-1.5"
            />
          </div>
        )}

        <button
          onClick={onToggle}
          className="flex-1 flex items-center py-3 px-0 hover:bg-transparent transition-colors group cursor-pointer"
        >
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-xs font-medium text-foreground">{experience.title}</h3>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{experience.company}</span>
            </div>
            <p className="text-xs text-muted-foreground">{experience.period}</p>
          </div>
          <div
            className={`ml-2 w-4 h-4 flex-shrink-0 transition-transform duration-200 text-muted-foreground group-hover:text-foreground ${isOpen ? 'rotate-90' : ''
              }`}
          >
            <ChevronRightIcon />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="pt-2 pb-4 pl-0">
          <ul className="space-y-2">
            {experience.points.map((point, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start leading-relaxed">
                <span className="mr-2.5 text-muted-foreground/60 mt-0.5">•</span>
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
    <section className="w-full py-4 px-2 border-t border-border pb-8">
      <h2 className="text-sm font-bold">Experience</h2>
      <p className="text-muted-foreground mb-2 text-xs">
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

