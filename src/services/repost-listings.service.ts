// src/services/repostService.ts
import { PrismaClient } from '@prisma/client';
import { prisma } from '../prisma/prisma';

export interface RepostOptions {
  updatePrice?: number;
  updateDescription?: string;
  updateTitle?: string;
  makeAvailable?: boolean;
}

export interface RepostResult {
  success: boolean;
  message: string;
  originalProperty?: any;
  repostedProperty?: any;
}

export interface RepostHistory {
  id: string;
  originalPropertyId: string;
  repostedPropertyId: string;
  repostDate: Date;
  userId: string;
  changes?: Record<string, any>;
}

export class RepostService {

  /**
   * Repost a single property listing
   */
  async repostProperty(
    propertyId: string, 
    userId: string, 
    options: RepostOptions = {}
  ): Promise<RepostResult> {
    try {
      // First, verify the property exists and belongs to the user
      const originalProperty = await prisma.property.findUnique({
        where: { 
          id: propertyId,
          deleted: false 
        },
        include: {
          landlord: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          }
        }
      });

      if (!originalProperty) {
        return {
          success: false,
          message: 'Property not found or has been deleted'
        };
      }

      // Check if user owns the property
      if (originalProperty.landlordId !== userId) {
        return {
          success: false,
          message: 'You can only repost your own properties'
        };
      }

      // Check if property was recently reposted (within last 24 hours)
      const recentRepost = await this.checkRecentRepost(propertyId);
      if (recentRepost) {
        return {
          success: false,
          message: 'Property was recently reposted. Please wait 24 hours before reposting again.'
        };
      }

      // Prepare the reposted property data
      const repostData = {
        title: options.updateTitle || originalProperty.title,
        description: options.updateDescription || originalProperty.description,
        price: options.updatePrice !== undefined ? options.updatePrice : originalProperty.price,
        type: originalProperty.type,
        address: originalProperty.address,
        city: originalProperty.city,
        state: originalProperty.state,
        country: originalProperty.country,
        latitude: originalProperty.latitude,
        longitude: originalProperty.longitude,
        isAvailable: options.makeAvailable !== undefined ? options.makeAvailable : true,
        landlordId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Create the reposted property
      const repostedProperty = await prisma.property.create({
        data: repostData,
        include: {
          landlord: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          }
        }
      });

      // Create repost history record
      await this.createRepostHistory(
        originalProperty.id,
        repostedProperty.id,
        userId,
        options
      );

      // Optionally mark the original property as unavailable
      await prisma.property.update({
        where: { id: propertyId },
        data: { 
          isAvailable: false,
          updatedAt: new Date()
        }
      });

      return {
        success: true,
        message: 'Property reposted successfully',
        originalProperty,
        repostedProperty
      };

    } catch (error) {
      console.error('Error reposting property:', error);
      return {
        success: false,
        message: 'Failed to repost property. Please try again.'
      };
    }
  }

  /**
   * Repost multiple properties at once
   */
  async repostMultipleProperties(
    propertyIds: string[],
    userId: string,
    options: RepostOptions = {}
  ) {
    const results = [];
    const errors = [];

    for (const propertyId of propertyIds) {
      try {
        const result = await this.repostProperty(propertyId, userId, options);
        if (result.success) {
          results.push({
            propertyId,
            success: true,
            repostedProperty: result.repostedProperty
          });
        } else {
          errors.push({
            propertyId,
            error: result.message
          });
        }
      } catch (error) {
        errors.push({
          propertyId,
          error: 'Failed to repost property'
        });
      }
    }

    return {
      successCount: results.length,
      errorCount: errors.length,
      results,
      errors
    };
  }

  /**
   * Get user's repost history
   */
  async getUserRepostHistory(userId: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      // Get repost history with property details
      const repostHistory = await prisma.$queryRaw`
        SELECT 
          rh.*,
          op.title as original_title,
          op.price as original_price,
          op.created_at as original_created_at,
          rp.title as reposted_title,
          rp.price as reposted_price,
          rp.created_at as reposted_created_at,
          rp.is_available as reposted_is_available
        FROM repost_history rh
        LEFT JOIN properties op ON rh.original_property_id = op.id
        LEFT JOIN properties rp ON rh.reposted_property_id = rp.id
        WHERE rh.user_id = ${userId}
        ORDER BY rh.repost_date DESC
        LIMIT ${limit} OFFSET ${skip}
      `;

      const totalCount = await prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM repost_history
        WHERE user_id = ${userId}
      `;

      return {
        history: repostHistory,
        pagination: {
          currentPage: page,
          totalCount: Number((totalCount as any)[0].count),
          totalPages: Math.ceil(Number((totalCount as any)[0].count) / limit),
          limit
        }
      };

    } catch (error) {
      console.error('Error fetching repost history:', error);
      throw new Error('Failed to fetch repost history');
    }
  }

  /**
   * Get properties eligible for reposting
   */
  async getEligiblePropertiesForRepost(userId: string) {
    try {
      // Properties that are older than 30 days or not available
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const eligibleProperties = await prisma.property.findMany({
        where: {
          landlordId: userId,
          deleted: false,
          OR: [
            { isAvailable: false },
            { createdAt: { lt: thirtyDaysAgo } }
          ]
        },
        include: {
          landlord: {
            select: {
              id: true,
              fullName: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      // Filter out recently reposted properties
      const filteredProperties = [];
      for (const property of eligibleProperties) {
        const recentRepost = await this.checkRecentRepost(property.id);
        if (!recentRepost) {
          filteredProperties.push(property);
        }
      }

      return filteredProperties;

    } catch (error) {
      console.error('Error fetching eligible properties:', error);
      throw new Error('Failed to fetch eligible properties for repost');
    }
  }

  /**
   * Check if property was recently reposted (within 24 hours)
   */
  private async checkRecentRepost(propertyId: string): Promise<boolean> {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const recentRepost = await prisma.$queryRaw`
      SELECT COUNT(*) as count
      FROM repost_history
      WHERE original_property_id = ${propertyId}
      AND repost_date > ${twentyFourHoursAgo}
    `;

    return Number((recentRepost as any)[0].count) > 0;
  }

  /**
   * Create repost history record
   */
  private async createRepostHistory(
    originalPropertyId: string,
    repostedPropertyId: string,
    userId: string,
    changes: RepostOptions
  ) {
    try {
      // For now, we'll store this in a simple way since we don't have the repost_history table in schema
      // You might want to add this table to your Prisma schema later
      
      // Alternative: Store in a JSON field or create a separate tracking mechanism
      console.log('Repost History:', {
        originalPropertyId,
        repostedPropertyId,
        userId,
        changes,
        repostDate: new Date()
      });

      // TODO: Implement proper repost history table
      // await prisma.repostHistory.create({
      //   data: {
      //     originalPropertyId,
      //     repostedPropertyId,
      //     userId,
      //     changes,
      //     repostDate: new Date()
      //   }
      // });

    } catch (error) {
      console.error('Error creating repost history:', error);
      // Don't throw error here as it's not critical to the repost operation
    }
  }

  /**
   * Get repost statistics for a user
   */
  async getRepostStatistics(userId: string) {
    try {
      const userProperties = await prisma.property.findMany({
        where: {
          landlordId: userId,
          deleted: false
        },
        select: {
          id: true,
          createdAt: true,
          isAvailable: true
        }
      });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const stats = {
        totalProperties: userProperties.length,
        availableProperties: userProperties.filter(p => p.isAvailable).length,
        unavailableProperties: userProperties.filter(p => !p.isAvailable).length,
        oldProperties: userProperties.filter(p => p.createdAt < thirtyDaysAgo).length,
        eligibleForRepost: 0
      };

      // Calculate eligible for repost (this is a simplified calculation)
      stats.eligibleForRepost = stats.unavailableProperties + 
        Math.max(0, stats.oldProperties - stats.unavailableProperties);

      return stats;

    } catch (error) {
      console.error('Error fetching repost statistics:', error);
      throw new Error('Failed to fetch repost statistics');
    }
  }
}