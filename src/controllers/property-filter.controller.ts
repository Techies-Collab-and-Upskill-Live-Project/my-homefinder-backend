import { Request, Response, NextFunction } from 'express';
import { PropertyType } from '@prisma/client';
import { PropertyService } from '../services/property-filter.service';
import { PropertyFilters, PropertyQueryOptions } from '../interfaces/property.interface';

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  /**
   * Get all properties with optional filters
   * GET /api/properties?type=HOUSE&minPrice=1000&maxPrice=5000&city=Nairobi&page=1&limit=10
   */
  async getProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        type,
        minPrice,
        maxPrice,
        city,
        state,
        country,
        isAvailable,
        page,
        limit,
        sortBy,
        sortOrder
      } = req.query;

      // Build filters object
      const filters: PropertyFilters = {};
      if (type && Object.values(PropertyType).includes(type as PropertyType)) {
        filters.type = type as PropertyType;
      }
      if (minPrice) {
        const min = parseFloat(minPrice as string);
        if (!isNaN(min) && min >= 0) {
          filters.minPrice = min;
        }
      }
      if (maxPrice) {
        const max = parseFloat(maxPrice as string);
        if (!isNaN(max) && max >= 0) {
          filters.maxPrice = max;
        }
      }
      if (city) filters.city = city as string;
      if (state) filters.state = state as string;
      if (country) filters.country = country as string;
      if (isAvailable !== undefined) {
        filters.isAvailable = isAvailable === 'true';
      }

      // Build options object
      const options: PropertyQueryOptions = {};
      if (page) {
        const pageNum = parseInt(page as string);
        if (!isNaN(pageNum) && pageNum > 0) {
          options.page = pageNum;
        }
      }
      if (limit) {
        const limitNum = parseInt(limit as string);
        if (!isNaN(limitNum) && limitNum > 0 && limitNum <= 100) {
          options.limit = limitNum;
        }
      }
      if (sortBy && ['price', 'createdAt', 'title'].includes(sortBy as string)) {
        options.sortBy = sortBy as 'price' | 'createdAt' | 'title';
      }
      if (sortOrder && ['asc', 'desc'].includes(sortOrder as string)) {
        options.sortOrder = sortOrder as 'asc' | 'desc';
      }

      const result = await this.propertyService.getFilteredProperties(filters, options);

      res.status(200).json({
        success: true,
        message: 'Properties retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get properties by category/type
   * GET /api/properties/category/:type
   */
  async getPropertiesByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.params;
      const { page, limit, sortBy, sortOrder } = req.query;

      // Build options
      const options: PropertyQueryOptions = {};
      if (page) options.page = parseInt(page as string);
      if (limit) options.limit = parseInt(limit as string);
      if (sortBy) options.sortBy = sortBy as any;
      if (sortOrder) options.sortOrder = sortOrder as any;

      const result = await this.propertyService.getPropertiesByCategory(
        type as PropertyType,
        options
      );

      res.status(200).json({
        success: true,
        message: `${type} properties retrieved successfully`,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get properties by budget range
   * GET /api/properties/budget?minPrice=1000&maxPrice=5000
   */
  async getPropertiesByBudget(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { minPrice, maxPrice, page, limit, sortBy, sortOrder } = req.query;

      let min: number | undefined;
      let max: number | undefined;

      if (minPrice) {
        min = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        max = parseFloat(maxPrice as string);
      }

      // Build options
      const options: PropertyQueryOptions = {};
      if (page) options.page = parseInt(page as string);
      if (limit) options.limit = parseInt(limit as string);
      if (sortBy) options.sortBy = sortBy as any;
      if (sortOrder) options.sortOrder = sortOrder as any;

      const result = await this.propertyService.getPropertiesByBudget(min, max, options);

      res.status(200).json({
        success: true,
        message: 'Properties within budget retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get property types with counts
   * GET /api/properties/types
   */
  async getPropertyTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.getPropertyTypesWithCounts();

      res.status(200).json({
        success: true,
        message: 'Property types retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get price statistics
   * GET /api/properties/price-stats
   */
  async getPriceStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.getPriceStatistics();

      res.status(200).json({
        success: true,
        message: 'Price statistics retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}