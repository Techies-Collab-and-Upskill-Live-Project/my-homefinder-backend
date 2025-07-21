import {StatusCodes} from "http-status-codes";
import {prisma} from '../prisma/prisma';
import HTTPException from "../exceptions/http.exception";
import {MulterFile} from "../interfaces/multerFile.interface";

export class UploadService {

    public uploadDocument = async (file: MulterFile, userid: string, type: string, docNumber: string) => {
        if (!file) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "File is missing");
        }
        const userDocument = await prisma.userDocument.create({
            data: {
                userId: userid,
                fileName: file.filename,
                type: type,
                documentNumber: docNumber,
                fileUrl: file.path,
            },
        });
        if (!userDocument) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "Document not Found");
        }
        return userDocument;
    };

}
