import React from "react";
import { screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieExplorer from "@/components/MovieExplorer";
import { searchMovies } from "@/services/tmdb";
import { renderWithProviders, mockMovie, mockMoviesList } from "../helpers/test-helpers";

// Mock the API service module
jest.mock("@/services/tmdb", () => {
  const originalModule = jest.requireActual("@/services/tmdb");
  return {
    ...originalModule,
    searchMovies: jest.fn(),
  };
});

describe("MovieExplorer Async Component Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders initial popular movies passed as props", () => {
    renderWithProviders(<MovieExplorer initialMovies={mockMoviesList} />);

    expect(screen.getByRole("heading", { name: "Popular Movies" })).toBeInTheDocument();
    expect(screen.getByText("Fight Club")).toBeInTheDocument();
    expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
  });

  it("handles debounced search, loading state, and renders mock API search results", async () => {
    searchMovies.mockResolvedValue({
      results: [mockMovie],
      total_pages: 1,
    });

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProviders(<MovieExplorer initialMovies={mockMoviesList} />);

    const searchInput = screen.getByRole("searchbox");

    await user.type(searchInput, "Fight Club");

    act(() => {
      jest.advanceTimersByTime(450);
    });

    await waitFor(() => {
      expect(searchMovies).toHaveBeenCalledWith("Fight Club");
    });

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: 'Search Results for "Fight Club"' })).toBeInTheDocument();
      expect(screen.getByText("Found 1 matching title")).toBeInTheDocument();
      expect(screen.getByText("Fight Club")).toBeInTheDocument();
    });
  });

  it("displays EmptyState when mock API returns no results", async () => {
    searchMovies.mockResolvedValue({
      results: [],
      total_pages: 0,
    });

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProviders(<MovieExplorer initialMovies={mockMoviesList} />);

    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "NonexistentMovie123");

    act(() => {
      jest.advanceTimersByTime(450);
    });

    await waitFor(() => {
      expect(screen.getByText("No Matching Movies")).toBeInTheDocument();
      expect(
        screen.getByText('No movies found matching "NonexistentMovie123". Try searching for another title.')
      ).toBeInTheDocument();
    });
  });

  it("handles API rejection gracefully without crashing", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    searchMovies.mockRejectedValue(new Error("Network Error"));

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithProviders(<MovieExplorer initialMovies={mockMoviesList} />);

    const searchInput = screen.getByRole("searchbox");
    await user.type(searchInput, "ErrorQuery");

    act(() => {
      jest.advanceTimersByTime(450);
    });

    await waitFor(() => {
      expect(screen.getByText("No Matching Movies")).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
