import type { NavLink, Property, Agent, BlogPost, SocialLink } from './types';
import { LayoutDashboard, Home, Users, FileText, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'; // Removed MessageSquare

export const APP_NAME = 'ResiGuide';

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/properties', label: 'Properties', icon: Home },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/blog', label: 'Blog', icon: FileText },
  // { href: '/chat', label: 'AI Assistant', icon: MessageSquare }, // Removed AI Assistant
  { href: '/contact', label: 'Contact', icon: Phone },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
];

export const CONTACT_EMAIL = "contact@resiguide.com";
export const CONTACT_PHONE = "+91 9228869697";
export const COMPANY_ADDRESS = "New Link rouad, Andheri West, 400053";


export const DUMMY_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Villa with Ocean View',
    description: 'A stunning modern villa offering breathtaking ocean views, spacious living areas, and luxurious amenities. Perfect for those seeking an exclusive coastal lifestyle.',
    price: 2500000,
    image: 'https://picsum.photos/seed/property1/600/400',
    dataAiHint: 'modern villa',
    location: 'Malibu, California',
    bedrooms: 5,
    bathrooms: 5.5,
    sqft: 6000,
    agentId: '1',
    type: 'Sale',
    amenities: ['Infinity Pool', 'Home Theater', 'Smart Home System', 'Private Beach Access', 'Gourmet Kitchen']
  },
  {
    id: '2',
    title: 'Chic Downtown Penthouse',
    description: 'Experience urban luxury in this chic penthouse located in the heart of downtown. Features floor-to-ceiling windows, a private terrace, and high-end finishes.',
    price: 1800000,
    image: 'https://picsum.photos/seed/property2/600/400',
    dataAiHint: 'urban penthouse',
    location: 'New York, New York',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3200,
    agentId: '2',
    type: 'Sale',
    amenities: ['Rooftop Terrace', 'Concierge Service', 'Fitness Center', 'Panoramic City Views', 'Valet Parking']
  },
  {
    id: '3',
    title: 'Cozy Suburban Family Home',
    description: 'A charming and spacious family home in a quiet suburban neighborhood. Features a large backyard, modern kitchen, and excellent school district.',
    price: 850000,
    image: 'https://picsum.photos/seed/property3/600/400',
    dataAiHint: 'family home',
    location: 'Austin, Texas',
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2800,
    agentId: '1',
    type: 'Sale',
    amenities: ['Large Backyard', 'Updated Kitchen', 'Two-Car Garage', 'Fireplace', 'Community Park']
  },
  {
    id: '4',
    title: 'Luxury Apartment for Rent',
    description: 'Stylish and modern apartment in a prime location, available for rent. Includes access to building amenities like a gym and pool.',
    price: 5000, // Per month
    image: 'https://picsum.photos/seed/property4/600/400',
    dataAiHint: 'luxury apartment',
    location: 'San Francisco, California',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    agentId: '3',
    type: 'Rent',
    amenities: ['Gym Access', 'Swimming Pool', 'In-unit Laundry', 'Balcony', 'Secure Parking']
  },
];

export const DUMMY_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Alice Wonderland',
    title: 'Senior Real Estate Advisor',
    phone: '(555) 111-2222',
    email: 'alice@resiguide.com',
    image: 'https://picsum.photos/seed/agent1/300/300',
    dataAiHint: 'professional woman',
    expertise: ['Luxury Homes', 'Coastal Properties', 'Investment'],
    bio: 'With over 15 years of experience in the luxury real estate market, Alice has a proven track record of success and a deep understanding of client needs. She specializes in high-end coastal properties and investment opportunities.'
  },
  {
    id: '2',
    name: 'Bob The Builder',
    title: 'Urban Living Specialist',
    phone: '(555) 333-4444',
    email: 'bob@resiguide.com',
    image: 'https://picsum.photos/seed/agent2/300/300',
    dataAiHint: 'professional man',
    expertise: ['Penthouses', 'Downtown Condos', 'New Developments'],
    bio: 'Bob is an expert in urban living, focusing on penthouses, downtown condos, and new developments. His keen eye for detail and market knowledge make him a valuable asset for clients seeking city life.'
  },
  {
    id: '3',
    name: 'Carol Danvers',
    title: 'Rental Market Expert',
    phone: '(555) 555-6666',
    email: 'carol@resiguide.com',
    image: 'https://picsum.photos/seed/agent3/300/300',
    dataAiHint: 'smiling woman',
    expertise: ['Luxury Rentals', 'Relocation Services', 'Property Management'],
    bio: 'Carol specializes in the luxury rental market and relocation services. She is dedicated to finding the perfect rental properties for her clients and ensuring a smooth transition process.'
  },
];

export const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'top-5-features-in-luxury-homes-2024',
    title: 'Top 5 Features Buyers Look for in Luxury Homes in 2024',
    date: '2024-07-15',
    author: 'Alice Wonderland',
    excerpt: 'Discover the must-have features that are captivating luxury home buyers this year, from smart home technology to sustainable design.',
    content: 'The luxury real estate market is constantly evolving. In 2024, buyers are seeking more than just square footage and a prime location. They desire homes that offer a blend of cutting-edge technology, sustainability, wellness amenities, and personalized spaces. Here are the top 5 features: 1. Smart Home Integration... 2. Sustainable and Eco-Friendly Design... 3. Wellness Amenities (Home Gyms, Spas)... 4. Outdoor Living Spaces... 5. Home Offices & Flex Spaces...',
    image: 'https://picsum.photos/seed/blog1/800/400',
    dataAiHint: 'luxury interior',
    tags: ['Luxury Homes', 'Market Trends', 'Buyers Guide']
  },
  {
    slug: 'navigating-the-urban-real-estate-market',
    title: 'Navigating the Urban Real Estate Market: A Guide for First-Time Buyers',
    date: '2024-06-28',
    author: 'Bob The Builder',
    excerpt: 'Buying your first home in a bustling city can be daunting. This guide provides essential tips for navigating the urban real estate landscape.',
    content: 'The allure of city living is undeniable, but the real estate market can be complex. For first-time buyers, it\'s crucial to be prepared. This guide covers: 1. Understanding Your Budget... 2. Choosing the Right Neighborhood... 3. Working with an Urban Specialist Agent... 4. The Importance of Viewings... 5. Making a Competitive Offer...',
    image: 'https://picsum.photos/seed/blog2/800/400',
    dataAiHint: 'city skyline',
    tags: ['Urban Living', 'First-Time Buyers', 'Real Estate Tips']
  },
  {
    slug: 'benefits-of-professional-property-management',
    title: 'The Benefits of Professional Property Management for Your Rental Investment',
    date: '2024-05-10',
    author: 'Carol Danvers',
    excerpt: 'Learn how professional property management can save you time, reduce stress, and maximize the return on your rental investments.',
    content: 'Owning rental properties can be a lucrative investment, but it also comes with significant responsibilities. Professional property management services offer numerous benefits, including: 1. Tenant Screening... 2. Rent Collection... 3. Property Maintenance... 4. Legal Compliance... 5. Reduced Vacancy Rates...',
    image: 'https://picsum.photos/seed/blog3/800/400',
    dataAiHint: 'apartment building',
    tags: ['Property Management', 'Rental Income', 'Investment']
  },
];
