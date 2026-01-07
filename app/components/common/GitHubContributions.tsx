'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface GitHubContributionsProps {
  username?: string;
}

const GitHubContributions: React.FC<GitHubContributionsProps> = ({ 
  username 
}) => {
  const [mounted, setMounted] = useState(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const githubUsername = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME || '';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !githubUsername) return;

    const fetchSvg = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const contributionGraphUrl = `https://github-contributions-api.deno.dev/${githubUsername}.svg?year=2026&no-total=true`;
        const response = await fetch(contributionGraphUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch contribution graph');
        }
        
        const svg = await response.text();
        setSvgContent(svg);
      } catch (err) {
        console.error('Failed to load GitHub contribution graph:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSvg();
  }, [mounted, githubUsername]);

  if (!mounted || !githubUsername) {
    return null;
  }

  return (
    <section className="w-full py-4 px-4 border-t border-gray-200 pb-24 md:pb-8">
      <h2 className="text-sm font-bold mb-2">GitHub</h2>
      
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          {/* GitHub-style contribution grid with month and day labels */}
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4" style={{ minHeight: '150px' }}>
            {isLoading && (
              <div className="flex items-center justify-start h-32 px-4">
                <div className="text-gray-400 text-xs">Loading contributions...</div>
              </div>
            )}
            {error && (
              <div className="flex items-center justify-start h-32 px-4">
                <div className="text-gray-400 text-xs">Failed to load contributions</div>
              </div>
            )}
            {!isLoading && !error && svgContent && (
              <div className="relative">
                {/* Day labels on the left - Mon (2nd row), Wed (4th row), Fri (6th row) */}
                <div className="absolute left-0" style={{ width: '24px', paddingTop: '20px' }}>
                  {/* Mon - 2nd row (index 1) */}
                  <div
                    className="text-[10px] text-gray-500 leading-none absolute"
                    style={{
                      top: '17px', // Row 1 position: 14px (row 0) + 3px gap = 17px
                      left: '0'
                    }}
                  >
                    Mon
                  </div>
                  {/* Wed - 4th row (index 3) */}
                  <div
                    className="text-[10px] text-gray-500 leading-none absolute"
                    style={{
                      top: '51px', // Row 3 position: 17px (row 1) + 14px + 3px + 14px + 3px = 51px
                      left: '0'
                    }}
                  >
                    Wed
                  </div>
                  {/* Fri - 6th row (index 5) */}
                  <div
                    className="text-[10px] text-gray-500 leading-none absolute"
                    style={{
                      top: '82px', // Row 5 position: moved up slightly
                      left: '0'
                    }}
                  >
                    Fri
                  </div>
                </div>
                
                {/* Month labels and SVG Chart */}
                <div className="ml-6 relative">
                  {/* Month labels row - positioned at the top */}
                  <div className="absolute top-0 left-0 right-0" style={{ height: '20px' }}>
                    {(() => {
                      // Calculate week positions for each month in 2026
                      const months = [
                        { name: 'Jan', week: 0, offset: 8 }, // Move Jan a little to the right
                        { name: 'Feb', week: 4, offset: 0 },
                        { name: 'Mar', week: 9, offset: 0 },
                        { name: 'Apr', week: 13, offset: 0 },
                        { name: 'May', week: 18, offset: 0 },
                        { name: 'Jun', week: 22, offset: 0 },
                        { name: 'Jul', week: 27, offset: 0 },
                        { name: 'Aug', week: 31, offset: 0 },
                        { name: 'Sep', week: 36, offset: 0 },
                        { name: 'Oct', week: 40, offset: 0 },
                        { name: 'Nov', week: 44, offset: 0 },
                        { name: 'Dec', week: 49, offset: 0 }
                      ];
                      
                      // Each week column is approximately 14px wide (11px box + 3px gap)
                      const weekWidth = 14;
                      
                      return months.map((month, index) => (
                        <div
                          key={month.name}
                          className="text-[10px] text-gray-500 leading-none absolute"
                          style={{
                            left: `${month.week * weekWidth + month.offset}px`,
                            top: '2px'
                          }}
                        >
                          {month.name}
                        </div>
                      ));
                    })()}
                  </div>
                  
                  {/* SVG Chart */}
                  <div 
                    className="w-full h-auto"
                    style={{ marginTop: '18px' }}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-start">
        <Link
          href="https://github.com/RamKatwal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          View on GitHub
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default GitHubContributions;
