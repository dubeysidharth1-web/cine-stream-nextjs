"use client";

import { useFavorites } from "@/context/FavoritesContext";
import MovieGrid from "@/components/MovieGrid";
import MovieCard from "@/components/MovieCard";
import FavoriteButtonSlot from "@/components/FavoriteButtonSlot";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <LoadingSpinner message="Loading your saved favorites..." />;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div>
        <section className="page-header">
          <h1 className="page-title">My Favorites</h1>
          <p className="page-subtitle">Your personal cinema watch list.</p>
        </section>

        <EmptyState
          title="No Favorite Movies Yet"
          message="You haven't saved any movies to your favorites. Click the heart icon on any movie card to add it to your collection!"
          actionLabel="Explore Popular Movies"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div>
      <section className="page-header">
        <h1 className="page-title">My Favorites</h1>
        <p className="page-subtitle">
          {favorites.length} saved movie{favorites.length === 1 ? "" : "s"} in your watch list.
        </p>
      </section>

      <MovieGrid>
        {favorites.map((movie) => (
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
