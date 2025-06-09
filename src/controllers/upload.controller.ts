import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MulterFile } from "../interfaces/multerFile.interface";
import { RequestWithUser } from "../interfaces/auth.interface";
import { UploadService } from "../services/upload.service";

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  public uploadDoc = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id as string;
      const file = req.file as MulterFile;
      const userDocument = this.uploadService.saveDocToDB(file, userId);
      if (!file) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "No file uploaded" });
      }
      res.status(StatusCodes.OK).json({
        message: "file uploaded",
        data: userDocument,
      });
    } catch (error) {
      next(error);
    }
  };

  public uploadMultipleDocs = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id as string;
      const files = req.files as MulterFile[];
      const userDocuments = await this.uploadService.saveMultipleDocsToDB(
        files,
        userId,
      );
      res.status(StatusCodes.CREATED).json({
        message: "Files uploaded successfully",
        data: userDocuments,
      });
    } catch (error) {
      next(error);
    }
  };
}
