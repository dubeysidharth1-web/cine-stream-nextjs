import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search for movies, actors, titles...' }) {
  return (
    <form className="search-bar-form" onSubmit={(e) => e.preventDefault()} role="search">
      <label htmlFor="movie-search-input" className="sr-only">
        Search movies by title
      </label>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} aria-hidden="true" />
        <input
          id="movie-search-input"
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search movies by title"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClear}
            aria-label="Clear search input"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
}
