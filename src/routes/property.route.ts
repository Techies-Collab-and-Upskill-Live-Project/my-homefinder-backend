// src/routes/propertyRoutes.ts (Updated with validation)
import { Router, RequestHandler } from 'express';
import { Routes } from "../interfaces/route.interface";
import { PropertyController } from '../controllers/property.controller';
import { PropertyValidationMiddleware } from '../middlewares/property-validation.middleware';
import { authMiddleware } from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";

const router = Router();
const propertyController = new PropertyController();

export class PropertyRoute implements Routes {
  public path = "/api/v1/property";
  public router = Router();
  private propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      asyncHandler(this.propertyController.createProperty as RequestHandler)
    );

    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      asyncHandler(this.propertyController.getPropertyById as RequestHandler)
    );

    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      asyncHandler(this.propertyController.updateProperty as RequestHandler)
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      asyncHandler(this.propertyController.deleteProperty as RequestHandler)
    );

    this.router.get(
      `${this.path}/location`,
      authMiddleware,
      asyncHandler(this.propertyController.getPropertiesInLocation as RequestHandler)
    );

    this.router.get(
      `${this.path}/nearby`,
      authMiddleware,
      asyncHandler(this.propertyController.getPropertyNearBy as RequestHandler)
    );
  }
}

// Main properties endpoint with filtering and validation
// GET /api/properties?type=HOUSE&minPrice=1000&maxPrice=5000&city=Nairobi&page=1&limit=10&sortBy=price&sortOrder=asc
router.get(
  '/',
  PropertyValidationMiddleware.validatePropertyFilters,
  propertyController.getProperties.bind(propertyController)
);

// Get properties by category/type with validation
// GET /api/properties/category/HOUSE
// GET /api/properties/category/APARTMENT
router.get(
  '/category/:type',
  PropertyValidationMiddleware.validatePropertyType,
  propertyController.getPropertiesByCategory.bind(propertyController)
);

// Get properties by budget range with validation
// GET /api/properties/budget?minPrice=1000&maxPrice=5000
router.get(
  '/budget',
  PropertyValidationMiddleware.validateBudgetParams,
  propertyController.getPropertiesByBudget.bind(propertyController)
);

// Get available property types with counts
// GET /api/properties/types
router.get('/types', propertyController.getPropertyTypes.bind(propertyController));

// Get price statistics
// GET /api/properties/price-stats
router.get('/price-stats', propertyController.getPriceStatistics.bind(propertyController));

export default router;