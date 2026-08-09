import React, { useState, useEffect, useCallback } from 'react';
import { Flame } from 'lucide-react';
import { getPopularMovies } from '../services/tmdb';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import InfiniteScrollLoader from '../components/InfiniteScrollLoader';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopularPage = useCallback(async (pageNumber, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      const data = await getPopularMovies(pageNumber);

      setTotalPages(data.totalPages || 1);
      setPage(data.page || pageNumber);

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
      setError(err.message || 'Failed to load popular movies.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularPage(1, true);
  }, [fetchPopularPage]);

  const loadMoreMovies = useCallback(() => {
    if (loading || loadingMore || page >= totalPages) return;
    fetchPopularPage(page + 1, false);
  }, [fetchPopularPage, loading, loadingMore, page, totalPages]);

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMoreMovies,
    hasMore: page < totalPages,
    isLoading: loading || loadingMore,
  });

  return (
    <div className="page-container">
      <div className="hero-banner">
        <span className="hero-tag">
          <Flame size={14} aria-hidden="true" /> Trending Movies
        </span>
        <h1 className="hero-title">Discover Blockbusters & Hidden Gems</h1>
        <p className="hero-desc">
          Explore top rated and popular titles across world cinema with real-time updates and seamless browsing.
        </p>
      </div>

      <div className="page-header">
        <h2 className="page-title">Popular Movies</h2>
        <p className="page-subtitle">Currently trending films on TMDB</p>
      </div>

      {loading && <LoadingSpinner message="Fetching popular movies..." />}
      {error && !loadingMore && <ErrorMessage message={error} onRetry={() => fetchPopularPage(1, true)} />}

      {!loading && !error && movies.length === 0 && (
        <EmptyState title="No movies available" message="Please check your network or try refreshing." />
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
