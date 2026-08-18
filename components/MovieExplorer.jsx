"use client";

import { useState, useCallback } from "react";
import { searchMovies } from "@/services/tmdb";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import MovieCard from "@/components/MovieCard";
import FavoriteButtonSlot from "@/components/FavoriteButtonSlot";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

/**
 * MovieExplorer Client Component.
 * Receives server-fetched initial popular movies, provides real-time debounced TMDB search.
 *
 * @param {{ initialMovies: Array }} props
 */
export default function MovieExplorer({ initialMovies = [] }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async (searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchMovies(searchQuery);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const displayedMovies = query.trim() ? searchResults : initialMovies;

  return (
    <div>
      <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="page-title">
            {query.trim() ? `Search Results for "${query}"` : "Popular Movies"}
          </h1>
          <p className="page-subtitle">
            {query.trim()
              ? `Found ${searchResults.length} matching title${searchResults.length === 1 ? "" : "s"}`
              : "Explore top-rated and trending films fetched live via Next.js 15 Server Components."}
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
      </div>

      {isSearching ? (
        <LoadingSpinner message={`Searching TMDB for "${query}"...`} />
      ) : displayedMovies.length === 0 ? (
        <EmptyState
          title="No Matching Movies"
          message={`No movies found matching "${query}". Try searching for another title.`}
        />
      ) : (
        <MovieGrid>
          {displayedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              actionSlot={<FavoriteButtonSlot movie={movie} />}
            />
          ))}
        </MovieGrid>
      )}
    </div>
  );
}
