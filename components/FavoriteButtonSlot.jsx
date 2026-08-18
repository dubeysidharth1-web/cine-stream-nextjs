"use client";

import FavoriteButton from "@/components/FavoriteButton";

/**
 * Client component slot wrapper for FavoriteButton inside server rendered MovieCard.
 *
 * @param {{ movie: Object }} props
 */
export default function FavoriteButtonSlot({ movie }) {
  return <FavoriteButton movie={movie} />;
}
