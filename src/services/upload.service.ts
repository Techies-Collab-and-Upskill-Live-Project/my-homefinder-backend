import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "../../generated/prisma";
import HTTPException from "../exceptions/http.exception";
import { MulterFile } from "../interfaces/multerFile.interface";
import { renterIdDetails } from "../interfaces/response.interface";
import { idAnalyzer } from "../utils/idAnalyzer";

export class UploadService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public saveDocToDB = async (file: MulterFile, userid: string) => {
    if (!file) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, "File is missing");
    }
    const userDoucment = await this.prisma.userDocument.create({
      data: {
        userId: userid,
        fileName: file.filename,
        fileUrl: file.path,
      },
    });
    if (!userDoucment) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Document not Found");
    }
    return userDoucment;
  };

  public verifyID = async (docId: string, idDetails: renterIdDetails) => {
    const userDocument = await this.prisma.userDocument.findUnique({
      where: {
        id: docId,
      },
    });
    if (!userDocument) {
      throw new HTTPException(StatusCodes.NOT_FOUND, "Doucumet not found");
    }

    const extractedId = await idAnalyzer(userDocument.fileUrl);
    if (extractedId != idDetails.idNumber) {
      throw new HTTPException(
        StatusCodes.FORBIDDEN,
        "Document Verification Falied",
      );
    }
  };
}
