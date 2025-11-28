import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import MapPage from "@/app/map/page";
import ComparePage from "@/app/compare/page";
import { themeParks } from "@/lib/data";

describe("App pages render", () => {
  it("renders home with park count", () => {
    render(<Home />);
    expect(screen.getByText(/All Theme Parks/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${themeParks.length} parks? found`, "i"))).toBeInTheDocument();
  });

  it("renders map view", () => {
    render(<MapPage />);
    expect(screen.getByText(/Theme Parks by Region/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to all parks/i)).toBeInTheDocument();
  });

  it("renders compare page", () => {
    render(<ComparePage />);
    expect(screen.getByText(/Compare Theme Parks/i)).toBeInTheDocument();
    expect(screen.getByText(/No parks selected/i)).toBeInTheDocument();
  });
});
