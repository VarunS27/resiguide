import type { LucideIcon } from 'lucide-react';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  agentId?: string;
  type: 'Sale' | 'Rent';
  amenities: string[];
  dataAiHint?: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  image: string;
  expertise: string[];
  bio: string;
  dataAiHint?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
  dataAiHint?: string;
}

export interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}
