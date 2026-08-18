"use client";

import ErrorMessage from "@/components/ErrorMessage";

export default function Error({ error, reset }) {
  return (
    <ErrorMessage
      title="Failed to Load Popular Movies"
      message={error?.message || "An unexpected error occurred while fetching movies from TMDB API."}
      onRetry={() => reset()}
    />
  );
}
