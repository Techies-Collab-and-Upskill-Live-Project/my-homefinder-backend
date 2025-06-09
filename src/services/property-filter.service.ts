// src/services/propertyService.ts
import { PropertyType } from '@prisma/client';
import { prisma } from '../prisma/prisma';
import { PropertyFilters, PropertyQueryOptions } from '../interfaces/property.interface';


export class PropertyService {
  
  /**
   * Get filtered properties with pagination and sorting
   */
  async getFilteredProperties(
    filters: PropertyFilters = {},
    options: PropertyQueryOptions = {}
  ) {
    const {
      type,
      minPrice,
      maxPrice,
      city,
      state,
      country,
      isAvailable = true
    } = filters;

    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    // Build where clause
    const whereClause: any = {
      deleted: false,
      isAvailable
    };

    // Filter by property type/category
    if (type) {
      whereClause.type = type;
    }

    // Filter by budget (price range)
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) {
        whereClause.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        whereClause.price.lte = maxPrice;
      }
    }

    // Filter by location
    if (city) {
      whereClause.city = {
        contains: city,
        mode: 'insensitive'
      };
    }

    if (state) {
      whereClause.state = {
        contains: state,
        mode: 'insensitive'
      };
    }

    if (country) {
      whereClause.country = {
        contains: country,
        mode: 'insensitive'
      };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    try {
      // Get total count for pagination
      const totalCount = await prisma.property.count({
        where: whereClause
      });

      // Get filtered properties
      const properties = await prisma.property.findMany({
        where: whereClause,
        include: {
          landlord: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      });

      // Calculate pagination info
      const totalPages = Math.ceil(totalCount / limit);
      const hasNext = page < totalPages;
      const hasPrev = page > 1;

      return {
        properties,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNext,
          hasPrev
        },
        filters: {
          ...filters,
          isAvailable
        }
      };

    } catch (error) {
      console.error('Error filtering properties:', error);
      throw new Error('Failed to fetch filtered properties');
    }
  }

  /**
   * Get properties by specific category/type
   */
  async getPropertiesByCategory(
    type: PropertyType,
    options: PropertyQueryOptions = {}
  ) {
    return this.getFilteredProperties({ type }, options);
  }

  /**
   * Get properties within budget range
   */
  async getPropertiesByBudget(
    minPrice?: number,
    maxPrice?: number,
    options: PropertyQueryOptions = {}
  ) {
    return this.getFilteredProperties({ minPrice, maxPrice }, options);
  }

  /**
   * Get available property types with counts
   */
  async getPropertyTypesWithCounts() {
    try {
      const typeCounts = await prisma.property.groupBy({
        by: ['type'],
        where: {
          deleted: false,
          isAvailable: true
        },
        _count: {
          type: true
        }
      });

      return typeCounts.map(item => ({
        type: item.type,
        count: item._count.type
      }));
    } catch (error) {
      console.error('Error getting property type counts:', error);
      throw new Error('Failed to fetch property type counts');
    }
  }

  /**
   * Get price range statistics
   */
  async getPriceStatistics() {
    try {
      const stats = await prisma.property.aggregate({
        where: {
          deleted: false,
          isAvailable: true
        },
        _min: {
          price: true
        },
        _max: {
          price: true
        },
        _avg: {
          price: true
        },
        _count: {
          price: true
        }
      });

      return {
        minPrice: stats._min.price,
        maxPrice: stats._max.price,
        avgPrice: stats._avg.price,
        totalProperties: stats._count.price
      };
    } catch (error) {
      console.error('Error getting price statistics:', error);
      throw new Error('Failed to fetch price statistics');
    }
  }
}