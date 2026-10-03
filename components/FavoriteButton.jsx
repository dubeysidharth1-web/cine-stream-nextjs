"use client";

import { useFavorites } from "@/context/FavoritesContext";

/**
 * FavoriteButton Component (Client Component).
 * Toggles a movie's favorite status in FavoritesContext & localStorage.
 *
 * @param {{ movie: Object }} props
 */
export default function FavoriteButton({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = movie ? isFavorite(movie.id) : false;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (movie) {
      toggleFavorite(movie);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`fav-btn ${active ? "is-favorite" : ""}`}
      aria-label={active ? `Remove ${movie?.title || "movie"} from favorites` : `Add ${movie?.title || "movie"} to favorites`}
      title={active ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}
