import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { getPopularMovies } from '../services/tmdb';
import MovieGrid from '../components/MovieGrid';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPopular() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularMovies(1);
        if (isMounted) {
          setMovies(data.movies);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load popular movies.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPopular();

    return () => {
      isMounted = false;
    };
  }, []);

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

      {loading && <p style={{ color: 'var(--text-muted)' }}>Loading movies...</p>}
      {error && <p style={{ color: 'var(--primary)' }}>{error}</p>}
      {!loading && !error && <MovieGrid movies={movies} />}
    </div>
  );
}
