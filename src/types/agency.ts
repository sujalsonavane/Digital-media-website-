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
  client?: string;
  year?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  techStack?: string[];
  conceptType?: string;
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
  company?: string;
  services: ServiceCategory[];
  budget?: string;
  timeline?: string;
  message?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  external?: boolean;
  isConfigured?: boolean;
  statusNote?: string;
}

export interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  tier: 'mentor' | 'core';
  badgeLabel: string;
  subtitleRole: string;
  companyPill?: string;
  discipline: string;
  bio: string;
  fullBio?: string;
  tagline?: string;
  affiliation?: string;
  category: 'leadership' | 'development' | 'marketing' | 'video' | 'operations';
  experienceBadge?: string;
  capabilities: string[];
  initials: string;
  status: string;
  socials?: {
    name: string;
    url: string;
  }[];
}

