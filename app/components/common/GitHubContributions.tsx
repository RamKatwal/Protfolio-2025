'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const GITHUB_CONTRIBUTIONS_API = 'https://github-contributions-api.deno.dev';
const WEEK_WIDTH_PX = 14;
const MONTH_LABELS: { name: string; week: number; offset: number }[] = [
  { name: 'Jan', week: 0, offset: 8 },
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
  { name: 'Dec', week: 49, offset: 0 },
];
const DAY_LABELS = [
  { label: 'Mon', topPx: 17 },
  { label: 'Wed', topPx: 51 },
  { label: 'Fri', topPx: 82 },
];

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

function useGitHubContributions(username: string) {
  const [mounted, setMounted] = useState(false);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchGraph = useCallback(async () => {
    if (!username) return;
    try {
      setIsLoading(true);
      setError(false);
      const url = `${GITHUB_CONTRIBUTIONS_API}/${username}.svg?year=2026&no-total=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const text = await res.text();
      setSvgContent(text);
    } catch (err) {
      console.error('GitHub contributions fetch error:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (!mounted || !username) return;
    fetchGraph();
  }, [mounted, username, fetchGraph]);

  return { mounted, username, svgContent, isLoading, error };
}

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------

function GraphDayLabels() {
  return (
    <div
      className="absolute left-0 text-[10px] text-muted-foreground leading-none"
      style={{ width: 24, paddingTop: 20 }}
      aria-hidden
    >
      {DAY_LABELS.map(({ label, topPx }) => (
        <div key={label} className="absolute left-0" style={{ top: topPx }}>
          {label}
        </div>
      ))}
    </div>
  );
}

function GraphMonthLabels() {
  return (
    <div className="absolute top-0 left-0 right-0 h-5" aria-hidden>
      {MONTH_LABELS.map((month) => (
        <div
          key={month.name}
          className="text-[10px] text-muted-foreground leading-none absolute"
          style={{
            left: month.week * WEEK_WIDTH_PX + month.offset,
            top: 2,
          }}
        >
          {month.name}
        </div>
      ))}
    </div>
  );
}

function ContributionGraph({ svgContent }: { svgContent: string }) {
  return (
    <div className="relative">
      <GraphDayLabels />
      <div className="ml-6 relative">
        <GraphMonthLabels />
        <div
          className="w-full h-auto dark:opacity-80 dark:invert-[.9]"
          style={{ marginTop: 18 }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-start h-32 px-4">
      <span className="text-xs text-muted-foreground">Loading contributions…</span>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-center justify-start h-32 px-4">
      <span className="text-xs text-muted-foreground">Failed to load contributions.</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

export interface GitHubContributionsProps {
  username?: string;
  isEmbedded?: boolean;
}

export default function GitHubContributions({
  username: usernameProp,
  isEmbedded = false,
}: GitHubContributionsProps) {
  const fallback = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? '';
  const username = usernameProp ?? fallback;
  const { mounted, svgContent, isLoading, error } = useGitHubContributions(username);

  if (!mounted || !username) {
    return null;
  }

  const sectionClass = isEmbedded
    ? 'w-full p-4 md:p-6'
    : 'w-full py-4 px-2 border-t border-border pb-24 md:pb-8';

  return (
    <section className={sectionClass}>
      {!isEmbedded && (
        <h2 className="text-sm font-bold mb-2 text-foreground">GitHub</h2>
      )}

      <div className="w-full overflow-x-auto">
        <div className="min-w-full rounded-lg border border-border bg-background p-4 min-h-[150px]">
          {isLoading && <LoadingState />}
          {error && <ErrorState />}
          {!isLoading && !error && svgContent && (
            <ContributionGraph svgContent={svgContent} />
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View on GitHub
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
