import React from "react";
import { render, screen } from "@testing-library/react";
import MovieGrid from "@/components/MovieGrid";

describe("MovieGrid Component", () => {
  it("renders children elements in grid layout", () => {
    render(
      <MovieGrid>
        <div data-testid="card-1">Card 1</div>
        <div data-testid="card-2">Card 2</div>
      </MovieGrid>
    );

    expect(screen.getByTestId("card-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-2")).toBeInTheDocument();
  });
});
