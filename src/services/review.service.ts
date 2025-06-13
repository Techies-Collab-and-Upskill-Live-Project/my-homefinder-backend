import { prisma } from '../prisma/prisma';
import { CreateReviewInput, ReviewFilter } from '../interfaces/review.interface';
import HTTPException from '../exceptions/http.exception';
import { StatusCodes } from 'http-status-codes';

export class ReviewService {
  async createReview(data: CreateReviewInput) {
    // Validate rating range
    if (data.rating < 1 || data.rating > 5) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Rating must be between 1 and 5');
    }

    // Ensure exactly one target (user or property) is specified
    if ((!data.userId && !data.propertyId) || (data.userId && data.propertyId)) {
      throw new HTTPException(
        StatusCodes.BAD_REQUEST,
        'Review must target either a user or a property'
      );
    }

    try {
      const review = await prisma.review.create({
        data,
        include: {
          reviewer: true,
          user: true,
          property: true,
        },
      });
      return review;
    } catch (error) {
      throw new HTTPException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to create review'
      );
    }
  }

  async getReviews(filter: ReviewFilter) {
    try {
      const reviews = await prisma.review.findMany({
        where: filter,
        include: {
          reviewer: true,
          user: true,
          property: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      return reviews;
    } catch (error) {
      throw new HTTPException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to fetch reviews'
      );
    }
  }

  async getUserAverageRating(userId: string): Promise<number> {
    try {
      const result = await prisma.review.aggregate({
        where: { userId },
        _avg: {
          rating: true,
        },
      });
      return result._avg.rating || 0;
    } catch (error) {
      throw new HTTPException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to calculate average rating'
      );
    }
  }

  async getPropertyAverageRating(propertyId: string): Promise<number> {
    try {
      const result = await prisma.review.aggregate({
        where: { propertyId },
        _avg: {
          rating: true,
        },
      });
      return result._avg.rating || 0;
    } catch (error) {
      throw new HTTPException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to calculate average rating'
      );
    }
  }
}