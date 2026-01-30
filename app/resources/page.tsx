const NOTION_RESOURCES_URL =
  "https://beneficial-ricotta-c8e.notion.site/Design-Resources-Database-292b972ca4c24227b5edbd287109add8?pvs=143";

export default function ResourcesPage() {
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)] flex flex-col px-4 py-2 md:px-6 md:py-4 bg-background">
      <div className="flex-1 min-h-0 rounded-xl border border-border overflow-hidden bg-background transition-colors duration-300">
        <iframe
          src={NOTION_RESOURCES_URL}
          title="Design Resources Database"
          className="w-full h-full border-0 rounded-xl"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
