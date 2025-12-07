'use client';

import { useState } from 'react';
import WritingFeed from "@/app/components/Reusable/writingfeed";
import { BLOG_POSTS } from "@/app/constants";

export default function WritingPage() {
  const [activePostId, setActivePostId] = useState<string>(BLOG_POSTS[0]?.id || '');

  const handleSelectPost = (id: string) => {
    setActivePostId(id);
  };

  return (
    <div className="max-w-[35vw] h-full bg-white flex flex-col items-start border-r border-gray-200 gap-4">
      <WritingFeed 
        posts={BLOG_POSTS}
        activePostId={activePostId}
        onSelectPost={handleSelectPost}
      />
    </div>
  );
}
