import { NextFunction, Request, Response } from "express";
import { VerificationService } from "../services/verification.service";
import { StatusCodes } from "http-status-codes";

export class VerificationController {
  private verificationService: VerificationService;

  constructor() {
    this.verificationService = new VerificationService();
  }

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { docId } = req.body;
      const renterIdDetails = req.body.renterIdDetails;
      const verficationMessage = await this.verificationService.verifyID(
        docId,
        renterIdDetails,
      );
      res.status(StatusCodes.OK).json(verficationMessage);
    } catch (error) {
      next(error);
    }
  };
}
