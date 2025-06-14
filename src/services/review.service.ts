import { prisma } from '../prisma/prisma';
import { CreateReviewInput, ReviewFilter, StarRating } from '../interfaces/review.interface';
import HTTPException from '../exceptions/http.exception';
import { StatusCodes } from 'http-status-codes';

export class ReviewService {
  async createReview(data: CreateReviewInput) {
    // Validate property exists
    const property = await prisma.property.findUnique({
      where: { id: data.propertyId }
    });

    if (!property) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'Property not found');
    }

    try {
      const review = await prisma.review.create({
        data,
        include: {
          reviewer: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          },
          property: {
            select: {
              id: true,
              title: true,
              address: true
            }
          }
        },
      });

      // Update property's average rating
      await this.updatePropertyAverageRating(data.propertyId);

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
          reviewer: {
            select: {
              id: true,
              fullName: true
            }
          },
          property: {
            select: {
              id: true,
              title: true,
              address: true
            }
          }
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

  private async updatePropertyAverageRating(propertyId: string) {
    const avgRating = await prisma.review.aggregate({
      where: { propertyId },
      _avg: { rating: true }
    });

    await prisma.property.update({
      where: { id: propertyId },
      data: { averageRating: avgRating._avg.rating || 0 }
    });
  }
}