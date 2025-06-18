import { NextFunction, Response } from "express";
import { PropertyController } from "../../../controllers/property.controller";
import { RequestWithUser } from "../../../interfaces/auth.interface";
import { PropertyService } from "../../../services/property.service";

// This test suite is for the PropertyController, which handles requests related to properties.
// It tests the methods for getting properties in a specific location and properties nearby the current location,
// as well as creating, reading, updating, and deleting a property.
describe("PropetyController", () => {
  let propertyController: PropertyController;
  let propertyService: PropertyService;

  let mockReq: Partial<RequestWithUser>;
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    propertyController = new PropertyController();
    propertyService = propertyController["propertyService"] = {
      createProperty: jest.fn(),
      getPropertyById: jest.fn(),
      updateProperty: jest.fn(),
      softDeleteProperty: jest.fn(),
      getPropertiesInLocation: jest.fn(),
      getPropertyNearBy: jest.fn(),
    } as any;
  });

  // This method is used to create a property and expects a landlordId from the authenticated user
  describe("createProperty", () => {
    it("should create a new property", async () => {
      const mockProperty = { id: 1, title: "New Property" };
      mockReq = {
        user: { id: "landlord123" },
        body: { title: "New Property", city: "Lagos" },
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (propertyService.createProperty as jest.Mock).mockResolvedValue(mockProperty);

      await propertyController.createProperty(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

      expect(propertyService.createProperty).toHaveBeenCalledWith(
        { title: "New Property", city: "Lagos" },
        "landlord123"
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Property created", property: mockProperty });
    });
  });

// This method is used to get a property by its ID
  describe("getPropertyById", () => {
    it("should return the property by ID", async () => {
      const mockProperty = { id: "1", title: "House A", deleted: false };
      mockReq = { params: { id: "1" } };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (propertyService.getPropertyById as jest.Mock).mockResolvedValue(mockProperty);

      await propertyController.getPropertyById(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

      expect(propertyService.getPropertyById).toHaveBeenCalledWith("1");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ property: mockProperty });
    });

    it("should return 404 if property is not found or deleted", async () => {
      mockReq = { params: { id: "404" } };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (propertyService.getPropertyById as jest.Mock).mockResolvedValue(null);

      await propertyController.getPropertyById(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Property not found" });
    });
  });

// This method is used to update a property
  describe("updateProperty", () => {
    it("should update a property", async () => {
      const updatedProperty = { id: "1", title: "Updated Property" };
      mockReq = {
        params: { id: "1" },
        user: { id: "landlord123" },
        body: { title: "Updated Property" },
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (propertyService.updateProperty as jest.Mock).mockResolvedValue(updatedProperty);

      await propertyController.updateProperty(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

      expect(propertyService.updateProperty).toHaveBeenCalledWith("1", "landlord123", { title: "Updated Property" });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Property updated", property: updatedProperty });
    });
  });

  // This method is used to soft-delete a property by the landlord
  describe("deleteProperty", () => {
    it("should soft delete the property", async () => {
      mockReq = {
        params: { id: "1" },
        user: { id: "landlord123" },
      };
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockNext = jest.fn();

      (propertyService.softDeleteProperty as jest.Mock).mockResolvedValue(undefined);

      await propertyController.deleteProperty(mockReq as RequestWithUser, mockRes as Response, mockNext as NextFunction);

      expect(propertyService.softDeleteProperty).toHaveBeenCalledWith("1", "landlord123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Property soft-deleted" });
    });
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

      expect(propertyService.getPropertiesInLocation).toHaveBeenCalledWith(mockLocation, mockRadius, 1, 10);
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

      expect(propertyService.getPropertyNearBy).toHaveBeenCalledWith(mockLat, mockLng, mockRadius, 1, 10);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ data: mockProperties });
    });
  });
});