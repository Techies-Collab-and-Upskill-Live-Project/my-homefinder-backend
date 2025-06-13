import { Request, Response, NextFunction } from "express";

export const validateReview = (req: Request, res: Response, next: NextFunction) => {
  const { reviewerId, userId, propertyId, rating, comment } = req.body;

  if (!reviewerId || rating == null || !comment) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  if (!userId && !propertyId) {
    return res.status(400).json({ error: "You must review either a user or a property." });
  }

  if (userId && propertyId) {
    return res.status(400).json({ error: "You can only review one target (user or property)." });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }

  next();
};
