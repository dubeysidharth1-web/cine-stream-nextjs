import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { getReleaseYear } from '../utils/formatDate';
import { FALLBACK_POSTER } from '../utils/constants';
import FavoriteButton from './FavoriteButton';

export default function MovieCard({ movie, actionButton }) {
  const [imageError, setImageError] = useState(false);

  if (!movie) return null;

  const releaseYear = getReleaseYear(movie.releaseYear);
  const posterSource = imageError || !movie.posterPath ? FALLBACK_POSTER : movie.posterPath;

  return (
    <article className="movie-card" tabIndex="0" aria-label={`${movie.title} (${releaseYear})`}>
      <div className="poster-wrapper">
        <img
          src={posterSource}
          alt={`Poster for ${movie.title}`}
          loading="lazy"
          className="movie-poster"
          onError={() => setImageError(true)}
        />
        <div className="rating-badge" aria-label={`Rating ${movie.rating} out of 10`}>
          <Star className="rating-star" size={14} aria-hidden="true" />
          <span>{movie.rating}</span>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        <div className="movie-meta">
          <span className="release-year">{releaseYear}</span>
          {actionButton ? actionButton : <FavoriteButton movie={movie} />}
        </div>
      </div>
    </article>
  );
}
