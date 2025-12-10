
export enum TourCategory {
  STUDY = 'STUDY',
  TOURISM = 'TOURISM',
  BUSINESS = 'BUSINESS'
}

export interface Tour {
  id: string;
  // Chinese Content
  title: string;
  subtitle: string;
  location: string;
  description: string;
  features: string[];
  itinerary: { day: number; title: string; desc: string }[];
  
  // English Content
  title_en: string;
  subtitle_en: string;
  location_en: string;
  description_en: string;
  features_en: string[];
  itinerary_en: { day: number; title: string; desc: string }[];

  // Common Data
  category: TourCategory;
  price: number; // Base Group Price
  privatePrice: number; // Base Private Tour Price
  originalPrice: number;
  days: number;
  image: string;
  
  // Group Logic
  minGroupSize: number;
  currentGroupSize: number;
  maxGroupSize: number;
  startDate: string; // Fixed date for Group tours
  
  cashbackRate: number;
  commissionRate: number;
}

export interface Region {
  id: string;
  name: string;
  name_en: string;
  x: number; // Map X percentage (0-100)
  y: number; // Map Y percentage (0-100)
  description: string;
  description_en: string;
  cultureTag: string;
  cultureTag_en: string;
  image: string;
  linkedTourIds: string[]; // IDs of tours that visit this region
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  walletBalance: number;
  referralCode: string;
  isMember: boolean;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  date: string;
  participants: number;
  totalPrice: number;
  type: 'GROUP' | 'PRIVATE'; // New field to track booking type
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
