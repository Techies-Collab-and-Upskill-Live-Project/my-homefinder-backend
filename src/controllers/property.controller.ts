import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";
import { PropertyService } from "../services/property.service";
import { StatusCodes } from "http-status-codes";

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
      const property = await this.propertyService.createProperty({ ...req.body, landlordId });
      res.status(StatusCodes.CREATED).json({ message: "Property created", property });
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
      const { id } = req.params;
      const property = await this.propertyService.getPropertyById(id);
      if (!property || property.deleted) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Property not found" });
        return;
      }
      res.status(StatusCodes.OK).json({ property });
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
      const { id } = req.params;
      const userId = req.user.id;
      const updated = await this.propertyService.updateProperty(id, userId, req.body);
      res.status(StatusCodes.OK).json({ message: "Property updated", property: updated });
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
      const { id } = req.params;
      const userId = req.user.id;
      await this.propertyService.softDeleteProperty(id, userId);
      res.status(StatusCodes.OK).json({ message: "Property soft-deleted" });
    } catch (error) {
      next(error);
    }
  };

  public getPropertiesInLocation = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { location, radius } = req.query;
      const searchRadius = radius ? parseFloat(radius as string) : 10;
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
      const radius = parseFloat(req.query.radius as string) || 10;
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