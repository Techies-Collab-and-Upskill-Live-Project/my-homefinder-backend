import { Request, Response, NextFunction } from 'express';
import { StarRating } from '../generated/prisma';
import HTTPException from '../exceptions/http.exception';
import { StatusCodes } from 'http-status-codes';

export class ReviewValidationMiddleware {
  private static readonly MAX_COMMENT_LENGTH = 1000;
  
  static validateCreateReview(req: Request, res: Response, next: NextFunction): void {
    const { rating, comment } = req.body;
    const errors: string[] = [];

    // Validate rating
    if (!rating || !Object.values(StarRating).includes(rating)) {
      errors.push('Rating must be between 1 and 5 stars');
    }

    // Validate comment
    if (!comment?.trim()) {
      errors.push('Comment is required');
    } else if (comment.length > this.MAX_COMMENT_LENGTH) {
      errors.push(`Comment must be less than ${this.MAX_COMMENT_LENGTH} characters`);
    }

    if (errors.length > 0) {
      throw new HTTPException(
        StatusCodes.BAD_REQUEST, 
        `Validation failed: ${errors.join(', ')}`
      );
    }

    next();
  }
}