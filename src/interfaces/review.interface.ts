import { StarRating } from '../generated/prisma';

export interface CreateReviewInput {
  reviewerId: string;
  propertyId: string;
  rating: StarRating;
  comment: string;
}

export interface ReviewFilter {
  propertyId?: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}