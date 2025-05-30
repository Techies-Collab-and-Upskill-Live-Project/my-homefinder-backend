import { StatusCodes } from "http-status-codes";
import HTTPException from "../exceptions/http.exception";
import axios from "axios";
import { IDANALYZER_API_KEY, IDANALYZER_PROFILE_ID } from "../config";

export const idAnalyzer = async (fileurl: string) => {
  try {
    const fileBuffer = await axios.get(fileurl, {
      responseType: "arraybuffer",
    });

    const fileBase64 = Buffer.from(fileBuffer.data).toString("base64");

    const reponse = await axios.post("https://api.idanalyzer.com/coreapi", {
      profile_id: IDANALYZER_PROFILE_ID,
      file_base64: fileBase64,
      verify_doucment_number: true,
      biometric_match: false,
      headers: {
        "X-API-KEY": IDANALYZER_API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const verificationData = reponse.data.result;

    if (!verificationData) {
      throw new HTTPException(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Can't get VerificationData",
      );
    }
    const extractedId = verificationData.documentNumber;

    return extractedId;
  } catch (error) {
    throw new HTTPException(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Error in verifying Document",
    );
  }
};
