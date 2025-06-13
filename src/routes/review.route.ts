import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import asyncHandler from 'express-async-handler';
import { RequestWithUser } from '../interfaces/auth.interface';
import { Request } from 'express';

export class ReviewRoute implements Routes {
  public path = '/api/v1/reviews';
  public router = Router();
  private reviewController = new ReviewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      asyncHandler((req: Request, res, next) => 
        this.reviewController.createReview(req as RequestWithUser, res, next)
      )
    );

    this.router.get(
      `${this.path}`,
      asyncHandler(this.reviewController.getReviews)
    );
  }
}