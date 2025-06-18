import { NextFunction, Response } from "express";
import { PropertyController } from "../../../controllers/property.controller"
import { RequestWithUser } from "../../../interfaces/auth.interface";
import { PropertyService } from "../../../services/property.service";

// This test suite is for the PropertyController, which handles requests related to properties.
// It tests the methods for getting properties in a specific location and properties nearby the current location.
describe("PropetyController", () => {
    let propertyController: PropertyController;
    let propertyService: PropertyService;

    let mockReq: Partial<RequestWithUser>;
    let mockRes: Partial<Response>;
    let mockNext: Partial<NextFunction>;

    beforeEach(() => {
        propertyController = new PropertyController();
        propertyService = propertyController["propertyService"] = {
            getPropertiesInLocation: jest.fn(),
            getPropertyNearBy: jest.fn(),
        } as any;
    });

    // Mocking the getPropertiesInLocation 
    // This method is used to get properties in a specific location with a given radius
    describe("getPropertiesInLocation", () => {
        it("should return properties in a specific location", async () => {
            const mockLocation = "New York";
            const mockRadius = 10.0;
            const mockProperties = [{ id: 1, name: "Property 1" }];

            mockReq = {
                query: {
                    location: mockLocation,
                    radius: mockRadius.toString(),
                },
            };

            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mockNext = jest.fn();

            (propertyService.getPropertiesInLocation as jest.Mock).mockResolvedValue(mockProperties);

            await propertyController.getPropertiesAtLocation(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

            expect(propertyService.getPropertiesInLocation).toHaveBeenCalledWith(mockLocation, mockRadius);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ data: mockProperties });
        });
    });

    // Mocking getPropertyNearBy method
    // This method is used to get properties nearby the current location
    // It takes latitude, longitude, and radius as parameters
    // It returns properties within the specified radius from the given coordinates
    describe("getPropertyNearBy", () => {
        it("should return properties nearby the current location", async () => {
            const mockLat = 40.7128;
            const mockLng = -74.0060;
            const mockRadius = 10.0;
            const mockProperties = [{ id: 1, name: "Property 1" }];

            mockReq = {
                query: {
                    lat: mockLat.toString(),
                    lng: mockLng.toString(),
                    radius: mockRadius.toString(),
                },
            };

            mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mockNext = jest.fn();

            (propertyService.getPropertyNearBy as jest.Mock).mockResolvedValue(mockProperties);

            await propertyController.getPropertyNearBy(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

            expect(propertyService.getPropertyNearBy).toHaveBeenCalledWith(mockLat, mockLng, mockRadius);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({ data: mockProperties });
        });
    });
});