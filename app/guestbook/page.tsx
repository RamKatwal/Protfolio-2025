import Guestbook from '@/app/components/common/Guestbook';

export default function GuestbookPage() {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-background text-foreground">
      <div className="w-full max-w-3xl bg-background flex flex-col items-start border-r border-border">
        <Guestbook isEmbedded />
      </div>
    </div>
  );
}
