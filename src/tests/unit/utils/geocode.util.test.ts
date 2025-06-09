import { Client } from "@googlemaps/google-maps-services-js";
import { geocodeAddress } from "../../../utils/geocode.util";


describe("geocodeAddress", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return formatted address, latitude, and longitude", async () => {
          const mockAddress = "Gbagada";
        const mockResponse = {
            data: {
                results: [
                    {
                        formatted_address: "Gbagada, Lagos, Nigeria",
                        geometry: {
                            location: {
                                lat: 6.5583,
                                lng: 3.3622,
                            },
                        },
                    },
                ],
                status: "OK",
                error_message: undefined,
            },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
        } as any;

        jest.spyOn(Client.prototype, "geocode").mockResolvedValue(mockResponse);

        const result = await geocodeAddress(mockAddress);

        expect(result).toEqual({
            formatedAddress: "Gbagada, Lagos, Nigeria",
            lat: 6.5583,
            lng: 3.3622,
        });
    });
});