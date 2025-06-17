export enum StarRating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

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