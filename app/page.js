import { getPopularMovies } from "@/services/tmdb";
import MovieGrid from "@/components/MovieGrid";
import MovieCard from "@/components/MovieCard";
import EmptyState from "@/components/EmptyState";
import FavoriteButtonSlot from "@/components/FavoriteButtonSlot";

/**
 * Home Page (Server Component).
 * Fetches initial popular movies on the server to prevent client-side useEffect waterfalls.
 */
export default async function HomePage() {
  const { results: movies } = await getPopularMovies(1);

  if (!movies || movies.length === 0) {
    return (
      <EmptyState
        title="No Popular Movies Available"
        message="Unable to retrieve trending movies. Please verify your TMDB API configuration."
      />
    );
  }

  return (
    <div>
      <section className="page-header">
        <h1 className="page-title">Popular Movies</h1>
        <p className="page-subtitle">
          Explore top-rated and trending films fetched live via Next.js 15 Server Components.
        </p>
      </section>

      <MovieGrid>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            actionSlot={<FavoriteButtonSlot movie={movie} />}
          />
        ))}
      </MovieGrid>
    </div>
  );
}
