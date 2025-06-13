export interface CreateReviewInput {
  reviewerId: string;
  userId?: string;
  propertyId?: string;
  rating: number;
  comment: string;
}

export interface ReviewFilter {
  userId?: string;
  propertyId?: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}