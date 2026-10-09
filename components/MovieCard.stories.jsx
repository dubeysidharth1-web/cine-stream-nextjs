import React from "react";
import MovieCard from "./MovieCard";
import FavoriteButton from "./FavoriteButton";

export default {
  title: "Components/MovieCard",
  component: MovieCard,
  tags: ["autodocs"],
  argTypes: {
    movie: {
      control: "object",
      description: "Movie data object containing id, title, poster_path, release_date, vote_average.",
    },
    actionSlot: {
      control: false,
      description: "Optional slot element (e.g. FavoriteButton).",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "260px" }}>
        <Story />
      </div>
    ),
  ],
};

const mockMovie = {
  id: 550,
  title: "Fight Club",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
};

const mockHighRating = {
  id: 155,
  title: "The Dark Knight",
  poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  release_date: "2008-07-16",
  vote_average: 9.0,
};

const mockNoPoster = {
  id: 999,
  title: "Indie Mystery Film",
  poster_path: null,
  release_date: "2024-05-12",
  vote_average: 6.8,
};

export const Default = {
  args: {
    movie: mockMovie,
    actionSlot: <FavoriteButton movie={mockMovie} />,
  },
};

export const WithoutActionSlot = {
  args: {
    movie: mockMovie,
  },
};

export const HighRatingMovie = {
  args: {
    movie: mockHighRating,
    actionSlot: <FavoriteButton movie={mockHighRating} />,
  },
};

export const MissingPoster = {
  args: {
    movie: mockNoPoster,
    actionSlot: <FavoriteButton movie={mockNoPoster} />,
  },
};
