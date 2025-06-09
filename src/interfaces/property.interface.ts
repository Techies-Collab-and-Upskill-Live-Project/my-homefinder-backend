import { PropertyType } from '@prisma/client';

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
