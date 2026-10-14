export type ServiceCategory =
  | 'Web Development'
  | 'Web/App Development'
  | 'Video Editing'
  | 'Digital Analytics';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category?: ServiceCategory;
  description: string;
  capabilities?: string[];
  bgColor: string;
  rotationDeg: number;
}

export type ArtDirectionType = 'web' | 'app' | 'video' | 'analytics';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  discipline: string;
  artType: ArtDirectionType;
  stagger?: boolean;
}

export interface ArchiveItem {
  id: string;
  year: string;
  name: string;
  category: ServiceCategory;
  role: string;
}

export interface EnquirySubmission {
  name: string;
  email: string;
  services: ServiceCategory[];
}

export interface SocialLink {
  name: string;
  url: string;
  external?: boolean;
}
