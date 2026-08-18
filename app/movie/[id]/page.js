import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieById, getPosterUrl, getBackdropUrl } from "@/services/tmdb";
import { formatDate } from "@/utils/formatDate";
import FavoriteButtonSlot from "@/components/FavoriteButtonSlot";

/**
 * Dynamic SEO metadata generator for /movie/[id].
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return { title: "Movie Not Found | Cine-Stream" };
  }

  const movie = await getMovieById(id);

  if (!movie) {
    return {
      title: "Movie Not Found | Cine-Stream",
      description: "The requested movie could not be found.",
    };
  }

  return {
    title: `${movie.title} | Cine-Stream Explorer`,
    description: movie.overview || `View rating, release date, and overview for ${movie.title} on Cine-Stream.`,
    openGraph: {
      title: `${movie.title} | Cine-Stream`,
      description: movie.overview,
      images: movie.poster_path ? [getPosterUrl(movie.poster_path, "w500")] : [],
    },
  };
}

/**
 * Server Component for dynamic Movie Detail page.
 */
export default async function MovieDetailPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  const movie = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  const posterUrl = getPosterUrl(movie.poster_path);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const releaseDate = formatDate(movie.release_date);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const runtime = movie.runtime ? `${movie.runtime} min` : "N/A";

  return (
    <div>
      <Link href="/" className="back-btn" aria-label="Return to Popular Movies">
        ← Back to Popular Movies
      </Link>

      <article className="movie-detail-hero">
        {backdropUrl && (
          <div
            className="backdrop-blur"
            style={{ backgroundImage: `url(${backdropUrl})` }}
            aria-hidden="true"
          />
        )}

        <div className="detail-content">
          <div className="detail-poster-container">
            <Image
              src={posterUrl}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="(max-width: 850px) 100vw, 300px"
              priority
              className="poster-image"
            />
          </div>

          <div className="detail-info">
            <div className="detail-title-row">
              <div>
                <h1 className="detail-title">{movie.title}</h1>
                {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}
              </div>
              <FavoriteButtonSlot movie={movie} />
            </div>

            <div className="detail-badges">
              <span className="badge badge-gold">★ {rating} / 10 ({movie.vote_count || 0} votes)</span>
              <span className="badge">📅 {releaseDate}</span>
              <span className="badge">⏱ {runtime}</span>
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="badge">
                  {genre.name}
                </span>
              ))}
            </div>

            <div>
              <h2 className="state-title" style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                Overview
              </h2>
              <p className="detail-overview">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
