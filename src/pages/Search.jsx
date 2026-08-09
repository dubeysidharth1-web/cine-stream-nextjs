import React, { useState, useEffect, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { searchMovies } from '../services/tmdb';
import { sanitizeQuery } from '../utils/sanitize';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce(searchTerm, 500);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const executeSearch = useCallback(async (query) => {
    const cleanQuery = sanitizeQuery(query);
    if (!cleanQuery) {
      setMovies([]);
      setLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const data = await searchMovies(cleanQuery, 1);
      setMovies(data.movies);
    } catch (err) {
      setError(err.message || 'Search request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    executeSearch(debouncedTerm);
  }, [debouncedTerm, executeSearch]);

  const handleClear = () => {
    setSearchTerm('');
    setMovies([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <SearchIcon className="brand-icon" size={28} aria-hidden="true" />
          Search Movies
        </h1>
        <p className="page-subtitle">Type a movie title to search TMDB with real-time debounced updates</p>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={handleClear}
        placeholder="Type a title e.g. Inception, Batman, Avatar..."
      />

      {!hasSearched && !loading && (
        <EmptyState
          title="Search for a Movie"
          message="Start typing in the search bar above. Results will automatically load after 500ms."
          icon={SearchIcon}
        />
      )}

      {loading && <LoadingSpinner message={`Searching movies for "${searchTerm.trim()}"...`} />}
      
      {error && <ErrorMessage message={error} onRetry={() => executeSearch(debouncedTerm)} />}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <EmptyState
          title="No movies found"
          message={`We couldn't find any movies matching "${debouncedTerm}". Try adjusting your keywords.`}
        />
      )}

      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
}
