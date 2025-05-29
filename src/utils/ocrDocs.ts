import { createWorker } from "tesseract.js";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { readFile } from "fs/promises";

export const extractTextFromImage = async (imageUrl: string) => {
  const worker = await createWorker("eng");
  try {
    const buffer = await readFile(imageUrl);
    const {
      data: { text },
    } = await worker.recognize(Buffer.from(buffer));
    return text;
  } catch (error) {
    console.error("OCR error", error);
    throw new HTTPException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unable to read image",
    );
  } finally {
    await worker.terminate();
  }
};
