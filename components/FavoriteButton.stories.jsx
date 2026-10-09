import React, { useEffect } from "react";
import FavoriteButton from "./FavoriteButton";
import { useFavorites } from "@/context/FavoritesContext";

const SeedFavoriteDecorator = (isFav) => (Story, context) => {
  const SeedComponent = () => {
    const { addFavorite, removeFavorite } = useFavorites();
    const movie = context.args.movie;

    useEffect(() => {
      if (movie && movie.id) {
        if (isFav) {
          addFavorite(movie);
        } else {
          removeFavorite(movie.id);
        }
      }
    }, [movie]);

    return <Story />;
  };

  return <SeedComponent />;
};

export default {
  title: "Components/FavoriteButton",
  component: FavoriteButton,
  tags: ["autodocs"],
  argTypes: {
    movie: {
      control: "object",
      description: "Movie object passed to FavoriteButton to track favorited status.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", display: "inline-block", background: "var(--bg-surface)", borderRadius: "12px" }}>
        <Story />
      </div>
    ),
  ],
};

const mockMovie = {
  id: 550,
  title: "Fight Club",
};

const mockMovie2 = {
  id: 155,
  title: "The Dark Knight",
};

export const Inactive = {
  args: {
    movie: mockMovie,
  },
  decorators: [SeedFavoriteDecorator(false)],
};

export const Active = {
  args: {
    movie: mockMovie2,
  },
  decorators: [SeedFavoriteDecorator(true)],
};
