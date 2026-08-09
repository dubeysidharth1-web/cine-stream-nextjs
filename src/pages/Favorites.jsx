import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import MovieGrid from '../components/MovieGrid';
import EmptyState from '../components/EmptyState';

export default function Favorites() {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Heart className="brand-icon" size={28} style={{ color: 'var(--favorite-heart)' }} aria-hidden="true" />
          My Favorites
        </h1>
        <p className="page-subtitle">
          {favoritesCount === 0
            ? 'Your personal watchlist is currently empty'
            : `You have ${favoritesCount} movie${favoritesCount === 1 ? '' : 's'} saved in your local favorites`}
        </p>
      </div>

      {favoritesCount === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Browse popular movies or search for your favorite titles and click the heart icon to save them here."
          icon={Heart}
          action={
            <Link to="/" className="btn btn-retry">
              <Home size={16} aria-hidden="true" />
              <span>Explore Movies</span>
            </Link>
          }
        />
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}
