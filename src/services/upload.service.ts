import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "../../generated/prisma";
import HTTPException from "../exceptions/http.exception";
import { MulterFile } from "../interfaces/multerFile.interface";

export class UploadService {
  private prisma = new PrismaClient();

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
}
