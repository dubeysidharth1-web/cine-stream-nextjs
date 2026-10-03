import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "@/components/LoadingSpinner";

describe("LoadingSpinner Component", () => {
  it("renders loading spinner with default message and status role", () => {
    render(<LoadingSpinner />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading movie collection...")).toBeInTheDocument();
  });

  it("renders custom loading message when provided", () => {
    render(<LoadingSpinner message="Fetching details..." />);

    expect(screen.getByText("Fetching details...")).toBeInTheDocument();
  });
});
