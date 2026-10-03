"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "cine_stream_favorites_v1";

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate favorites from localStorage safely on mount (client-side only)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync favorites state to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites, isLoaded]);

  const addFavorite = (movie) => {
    if (!movie || !movie.id) return;
    setFavorites((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((item) => item.id === movieId);
  };

  const toggleFavorite = (movie) => {
    if (!movie || !movie.id) return;
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
