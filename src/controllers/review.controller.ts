import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '../services/review.service';
import { CreateReviewInput, ReviewResponse } from '../interfaces/review.interface';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from '../interfaces/auth.interface';

export class ReviewController {
  private reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  public createReview = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const reviewData: CreateReviewInput = {
        ...req.body,
        reviewerId: req.user.id, // Assuming auth middleware sets user
      };

      const review = await this.reviewService.createReview(reviewData);
      
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Review created successfully',
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  public getReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, propertyId } = req.query;
      
      if (!userId && !propertyId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Either userId or propertyId must be provided',
        });
        return;
      }

      const filter = {
        ...(userId && { userId: String(userId) }),
        ...(propertyId && { propertyId: String(propertyId) }),
      };

      const reviews = await this.reviewService.getReviews(filter);
      
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Reviews fetched successfully',
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  };
}