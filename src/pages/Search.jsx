import React, { useState, useEffect, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import InfiniteScrollLoader from '../components/InfiniteScrollLoader';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { searchMovies } from '../services/tmdb';
import { sanitizeQuery } from '../utils/sanitize';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce(searchTerm, 500);

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const executeSearchPage = useCallback(async (query, pageNum = 1, isInitial = true) => {
    const cleanQuery = sanitizeQuery(query);
    if (!cleanQuery) {
      setMovies([]);
      setLoading(false);
      setLoadingMore(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      setHasSearched(true);

      const data = await searchMovies(cleanQuery, pageNum);

      setTotalPages(data.totalPages || 1);
      setPage(data.page || pageNum);

      if (isInitial) {
        setMovies(data.movies);
      } else {
        setMovies((prevMovies) => {
          const existingIds = new Set(prevMovies.map((m) => m.id));
          const newUniqueMovies = data.movies.filter((m) => !existingIds.has(m.id));
          return [...prevMovies, ...newUniqueMovies];
        });
      }
    } catch (err) {
      setError(err.message || 'Search request failed. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    executeSearchPage(debouncedTerm, 1, true);
  }, [debouncedTerm, executeSearchPage]);

  const loadMoreSearchResults = useCallback(() => {
    if (loading || loadingMore || page >= totalPages) return;
    executeSearchPage(debouncedTerm, page + 1, false);
  }, [debouncedTerm, executeSearchPage, loading, loadingMore, page, totalPages]);

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMoreSearchResults,
    hasMore: page < totalPages,
    isLoading: loading || loadingMore,
  });

  const handleClear = () => {
    setSearchTerm('');
    setMovies([]);
    setError(null);
    setHasSearched(false);
    setPage(1);
    setTotalPages(1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <SearchIcon className="brand-icon" size={28} aria-hidden="true" />
          Search Movies
        </h1>
        <p className="page-subtitle">Type a movie title to search TMDB with real-time debounced updates & infinite scroll</p>
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

      {error && !loadingMore && (
        <ErrorMessage message={error} onRetry={() => executeSearchPage(debouncedTerm, 1, true)} />
      )}

      {!loading && !error && hasSearched && movies.length === 0 && (
        <EmptyState
          title="No movies found"
          message={`We couldn't find any movies matching "${debouncedTerm}". Try adjusting your keywords.`}
        />
      )}

      {movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />
          <InfiniteScrollLoader
            sentinelRef={sentinelRef}
            hasMore={page < totalPages}
            isLoadingMore={loadingMore}
          />
        </>
      )}
    </div>
  );
}
