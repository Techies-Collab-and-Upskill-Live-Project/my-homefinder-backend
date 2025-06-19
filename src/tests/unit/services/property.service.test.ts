import HTTPException from "../../../exceptions/http.exception";
import { prisma } from "../../../prisma/prisma";
import { PropertyService } from "../../../services/property.service";
import { geocodeAddress } from "../../../utils/geocode.util";
import { PropertyType } from "../../../generated/prisma";

jest.mock("../../../prisma/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
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
    it('should create a property successfully', async () => {
      const mockUser = {
        id: 'user123',
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+1234567890',
        password: 'hashedPassword',
        isVerified: true,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const mockGeocode = {
        formatedAddress: 'Test Address',
        lat: 1.234,
        lng: 4.567
      };
      const mockProperty = {
        title: 'Test Property',
        description: 'Test Description',
        price: 1000,
        type: PropertyType.APARTMENT,
        address: 'Test Address',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        landlordId: 'user123',
        landlord: mockUser      
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (geocodeAddress as jest.Mock).mockResolvedValue(mockGeocode);
      (prisma.property.create as jest.Mock).mockResolvedValue({ ...mockProperty, id: 'prop123' });

      const result = await propertyService.createProperty(mockProperty, 'user123');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user123' }
      });
      expect(prisma.property.create).toHaveBeenCalled();
      expect(result).toHaveProperty('id', 'prop123');
    });

    it('should throw error if property data is empty', async () => {
      await expect(propertyService.createProperty({} as any, 'user123'))
        .rejects
        .toThrow(HTTPException);
    });
  });

  describe('getPropertyById', () => {
    it('should return property by id', async () => {
      const mockProperty = { id: 'prop123', title: 'Test Property' };
      (prisma.property.findUnique as jest.Mock).mockResolvedValue(mockProperty);

      const result = await propertyService.getPropertyById('prop123');

      expect(prisma.property.findUnique).toHaveBeenCalledWith({
        where: { id: 'prop123' }
      });
      expect(result).toEqual(mockProperty);
    });
  });

  describe('getPropertiesInLocation', () => {
    it('should get properties in location with pagination', async () => {
      const mockGeoLocation = { lat: 6.5, lng: 3.3, formatedAddress: 'Test Address' };
      const mockCountResult = [{ count: '5' }];
      const mockProperties = [{ id: 'prop123' }];

      (geocodeAddress as jest.Mock).mockResolvedValue(mockGeoLocation);
      (prisma.$queryRaw as jest.Mock)
        .mockResolvedValueOnce(mockCountResult)
        .mockResolvedValueOnce(mockProperties);

      const result = await propertyService.getPropertiesInLocation('Gbagada', 10, 1, 10);

      expect(geocodeAddress).toHaveBeenCalledWith('Gbagada');
      expect(result).toHaveProperty('properties');
      expect(result).toHaveProperty('pagination');
    });

    it('should throw error for invalid location', async () => {
      await expect(propertyService.getPropertiesInLocation('', 10, 1, 10))
        .rejects
        .toThrow(HTTPException);
    });
  });

  describe('getFilteredProperties', () => {
    it('should return filtered properties with pagination', async () => {
      const mockCount = 5;
      const mockProperties = [{ id: 'prop123' }];
      const filters = { type: PropertyType.APARTMENT, minPrice: 1000 };
      const options = { page: 1, limit: 10 };

      (prisma.property.count as jest.Mock).mockResolvedValue(mockCount);
      (prisma.property.findMany as jest.Mock).mockResolvedValue(mockProperties);

      const result = await propertyService.getFilteredProperties(filters, options);

      expect(result).toHaveProperty('properties', mockProperties);
      expect(result).toHaveProperty('pagination');
      expect(result).toHaveProperty('filters');
    });
  });

  describe('getPriceStatistics', () => {
    it('should return price statistics', async () => {
      const mockStats = {
        _min: { price: 1000 },
        _max: { price: 5000 },
        _avg: { price: 3000 },
        _count: { price: 10 }
      };

      (prisma.property.aggregate as jest.Mock).mockResolvedValue(mockStats);

      const result = await propertyService.getPriceStatistics();

      expect(result).toEqual({
        minPrice: 1000,
        maxPrice: 5000,
        avgPrice: 3000,
        totalProperties: 10
      });
    });
  });
});