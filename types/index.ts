export interface LinkData {
  label: string;
  url: string;
}

export interface CaseStudyData {
  id: number;
  title: string;
  description: string;
  logo?: string; // Optional logo image path
  previewImage?: string; // Optional preview image for hover effect
  links: LinkData[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  views: string;
  image?: string; // Optional image for the detail view
  slug?: string; // Slug for MDX-based posts
  content?: string; // MDX content
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  count?: number;
  isActive?: boolean;
}

export interface ExperienceData {
  id: number;
  title: string;
  company: string;
  period: string;
  points: string[];
  logo?: string; // Optional logo image path
}