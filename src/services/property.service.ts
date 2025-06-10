import { prisma } from '../prisma/prisma';
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { geocodeAddress } from "../utils/geocode.util";
import { PropertyType } from '@prisma/client';
import { PropertyFilters, PropertyQueryOptions } from '../interfaces/property.interface';

export class PropertyService {

private prisma: typeof prisma;
  constructor() {
    this.prisma = prisma;
  } 

  public createProperty = async (data: any) => {
    const property = await this.prisma.property.create({ data });
    return property;
  };

  public getPropertyById = async (id: string) => {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });
    return property;
  };

  public updateProperty = async (id: string, userId: string, data: any) => {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Property not found");
    }
    if (property.landlordId !== userId) {
      throw new HTTPException(StatusCodes.FORBIDDEN, "Unauthorized");
    }
    const updated = await prisma.property.update({
      where: { id },
      data,
    });
    return updated;
  };

  public softDeleteProperty = async (id: string, userId: string) => {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Property not found");
    }
    if (property.landlordId !== userId) {
      throw new HTTPException(StatusCodes.FORBIDDEN, "Unauthorized");
    }
    await prisma.property.update({
      where: { id },
      data: { deleted: true },
    });
  };

  // get Properties in a specific location with a given radius
  public getPropertiesInLocation = async (location: string, radius: number) => {
    if (!location || typeof location !== "string") {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Invalid location");
    }

    const geoLocation = await geocodeAddress(location);
    console.log(geoLocation);
    const properties = await this.prisma.$queryRaw`
      SELECT * FROM (
        SELECT *,
          (6371 * acos(
            cos(radians(${geoLocation.lat})) *
            cos(radians(latitude)) *
            cos(radians(longitude) - radians(${geoLocation.lng})) +
            sin(radians(${geoLocation.lat})) *
            sin(radians(latitude))
          )) AS distance
        FROM "Property"
      ) AS subquery
      WHERE distance < ${radius}
      ORDER BY distance ASC
    `;
    return properties;
  };

  // get Properties nearby the current location
  public getPropertyNearBy = async (
    lat: number,
    lng: number,
    radius: number,
  ) => {
    if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Invalid coordinates");
    }
    const properties = await this.prisma.$queryRaw`
      SELECT * FROM (
        SELECT *,
          (6371 * acos(
            cos(radians(${lat})) *
            cos(radians(latitude)) *
            cos(radians(longitude) - radians(${lng})) +
            sin(radians(${lat})) *
            sin(radians(latitude))
          )) AS distance
        FROM "Property"
      ) AS subquery
      WHERE distance < ${radius}
      ORDER BY distance ASC
    `;
    return properties;
  };

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
        const totalCount = await this.prisma.property.count({
          where: whereClause
        });
  
        // Get filtered properties
        const properties = await this.prisma.property.findMany({
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
        throw new HTTPException(StatusCodes.BAD_REQUEST,'Failed to fetch filtered properties');
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
        const typeCounts = await this.prisma.property.groupBy({
          by: ['type'],
          where: {
            deleted: false,
            isAvailable: true
          },
          _count: {
            type: true
          }
        });
  
        return typeCounts.map((item: any) => ({
          type: item.type,
          count: item._count.type
        }));
      } catch (error) {
        console.error('Error getting property type counts:', error);
        throw new HTTPException(StatusCodes.BAD_REQUEST, 'Failed to fetch property type counts');
      }
    }
  
    /**
     * Get price range statistics
     */
    async getPriceStatistics() {
      try {
        const stats = await this.prisma.property.aggregate({
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
        throw new HTTPException(StatusCodes.BAD_REQUEST,'Failed to fetch price statistics');
      }
    }
}