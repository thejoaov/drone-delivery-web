import apiInstance from "./instance";
import { GetDeliveryBestRouteResponse } from "./types";

export const api = {
  delivery: {
    getBestRoute: (droneStart: string, pickup: string, destination: string) =>
      apiInstance.get<GetDeliveryBestRouteResponse>(`/delivery/best-route`, {
        params: {
          droneStart,
          pickup,
          destination,
        },
      }),
  },
};
