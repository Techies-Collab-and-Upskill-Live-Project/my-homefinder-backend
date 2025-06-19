import {PropertyType, User} from '../generated/prisma';

export interface PropertyFilters {
  type?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  state?: string;
  country?: string;
  isAvailable?: boolean;
}

export interface PropertyQueryOptions {
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'createdAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export  interface createPropertyData {
    title: string;
    description: string;
    price: number;
    type: PropertyType;
    city: string;
    state: string;
    country: string;
    address: string;
    landlordId: string;
    landlord: User;
}