import { Client } from "@googlemaps/google-maps-services-js";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import { GOOGLE_MAPS_API_KEY } from "../config";

const client = new Client({});

export async function geocodeAddress(
  address: string,
): Promise<{ formatedAddress: string; lat: number; lng: number }> {
  try {
    const gisResponse = await client.geocode({
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY as string,
      },
    });
    const result = gisResponse.data.results[0];
    return {
      formatedAddress: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    };
  } catch (error) {
    throw new HTTPException(StatusCodes.BAD_REQUEST, "Unable to get address");
  }
}
