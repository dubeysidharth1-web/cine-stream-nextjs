import React from "react";
import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";
import { mockMovie } from "../helpers/test-helpers";

describe("MovieCard Component", () => {
  it("renders movie title, release year, and rating badge correctly", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Fight Club")).toBeInTheDocument();
    expect(screen.getByText("1999")).toBeInTheDocument();
    expect(screen.getByText("8.4")).toBeInTheDocument();
  });

  it("renders link pointing to movie details page", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("link", { name: "Fight Club" });
    expect(link).toHaveAttribute("href", "/movie/550");
  });

  it("renders optional action slot when passed", () => {
    render(
      <MovieCard
        movie={mockMovie}
        actionSlot={<button data-testid="custom-action">Fav</button>}
      />
    );

    expect(screen.getByTestId("custom-action")).toBeInTheDocument();
  });

  it("handles missing release date and rating gracefully", () => {
    const incompleteMovie = {
      id: 999,
      title: "Unknown Movie",
      poster_path: null,
      release_date: null,
      vote_average: null,
    };

    render(<MovieCard movie={incompleteMovie} />);

    expect(screen.getByText("Unknown Movie")).toBeInTheDocument();
    const naElements = screen.getAllByText("N/A");
    expect(naElements.length).toBeGreaterThanOrEqual(2);
  });

  it("returns null if movie prop is not provided", () => {
    const { container } = render(<MovieCard movie={null} />);
    expect(container.firstChild).toBeNull();
  });
});
