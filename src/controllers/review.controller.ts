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
    req: Request<{ propertyId: string }, any, any, { page?: string; limit?: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { propertyId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.reviewService.getReviews(
        { propertyId },
        { page, limit }
      );
      
      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Reviews fetched successfully',
        ...result
      });
    } catch (error) {
      next(error);
    }
  };
}