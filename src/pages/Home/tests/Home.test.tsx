import { render, fireEvent, RenderResult } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import Home from "../index";

vi.mock("../../services/api");

const mockResponse = {
  data: {
    path: ["A1", "B2", "C3"],
    time: 30,
  },
  status: 200,
};

vi.spyOn(axios, "get").mockResolvedValue(mockResponse);

describe("Home test", () => {
  let screen: RenderResult;

  beforeEach(() => {
    screen = render(<Home />);
  });
  it("renders correctly", () => {
    expect(screen.getByText("AmazonIA")).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText("Drone Start")[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText("Object Pickup")[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText("Destination")[0]
    ).toBeInTheDocument();
    expect(screen.getByTitle("Calculate Fastest Route!")).toBeInTheDocument();
  });

  it("handles input correctly", () => {
    fireEvent.change(screen.getAllByPlaceholderText("Drone Start")[0], {
      target: { value: "A1" },
    });
    expect(screen.getAllByPlaceholderText("Drone Start")[0]).toHaveValue("A1");

    fireEvent.change(screen.getAllByPlaceholderText("Object Pickup")[0], {
      target: { value: "B2" },
    });
    expect(screen.getAllByPlaceholderText("Object Pickup")[0]).toHaveValue(
      "B2"
    );

    fireEvent.change(screen.getAllByPlaceholderText("Destination")[0], {
      target: { value: "C3" },
    });
    expect(screen.getAllByPlaceholderText("Destination")[0]).toHaveValue("C3");
  });
});
