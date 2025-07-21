import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {MulterFile} from "../interfaces/multerFile.interface";
import {RequestWithUser} from "../interfaces/auth.interface";
import {UploadService} from "../services/upload.service";

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
            const type = req.query.type as string;
            const file = req.file as MulterFile;
            const docNumber = req.body.docNumber as string;
            const userDocument = this.uploadService.uploadDocument(file, userId, type, docNumber);
            if (!file) {
                return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({message: "No file uploaded"});
            }
            res.status(StatusCodes.OK).json({
                message: "User Document Uploaded successfully",
            });
        } catch (error) {
            next(error);
        }
    };
}
