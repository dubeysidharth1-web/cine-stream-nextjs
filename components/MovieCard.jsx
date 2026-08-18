import Image from "next/image";
import Link from "next/link";
import { getPosterUrl } from "@/services/tmdb";
import { getReleaseYear } from "@/utils/formatDate";

/**
 * MovieCard Component (Server Component by default).
 * Renders movie poster, title, release year, rating badge, and action slot.
 *
 * @param {{ movie: Object, actionSlot?: React.ReactNode }} props
 */
export default function MovieCard({ movie, actionSlot }) {
  if (!movie) return null;

  const posterUrl = getPosterUrl(movie.poster_path);
  const releaseYear = getReleaseYear(movie.release_date);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <Link href={`/movie/${movie.id}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={posterUrl}
            alt={`Poster for ${movie.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="poster-image"
            priority={false}
          />
        </Link>

        <div className="rating-badge" aria-label={`Rating: ${rating} out of 10`}>
          <span aria-hidden="true">★</span>
          <span>{rating}</span>
        </div>

        {actionSlot && <div className="fav-button-wrapper">{actionSlot}</div>}
      </div>

      <div className="movie-card-body">
        <h3 className="movie-card-title">
          <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <div className="movie-card-meta">
          <span>{releaseYear}</span>
        </div>
      </div>
    </article>
  );
}
