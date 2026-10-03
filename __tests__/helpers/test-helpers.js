import React from "react";
import { render } from "@testing-library/react";
import { FavoritesProvider } from "@/context/FavoritesContext";

/**
 * Standard realistic TMDB movie mock data matching Cine-Stream structure.
 */
export const mockMovie = {
  id: 550,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  backdrop_path: "/hZk2Q1PsuV4v8vsdWz24W45jXn.jpg",
  release_date: "1999-10-15",
  vote_average: 8.433,
  overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
};

export const mockMovieSecond = {
  id: 155,
  title: "The Dark Knight",
  poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  backdrop_path: "/nMKFuGd2dShAtMuT6TKqWBOd1Z2.jpg",
  release_date: "2008-07-16",
  vote_average: 8.515,
  overview: "Batman raises the stakes in his war on crime.",
};

export const mockMoviesList = [mockMovie, mockMovieSecond];

/**
 * Helper function to render components wrapped with required application providers.
 *
 * @param {React.ReactElement} ui
 * @param {Object} options
 */
export function renderWithProviders(ui, options = {}) {
  function Wrapper({ children }) {
    return <FavoritesProvider>{children}</FavoritesProvider>;
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
