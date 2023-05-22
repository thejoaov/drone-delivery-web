import { describe, it, vi } from "vitest";
import apiInstance from "../instance";
import { api } from "..";

vi.mock("../../services/api");

const mockResponse = {
  data: {
    path: ["A1", "B2", "C3"],
    time: 30,
  },
  status: 200,
};

describe("api", () => {
  it("should call api with correct params", async () => {
    vi.spyOn(apiInstance, "get").mockResolvedValue(mockResponse);
    await api.delivery.getBestRoute("A1", "B2", "C3");

    expect(apiInstance.get).toHaveBeenCalledWith("/delivery/best-route", {
      params: {
        droneStart: "A1",
        pickup: "B2",
        destination: "C3",
      },
    });
  });

  it("should return data if api call succeeds", async () => {
    vi.spyOn(apiInstance, "get").mockResolvedValue(mockResponse);

    expect(api.delivery.getBestRoute("A1", "B2", "C3")).resolves.toStrictEqual(
      mockResponse
    );
  });

  it("should return error if api call fails", async () => {
    vi.spyOn(apiInstance, "get").mockRejectedValue({ message: "error" });

    expect(api.delivery.getBestRoute("A1", "B2", "C3")).rejects.toThrowError(
      "error"
    );
  });
});
