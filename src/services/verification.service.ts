import { prisma } from '../prisma/prisma';
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { idAnalyzer } from "../utils/idAnalyzer.utils";
import { renterIdDetails } from "../interfaces/response.interface";

export class VerificationService {

  // get document and verify
  public verifyID = async (docId: string, idDetails: renterIdDetails) => {
    const userDocument = await prisma.userDocument.findUnique({
      where: {
        id: docId,
      },
    });
    if (!userDocument) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Doucumet not found");
    }

    const extractedId = await idAnalyzer(userDocument.fileUrl);
    if (extractedId != idDetails.idNumber) {
      // set the document verfication to REJECTED
      prisma.userDocument.update({
        where: {
          id: docId,
        },
        data: {
          status: "REJECTED",
        },
      });
      throw new HTTPException(
        StatusCodes.FORBIDDEN,
        "Document Verification Failed",
      );
    }
    // Set the document verification to APPROVED
    await prisma.userDocument.update({
      where: {
        id: docId,
      },
      data: {
        status: "APPROVED",
      },
    });
    return { message: "User Document Approve" };
  };
}
