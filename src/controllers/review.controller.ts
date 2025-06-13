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
        reviewerId: req.user.id,
        propertyId: req.params.propertyId,
        rating: req.body.rating,
        comment: req.body.comment
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

  public getPropertyReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { propertyId } = req.params;
      
      const reviews = await this.reviewService.getReviews({ propertyId });
      
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