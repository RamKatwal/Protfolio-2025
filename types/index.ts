export interface LinkData {
  label: string;
  url: string;
}

export interface CaseStudyData {
  id: number;
  title: string;
  description: string;
  links: LinkData[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  views: string;
  image?: string; // Optional image for the detail view
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  count?: number;
  isActive?: boolean;
}