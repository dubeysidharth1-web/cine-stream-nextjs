import React from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, renderActionButton }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="movie-grid" aria-label="Movie Grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          actionButton={renderActionButton ? renderActionButton(movie) : null}
        />
      ))}
    </section>
  );
}
