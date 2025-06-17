import {Request, Response, NextFunction} from 'express';
import {RequestWithUser} from "../interfaces/auth.interface";
import {PropertyService} from "../services/property.service";
import {StatusCodes} from "http-status-codes";
import {PropertyType} from '../generated/prisma';
import {createPropertyData, PropertyFilters, PropertyQueryOptions} from '../interfaces/property.interface';

export class PropertyController {
    private propertyService: PropertyService;

    constructor() {
        this.propertyService = new PropertyService();
    }

    public createProperty = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const landlordId = req.user.id;
            const createPropertyData: createPropertyData = req.body;
            const property = await this.propertyService.createProperty(createPropertyData, landlordId);
            res.status(StatusCodes.CREATED).json({message: "Property created", property});
        } catch (error) {
            next(error);
        }
    };

    public getPropertyById = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const {id} = req.params;
            const property = await this.propertyService.getPropertyById(id);
            console.log("I am the one working");
            if (!property || property.deleted) {
                res.status(StatusCodes.NOT_FOUND).json({message: "Property not found"});
            }
            res.status(StatusCodes.OK).json({property});
        } catch (error) {
            next(error);
        }
    };

    public updateProperty = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const {id} = req.params;
            const userId = req.user.id;
            const updated = await this.propertyService.updateProperty(id, userId, req.body);
            res.status(StatusCodes.OK).json({message: "Property updated", property: updated});
        } catch (error) {
            next(error);
        }
    };

    public deleteProperty = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const {id} = req.params;
            const userId = req.user.id;
            await this.propertyService.softDeleteProperty(id, userId);
            res.status(StatusCodes.OK).json({message: "Property soft-deleted"});
        } catch (error) {
            next(error);
        }
    };

    public getPropertiesAtLocation = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const {location, radius, page, limit} = req.query;
            const searchRadius = radius ? parseFloat(radius as string) : 10;
            const pageNum = page ? parseInt(page as string) : 1;
            const limitNum = limit ? parseInt(limit as string) : 10;

            const properties = await this.propertyService.getPropertiesInLocation(
                location as string,
                searchRadius,
                pageNum,
                limitNum
            );
            res.status(StatusCodes.OK).json({data: properties});
        } catch (error) {
            next(error);
        }
    };

    public getPropertyNearBy = async (
        req: RequestWithUser,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const {page, limit} = req.query;
            const lat = parseFloat(req.query.lat as string);
            const lng = parseFloat(req.query.lng as string);
            const radius = parseFloat(req.query.radius as string) || 10;
            const pageNum = page ? parseInt(page as string) : 1;
            const limitNum = limit ? parseInt(limit as string) : 10;
            const properties = await this.propertyService.getPropertyNearBy(
                lat,
                lng,
                radius,
                pageNum,
                limitNum
            );
            res.status(StatusCodes.OK).json({data: properties});
        } catch (error) {
            next(error);
        }
    };


    public getProperties = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
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
    };


    public getPropertiesByCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const {type} = req.params;
            const {page, limit, sortBy, sortOrder} = req.query;

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
    };


    public getPropertiesByBudget = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const {minPrice, maxPrice, page, limit, sortBy, sortOrder} = req.query;

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
    };


    public getPropertyTypes = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
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
    };


    public getPriceStatistics = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
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
    };
}