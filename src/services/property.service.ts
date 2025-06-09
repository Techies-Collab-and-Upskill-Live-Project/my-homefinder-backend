import { PrismaClient } from '@prisma/client';
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { geocodeAddress } from "../utils/geocode.util";

export class PropertyService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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
    const updated = await this.prisma.property.update({
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
    await this.prisma.property.update({
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
}