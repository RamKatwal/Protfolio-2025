'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlogPost } from '../../../types';

interface WritingFeedProps {
  posts: BlogPost[];
}

const WritingFeed: React.FC<WritingFeedProps> = ({ posts }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full border-r border-gray-100 bg-white">
      {/* Header Section */}
      {/* <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm px-6 py-5 flex items-center justify-between border-b border-gray-50">
        <h2 className="text-sm font-bold text-gray-900">Writing</h2>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 text-[11px] font-medium text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors">
          <Rss size={12} strokeWidth={2.5} />
          RSS feed
        </button>
      </div> */}

      {/* List Section */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-1">
        {posts.map((post) => {
          const postSlug = post.slug || post.id;
          const postPath = `/writing/${postSlug}`;
          const isActive = pathname === postPath;

          return (
            <Link
              key={post.id}
              href={postPath}
              className={`
                block group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ease-in-out
                ${isActive ? 'bg-black text-white shadow-lg' : 'hover:bg-gray-100 text-gray-900 bg-transparent'}
              `}
            >
              <h3 className={`text-[15px] font-semibold leading-snug mb-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                {post.title}
              </h3>
              
              <div className="flex items-center gap-2 text-[13px]">
                <span className={isActive ? 'text-gray-400' : 'text-gray-500'}>
                  {post.date}
                </span>
                <span className={isActive ? 'text-gray-600' : 'text-gray-300'}>•</span>
                <span className={isActive ? 'text-gray-400' : 'text-gray-500'}>
                  {post.views}
                </span>
              </div>

              {/* Subtle accent for active state */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-white/10 hidden" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WritingFeed;
