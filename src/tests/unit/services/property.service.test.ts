import HTTPException from "../../../exceptions/http.exception";
import { prisma } from "../../../prisma/prisma";
import { PropertyService } from "../../../services/property.service";
import { geocodeAddress } from "../../../utils/geocode.util";

jest.mock("../../../prisma/prisma", () => ({
  prisma: {
    property: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      findMany: jest.fn(),
      groupBy: jest.fn(),
      aggregate: jest.fn(),
    },
    $queryRaw: jest.fn(),
  },
}));

jest.mock('../../../utils/geocode.util', () => ({
  geocodeAddress: jest.fn(),
}));

describe('PropertyService', () => {
  let propertyService: PropertyService;

  beforeEach(() => {
    propertyService = new PropertyService();
    jest.clearAllMocks();
  });

  describe('createProperty', () => {
    it('should create a property', async () => {
      const mockProperty = { id: 'prop123', name: 'Test Property' };
      (prisma.property.create as jest.Mock).mockResolvedValue(mockProperty);

      const result = await propertyService.createProperty({ name: 'Test Property' });

      expect(prisma.property.create).toHaveBeenCalledWith({ data: { name: 'Test Property' } });
      expect(result).toEqual(mockProperty);
  });

  describe('getPropertyById', () => {
    it('should return property by id', async () => {
      const mockProperty = { id: 'prop123', name: 'Test Property' };
      (prisma.property.findUnique as jest.Mock).mockResolvedValue(mockProperty);

      const result = await propertyService.getPropertyById('prop123');

      expect(prisma.property.findUnique).toHaveBeenCalledWith({ where: { id: 'prop123' } });
      expect(result).toEqual(mockProperty);
    });
  });

  describe('updateProperty', () => {
    it('should update property if authorized', async () => {
      const mockProperty = { id: 'prop123', landlordId: 'user123' };
      const updatedProperty = { id: 'prop123', name: 'Updated Property' };

      (prisma.property.findUnique as jest.Mock).mockResolvedValue(mockProperty);
      (prisma.property.update as jest.Mock).mockResolvedValue(updatedProperty);

      const result = await propertyService.updateProperty('prop123', 'user123', { name: 'Updated Property' });

      expect(prisma.property.findUnique).toHaveBeenCalledWith({ where: { id: 'prop123' } });
      expect(prisma.property.update).toHaveBeenCalledWith({
        where: { id: 'prop123' },
        data: { name: 'Updated Property' },
      });
      expect(result).toEqual(updatedProperty);
    });
     it("should return 404 if property not found", async () => {
          const mockProperty = undefined;
          (prisma.property.findUnique as jest.Mock).mockResolvedValue(mockProperty);
         await expect(propertyService.updateProperty('prop123', 'user123', { name: 'Updated Property' }))
        .rejects
        .toThrow(HTTPException);
        });
        expect(prisma.property.update).not.toHaveBeenCalled();
    });
    it('should throw forbidden if unauthorized', async () => {
      const mockProperty = { id: 'prop123', landlordId: 'anotherUser' };
      (prisma.property.findUnique as jest.Mock).mockResolvedValue(mockProperty);

      await expect(propertyService.updateProperty('prop123', 'user123', { name: 'Updated' }))
        .rejects
        .toThrow(HTTPException);

      expect(prisma.property.update).not.toHaveBeenCalled();
    });
  });

  describe('softDeleteProperty', () => {
    it('should soft delete property if authorized', async () => {
      const mockProperty = { id: 'prop123', landlordId: 'user123' };
      (prisma.property.findUnique as jest.Mock).mockResolvedValue(mockProperty);

      await propertyService.softDeleteProperty('prop123', 'user123');

      expect(prisma.property.update).toHaveBeenCalledWith({
        where: { id: 'prop123' },
        data: { deleted: true },
      });
    });
  });

  describe('getPropertiesInLocation', () => {
    it('should get properties in location', async () => {
      const mockGeoLocation = { lat: 6.5, lng: 3.3 };
      const mockProperties = [{ id: 'prop123' }];

      (geocodeAddress as jest.Mock).mockResolvedValue(mockGeoLocation);
      (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockProperties);

      const result = await propertyService.getPropertiesInLocation('Gbagada', 10);

      expect(geocodeAddress).toHaveBeenCalledWith('Gbagada');
      expect(prisma.$queryRaw).toHaveBeenCalled();
      expect(result).toEqual(mockProperties);
    });
  });

  describe('getPropertyNearBy', () => {
    it('should get nearby properties', async () => {
      const mockProperties = [{ id: 'prop123' }];
      (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockProperties);

      const result = await propertyService.getPropertyNearBy(6.5, 3.3, 5);

      expect(prisma.$queryRaw).toHaveBeenCalled();
      expect(result).toEqual(mockProperties);
    });
  });

  describe('getFilteredProperties', () => {
    it('should get filtered properties', async () => {
      const mockCount = 1;
      const mockProperties = [{ id: 'prop123' }];

      (prisma.property.count as jest.Mock).mockResolvedValue(mockCount);
      (prisma.property.findMany as jest.Mock).mockResolvedValue(mockProperties);

      const result = await propertyService.getFilteredProperties({ city: 'Lagos' }, { page: 1, limit: 10 });

      expect(prisma.property.count).toHaveBeenCalled();
      expect(prisma.property.findMany).toHaveBeenCalled();
      expect(result.properties).toEqual(mockProperties);
      expect(result.pagination.totalCount).toBe(mockCount);
    });
  });

  describe('getPropertiesByCategory', () => {
    it('should get properties by category', async () => {
      const spy = jest.spyOn(propertyService, 'getFilteredProperties').mockResolvedValue({ properties: [] } as any);

      await propertyService.getPropertiesByCategory('APARTMENT');

      expect(spy).toHaveBeenCalledWith({ type: 'APARTMENT' }, {});
    });
  });

  describe('getPropertiesByBudget', () => {
    it('should get properties by budget', async () => {
      const spy = jest.spyOn(propertyService, 'getFilteredProperties').mockResolvedValue({ properties: [] } as any);

      await propertyService.getPropertiesByBudget(1000, 5000);

      expect(spy).toHaveBeenCalledWith({ minPrice: 1000, maxPrice: 5000 }, {});
    });
  });

  describe('getPropertyTypesWithCounts', () => {
    it('should get property types with counts', async () => {
      const mockGroupBy = [
        { type: 'APARTMENT', _count: { type: 5 } },
        { type: 'HOUSE', _count: { type: 2 } },
      ];

      (prisma.property.groupBy as jest.Mock).mockResolvedValue(mockGroupBy);

      const result = await propertyService.getPropertyTypesWithCounts();

      expect(prisma.property.groupBy).toHaveBeenCalled();
      expect(result).toEqual([
        { type: 'APARTMENT', count: 5 },
        { type: 'HOUSE', count: 2 },
      ]);
    });
  });

  describe('getPriceStatistics', () => {
    it('should get price statistics', async () => {
      const mockStats = {
        _min: { price: 1000 },
        _max: { price: 5000 },
        _avg: { price: 3000 },
        _count: { price: 10 },
      };

      (prisma.property.aggregate as jest.Mock).mockResolvedValue(mockStats);

      const result = await propertyService.getPriceStatistics();

      expect(prisma.property.aggregate).toHaveBeenCalled();
      expect(result).toEqual({
        minPrice: 1000,
        maxPrice: 5000,
        avgPrice: 3000,
        totalProperties: 10,
      });
    });
  });
});