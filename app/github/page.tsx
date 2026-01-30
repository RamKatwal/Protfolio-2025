import type { Metadata } from 'next';
import GitHubContributions from '@/app/components/common/GitHubContributions';

const GITHUB_USERNAME = 'RamKatwal';

export const metadata: Metadata = {
  title: 'GitHub',
  description: 'GitHub contribution activity',
};

export default function GitHubPage() {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-background text-foreground flex">
      <div className="w-full max-w-4xl min-h-[calc(100vh-56px)] bg-background flex flex-col items-start border-r border-border">
        <GitHubContributions username={GITHUB_USERNAME} isEmbedded />
      </div>
    </div>
  );
}
