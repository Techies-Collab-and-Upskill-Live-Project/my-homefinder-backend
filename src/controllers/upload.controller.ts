import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MulterFile } from "../interfaces/multerFile.interface";
import { renterIdDetails } from "../interfaces/response.interface";
import { UploadService } from "../services/upload.service";

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  public uploadDoc = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // const userId: string = req.user?.id;
      const file = req.file as MulterFile;
      //  const userDocument = this.uploadService.saveDocToDB(file, userId);
      if (!file) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "No file uploaded" });
      }
      res.status(StatusCodes.OK).json({
        message: "file uploaded",
        data: document,
      });
    } catch (error) {
      next(error);
    }
  };

  public verifyDoc = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { docId } = req.params;
      const idDetails = req.body;
      await this.uploadService.verifyID(docId, idDetails);
      res
        .status(StatusCodes.OK)
        .json({ message: "Document Verification Successfull" });
    } catch (error) {
      next(error);
    }
  };
}
