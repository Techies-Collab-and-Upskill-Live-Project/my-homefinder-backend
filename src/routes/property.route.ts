// src/routes/propertyRoutes.ts (Updated with validation)
import { Router } from 'express';
import { PropertyController } from '../controllers/property-filter.controller';
import { PropertyValidationMiddleware } from '../middlewares/property-validation.middleware';

const router = Router();
const propertyController = new PropertyController();

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