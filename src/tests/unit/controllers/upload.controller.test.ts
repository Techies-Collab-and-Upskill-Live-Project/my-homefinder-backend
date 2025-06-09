import { UploadController } from "../../../controllers/upload.controller";
import { RequestWithUser } from "../../../interfaces/auth.interface";
import { UploadService } from "../../../services/upload.service";
import { Readable } from "stream";

describe("UploadController", () => {
  let uploadController: UploadController;
  let uploadService: UploadService;

  let mockReq: Partial<RequestWithUser>;
  let mockRes: Partial<any>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    uploadController = new UploadController();

    // Mock the uploadService inside the controller
    uploadService = uploadController["uploadService"] = {
      saveDocToDB: jest.fn(),
      saveMultipleDocsToDB: jest.fn(),
    } as any;

    
    const mockFile = {
      fieldname: "file",
      originalname: "test.pdf",
      encoding: "7bit",
      mimetype: "image/png",
      buffer: Buffer.from("test"),
      size: 123, 
      stream: new Readable(), 
      destination: "/tmp", 
      filename: "test.pdf",
      path: "/tmp/test.pdf",
    };

    mockReq = {
      user: {
        id: "test123",
        fullName: "Test User",
        email: "test@gmailcom",
        phone: "1234567890",
        roleId: 1,
        isVerified: false,
        password: "hashedpassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      file: mockFile,
    
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  describe("uploadDoc", () => {
    it("should upload a single document and return response", async () => {
      const mockDoc = { id: "doc123", name: "file.pdf" };

      (uploadService.saveDocToDB as jest.Mock).mockReturnValue(mockDoc);

      await uploadController.uploadDoc(
        mockReq as RequestWithUser,
        mockRes as any,
        mockNext,
      );

      expect(uploadService.saveDocToDB).toHaveBeenCalledWith(
        mockReq.file,
        "test123",
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "file uploaded",
        data: mockDoc,
      });
    });

    it("should return 404 if no file is uploaded", async () => {
      mockReq.file = undefined;
      const result = await uploadController.uploadDoc(
        mockReq as RequestWithUser,
        mockRes as any,
        mockNext,
      );

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "No file uploaded",
      });
    });
  });

  describe("uploadMultipleDocs", () => {
    it("should upload multiple documents and return response", async () => {
      const mockFiles = [
        {
          fieldname: "files",
          originalname: "file1.pdf",
          encoding: "7bit",
          mimetype: "application/pdf",
          buffer: Buffer.from("test1"),
          size: 123,
          stream: new Readable(),
          destination: "/tmp",
          filename: "file1.pdf",
          path: "/tmp/file1.pdf",
        },
        {
          fieldname: "files",
          originalname: "file2.pdf",
          encoding: "7bit",
          mimetype: "application/pdf",
          buffer: Buffer.from("test2"),
          size: 124,
          stream: new Readable(),
          destination: "/tmp",
          filename: "file2.pdf",
          path: "/tmp/file2.pdf",
        },
      ];

      const mockDocs = [
        { id: "doc1", name: "file1.pdf" },
        { id: "doc2", name: "file2.pdf" },
      ];

      mockReq.files = mockFiles;
      (uploadService.saveMultipleDocsToDB as jest.Mock).mockResolvedValue(
        mockDocs,
      );

      await uploadController.uploadMultipleDocs(
        mockReq as RequestWithUser,
        mockRes as any,
        mockNext,
      );

      expect(uploadService.saveMultipleDocsToDB).toHaveBeenCalledWith(
        mockFiles,
        "test123",
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Files uploaded successfully",
        data: mockDocs,
      });
    });
  });
});
