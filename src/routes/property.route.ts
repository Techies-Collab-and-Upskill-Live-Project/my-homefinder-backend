// src/routes/propertyRoutes.ts (Updated with validation)
import {RequestHandler, Router} from 'express';
import {Routes} from "../interfaces/route.interface";
import {PropertyController} from '../controllers/property.controller';
import {PropertyValidationMiddleware} from '../middlewares/property-validation.middleware';
import {authMiddleware} from "../middlewares/auth.middleware";
import asyncHandler from "express-async-handler";
import search from '../controllers/search.controller';


export class PropertyRoute implements Routes {
    public path = "/api/v1/property";
    public router: Router = Router();
    private propertyController = new PropertyController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // create a new property
        this.router.post(
            `${this.path}`,
            authMiddleware,
            asyncHandler(this.propertyController.createProperty as RequestHandler)
        );

        // get a property by ID
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            asyncHandler(this.propertyController.getPropertyById as RequestHandler)
        );

        // update a property by ID
        this.router.patch(
            `${this.path}/:id`,
            authMiddleware,
            asyncHandler(this.propertyController.updateProperty as RequestHandler)
        );

        // delete a property by ID
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            asyncHandler(this.propertyController.deleteProperty as RequestHandler)
        );

        // get all properties in a location
        this.router.get(
            `${this.path}location`,
            authMiddleware,
            asyncHandler(this.propertyController.getPropertiesAtLocation as RequestHandler)
        );

        this.router.get(
            `${this.path}location/nearby`,
            authMiddleware,
            asyncHandler(this.propertyController.getPropertyNearBy as RequestHandler)
        );

        // Main properties endpoint with filtering and validation
        // GET /api/properties?type=HOUSE&minPrice=1000&maxPrice=5000&city=Nairobi&page=1&limit=10&sortBy=price&sortOrder=asc
        this.router.get(
            `${this.path}`,
            authMiddleware,
            PropertyValidationMiddleware.validatePropertyFilters,
            asyncHandler(this.propertyController.getProperties as RequestHandler)
        )

        // Get properties by category/type with validation
        // GET /api/property/category/HOUSE
        // GET /api/v1/property/category/APARTMENT
        this.router.get(
            `${this.path}/category/:type`,
            authMiddleware,
            PropertyValidationMiddleware.validatePropertyType,
            asyncHandler(this.propertyController.getPropertiesByCategory as RequestHandler)
        )

        // Get properties by budget range with validation
        // GET /api/v1/property/filter/budget?minPrice=1000&maxPrice=5000
        this.router.get(
            `${this.path}/filter/budget`,
            authMiddleware,
            PropertyValidationMiddleware.validateBudgetParams,
            asyncHandler(this.propertyController.getPropertiesByBudget as RequestHandler)
        )

        // Get available property types with counts
        // GET /api/v1/property/filter/types
        this.router.get(
            `${this.path}/filter/types`,
            authMiddleware,
            asyncHandler(this.propertyController.getPropertyTypes as RequestHandler)
        )

        // Get price statistics
        // GET ``/api/v1/property/filter/price-stats``
        this.router.get(
            `${this.path}/filter/price-stats`,
            authMiddleware,
            asyncHandler(this.propertyController.getPriceStatistics as RequestHandler)
        )
    }
}


// get property by city or area
router.get("/searchProperties/:search",search.searchFunction)

export default router;
