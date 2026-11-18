export interface Profile {
  id: number;
  full_name: string;
  brand_name: string;
  professional_title: string;
  location: string;
  hero_eyebrow: string;
  hero_heading_line1: string;
  hero_heading_line2: string;
  hero_description: string;
  profile_picture?: string | null;
  profile_picture_url?: string | null;
  profile_picture_legacy: string;
  about_section_index: string;
  about_description: string;
  about_note: string;
  about_cta_text: string;
  email: string;
  phone: string;
  location_display: string;
  location_url: string;
  services_intro: string;
  footer_text: string;
  copyright_text: string;
  resume_file?: string | null;
  resume_file_url?: string | null;
  seo_meta_title: string;
  seo_meta_description: string;
  seo_keywords: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: number;
  title: string;
  project_type: string;
  description: string;
  image?: string | null;
  image_url?: string | null;
  image_legacy?: string;
  technologies: string;
  github_url: string;
  live_url: string;
  order: number;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
  order: number;
  skills?: Skill[];
}

export interface Skill {
  id: number;
  category: number;
  category_title?: string;
  name: string;
  icon_image?: string | null;
  icon_url?: string | null;
  icon_legacy?: string;
  order: number;
}

export interface Service {
  id: number;
  service_number: string;
  title: string;
  description: string;
  items: string[];
  order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number | string;
  rating_stars: string;
  quote: string;
  image?: string | null;
  image_url?: string | null;
  image_legacy?: string;
  company_or_role: string;
  order: number;
}

export interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon_name: string;
  order: number;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  period: string;
  description: string;
  order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
  description: string;
  order: number;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  credential_id: string;
  order: number;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  services: Service[];
  skill_groups: SkillCategory[];
  testimonials: Testimonial[];
  social_links: SocialLink[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}

export interface DashboardOverview {
  projects_count: number;
  skills_count: number;
  categories_count: number;
  services_count: number;
  testimonials_count: number;
  messages_count: number;
  last_updated: string | null;
  full_name: string;
  professional_title: string;
}
