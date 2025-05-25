import path from "path";
import multer from "multer";

// Define __filename and __dirname for ESM

const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename(_req, file, callback) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}${ext}`;
    callback(null, uniqueName);
  },
});

export const uploadMiddleware = multer({ storage });
