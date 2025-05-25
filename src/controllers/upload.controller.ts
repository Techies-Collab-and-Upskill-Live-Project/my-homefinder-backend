import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UploadController {
  public uploadDoc = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "No file uploaded" });
      }
      res.status(StatusCodes.OK).json({
        message: "file uploaded",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
