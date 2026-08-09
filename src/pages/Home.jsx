import React, { useState, useEffect, useCallback } from 'react';
import { Flame } from 'lucide-react';
import { getPopularMovies } from '../services/tmdb';
import MovieGrid from '../components/MovieGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopular = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPopularMovies(1);
      setMovies(data.movies);
    } catch (err) {
      setError(err.message || 'Failed to load popular movies.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopular();
  }, [fetchPopular]);

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
      {error && <ErrorMessage message={error} onRetry={fetchPopular} />}
      {!loading && !error && movies.length === 0 && (
        <EmptyState title="No movies available" message="Please check your network or try refreshing." />
      )}
      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  );
}
