import { Request, Response, NextFunction } from 'express';
import { PropertyType } from '../../generated/prisma'; 

export interface ValidationError {
  field: string;
  message: string;
}

export class PropertyValidationMiddleware {
  /**
   * Validate property filter parameters
   */
  static validatePropertyFilters(req: Request, res: Response, next: NextFunction): void {
    const errors: ValidationError[] = [];
    const {
      type,
      minPrice,
      maxPrice,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    // Validate property type
    if (type && !Object.values(PropertyType).includes(type as PropertyType)) {
      errors.push({
        field: 'type',
        message: `Invalid property type. Valid types are: ${Object.values(PropertyType).join(', ')}`,
      });
    }

    // Validate price parameters
    if (minPrice) {
      const min = parseFloat(minPrice as string);
      if (isNaN(min) || min < 0) {
        errors.push({
          field: 'minPrice',
          message: 'Minimum price must be a valid positive number',
        });
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice as string);
      if (isNaN(max) || max < 0) {
        errors.push({
          field: 'maxPrice',
          message: 'Maximum price must be a valid positive number',
        });
      }
    }

    // Validate price range
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice as string);
      const max = parseFloat(maxPrice as string);
      if (!isNaN(min) && !isNaN(max) && min > max) {
        errors.push({
          field: 'priceRange',
          message: 'Minimum price cannot be greater than maximum price',
        });
      }
    }

    // Validate pagination parameters
    if (page) {
      const pageNum = parseInt(page as string, 10);
      if (isNaN(pageNum) || pageNum < 1) {
        errors.push({
          field: 'page',
          message: 'Page must be a positive integer',
        });
      }
    }

    if (limit) {
      const limitNum = parseInt(limit as string, 10);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        errors.push({
          field: 'limit',
          message: 'Limit must be a positive integer between 1 and 100',
        });
      }
    }

    // Validate sorting parameters
    if (sortBy && !['price', 'createdAt', 'title'].includes(sortBy as string)) {
      errors.push({
        field: 'sortBy',
        message: 'Sort by must be one of: price, createdAt, title',
      });
    }

    if (sortOrder && !['asc', 'desc'].includes(sortOrder as string)) {
      errors.push({
        field: 'sortOrder',
        message: 'Sort order must be either asc or desc',
      });
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors,
      });
      return;
    }

    next();
  }

  /**
   * Validate property type parameter
   */
  static validatePropertyType(req: Request, res: Response, next: NextFunction): void {
    const { type } = req.params;

    if (!Object.values(PropertyType).includes(type as PropertyType)) {
      res.status(400).json({
        success: false,
        message: `Invalid property type. Valid types are: ${Object.values(PropertyType).join(', ')}`,
      });
      return;
    }

    next();
  }

  /**
   * Validate budget parameters
   */
  static validateBudgetParams(req: Request, res: Response, next: NextFunction): void {
    const errors: ValidationError[] = [];
    const { minPrice, maxPrice } = req.query;

    if (!minPrice && !maxPrice) {
      errors.push({
        field: 'budget',
        message: 'At least one of minPrice or maxPrice must be provided',
      });
    }

    if (minPrice) {
      const min = parseFloat(minPrice as string);
      if (isNaN(min) || min < 0) {
        errors.push({
          field: 'minPrice',
          message: 'Minimum price must be a valid positive number',
        });
      }
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice as string);
      if (isNaN(max) || max < 0) {
        errors.push({
          field: 'maxPrice',
          message: 'Maximum price must be a valid positive number',
        });
      }
    }

    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice as string);
      const max = parseFloat(maxPrice as string);
      if (!isNaN(min) && !isNaN(max) && min > max) {
        errors.push({
          field: 'priceRange',
          message: 'Minimum price cannot be greater than maximum price',
        });
      }
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors,
      });
      return;
    }

    next();
  }
}