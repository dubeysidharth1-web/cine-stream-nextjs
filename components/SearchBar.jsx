"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { sanitizeQuery } from "@/utils/sanitize";

/**
 * SearchBar Component (Client Component).
 * Accessible debounced input for filtering movies by query string.
 *
 * @param {{ onSearch?: (query: string) => void, placeholder?: string }} props
 */
export default function SearchBar({
  onSearch,
  placeholder = "Search movies by title...",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    const sanitized = sanitizeQuery(debouncedSearchTerm);
    if (onSearch) {
      onSearch(sanitized);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar-container" role="search">
      <label htmlFor="movie-search-input" className="sr-only">
        Search movies
      </label>
      <svg
        className="search-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        id="movie-search-input"
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
        autoComplete="off"
      />
    </div>
  );
}
