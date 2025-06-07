import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
import HTTPException from "../exceptions/http.exception";
import { MulterFile } from "../interfaces/multerFile.interface";

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

  public saveMultipleDocsToDB = async (files: MulterFile[], userid: string) => {
    if (!files || files.length === 0)
      throw new HTTPException(StatusCodes.BAD_REQUEST, "Files are missing");
    const fileDataArray: { userId: string; fileName: string; fileUrl: string }[] = [];
    for (const file of files) {
      const fileData = {
        userId: userid,
        fileName: file.filename,
        fileUrl: file.path,
      };
      fileDataArray.push(fileData);
    }

    const userDocuments = await this.prisma.userDocument.createMany({
      data: fileDataArray,
    });

    return userDocuments;
  };
}
