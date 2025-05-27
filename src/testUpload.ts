import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      "/home/stateman24/node.js_projects/my-homefinder-backend/src/test.jpg",
      {
        folder: "documents",
      },
    );
    console.log("Upload successful:", result);
  } catch (error) {
    console.error("Direct Cloudinary upload failed:", error);
  }
}
