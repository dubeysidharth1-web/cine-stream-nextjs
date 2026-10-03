import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoritesProvider, useFavorites } from "@/context/FavoritesContext";
import { mockMovie, mockMovieSecond } from "../helpers/test-helpers";

function TestConsumerComponent() {
  const { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div>
      <span data-testid="favorites-count">{favorites.length}</span>
      <button data-testid="add-btn" onClick={() => addFavorite(mockMovie)}>
        Add
      </button>
      <button data-testid="remove-btn" onClick={() => removeFavorite(mockMovie.id)}>
        Remove
      </button>
      <button data-testid="toggle-btn" onClick={() => toggleFavorite(mockMovieSecond)}>
        Toggle
      </button>
      <span data-testid="is-fav">{isFavorite(mockMovie.id) ? "yes" : "no"}</span>
    </div>
  );
}

describe("FavoritesContext State Management", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("provides initial empty favorites state", () => {
    render(
      <FavoritesProvider>
        <TestConsumerComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-fav")).toHaveTextContent("no");
  });

  it("adds and removes items from favorites state", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestConsumerComponent />
      </FavoritesProvider>
    );

    await user.click(screen.getByTestId("add-btn"));
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-fav")).toHaveTextContent("yes");

    // Clicking add again should not add duplicate
    await user.click(screen.getByTestId("add-btn"));
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");

    await user.click(screen.getByTestId("remove-btn"));
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-fav")).toHaveTextContent("no");
  });

  it("toggles favorite items properly", async () => {
    const user = userEvent.setup();
    render(
      <FavoritesProvider>
        <TestConsumerComponent />
      </FavoritesProvider>
    );

    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");

    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
  });

  it("hydrates state from localStorage on mount", () => {
    window.localStorage.setItem("cine_stream_favorites_v1", JSON.stringify([mockMovie]));

    render(
      <FavoritesProvider>
        <TestConsumerComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-fav")).toHaveTextContent("yes");
  });

  it("throws error when useFavorites is consumed outside FavoritesProvider", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestConsumerComponent />)).toThrow(
      "useFavorites must be used within a FavoritesProvider"
    );

    consoleSpy.mockRestore();
  });
});
