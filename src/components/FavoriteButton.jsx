import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!movie || !movie.id) return null;

  const active = isFavorite(movie.id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <button
      type="button"
      className={`favorite-btn ${active ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={active ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={18}
        className="heart-icon"
        fill={active ? 'var(--favorite-heart)' : 'none'}
        color={active ? 'var(--favorite-heart)' : 'currentColor'}
      />
    </button>
  );
}
