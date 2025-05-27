import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CLOUDINARY_CLOUD_NAME } from "../config";
import { cloudinary } from "../config/cloudinary.config";

export class UploadController {
  public uploadDoc = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "No file uploaded" });
      }
        res.status(StatusCodes.OK).json({
          message: "file uploaded",
          metadata: {
            originalName: file.originalname,
            url:  file.path,
            size: file.size,
          },
        });
    } catch (error) {
      console.log(CLOUDINARY_CLOUD_NAME);
      console.log(error);
      next(error);
    }
  };
}
