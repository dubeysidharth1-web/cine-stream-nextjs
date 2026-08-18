import { getPopularMovies } from "@/services/tmdb";
import MovieExplorer from "@/components/MovieExplorer";
import EmptyState from "@/components/EmptyState";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Popular Movies | Cine-Stream",
  description: "Browse popular movies, search top titles, and explore cinema details with Next.js 15.",
};

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

  return <MovieExplorer initialMovies={movies} />;
}
