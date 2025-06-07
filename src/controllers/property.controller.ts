import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { PropertyService } from "../services/property.service";
import { StatusCodes } from "http-status-codes";

export class PropertyController {
  private propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService();
  }

  public getPropertiesInLoaction = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { location, radius } = req.query;
      const searchRadius = radius ? parseFloat(radius as string) : 10; // Default radius to 10 km if not provided
      const properties = await this.propertyService.getPropertiesInLocation(
        location as string,
        searchRadius,
      );
      res.status(StatusCodes.OK).json({ data: properties });
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
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);
      const radius = parseFloat(req.query.radius as string) || 10; // Default radius to 10 km if not provided
      const properties = await this.propertyService.getPropertyNearBy(
        lat,
        lng,
        radius,
      );
      res.status(StatusCodes.OK).json({ data: properties });
    } catch (error) {
      next(error);
    }
  };
}
