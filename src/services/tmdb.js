import { TMDB_BASE_URL, TMDB_IMAGE_BASE, FALLBACK_POSTER } from '../utils/constants';

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

/**
 * Standardized error handling wrapper for fetch responses
 */
async function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid TMDB API Key. Please check your VITE_TMDB_KEY configuration.');
    }
    if (response.status === 404) {
      throw new Error('Requested movie resource not found on TMDB.');
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
    }
    throw new Error(`TMDB API Error (${response.status}): ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Normalizes movie data objects from TMDB API
 */
export function normalizeMovie(movie) {
  return {
    id: movie.id,
    title: movie.title || movie.name || 'Untitled',
    releaseYear: movie.release_date || movie.first_air_date || '',
    rating: movie.vote_average ? Number(movie.vote_average.toFixed(1)) : 0,
    voteCount: movie.vote_count || 0,
    overview: movie.overview || 'No overview available.',
    posterPath: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : FALLBACK_POSTER,
    backdropPath: movie.backdrop_path ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}` : null,
  };
}

/**
 * Fetches popular movies from TMDB with pagination support
 * @param {number} page 
 * @returns {Promise<{ movies: Array, page: number, totalPages: number, totalResults: number }>}
 */
export async function getPopularMovies(page = 1) {
  if (!TMDB_KEY) {
    throw new Error('VITE_TMDB_KEY is missing. Please add your TMDB API key to the .env file.');
  }

  try {
    const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=${page}`;
    const res = await fetch(url);
    const data = await handleResponse(res);

    return {
      movies: (data.results || []).map(normalizeMovie),
      page: data.page || 1,
      totalPages: data.total_pages || 1,
      totalResults: data.total_results || 0,
    };
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}

/**
 * Searches movies by query string from TMDB with pagination support
 * @param {string} query 
 * @param {number} page 
 * @returns {Promise<{ movies: Array, page: number, totalPages: number, totalResults: number }>}
 */
export async function searchMovies(query, page = 1) {
  if (!TMDB_KEY) {
    throw new Error('VITE_TMDB_KEY is missing. Please add your TMDB API key to the .env file.');
  }

  const trimmed = (query || '').trim();
  if (!trimmed) {
    return { movies: [], page: 1, totalPages: 1, totalResults: 0 };
  }

  try {
    const encodedQuery = encodeURIComponent(trimmed);
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_KEY}&query=${encodedQuery}&language=en-US&page=${page}&include_adult=false`;
    const res = await fetch(url);
    const data = await handleResponse(res);

    return {
      movies: (data.results || []).map(normalizeMovie),
      page: data.page || 1,
      totalPages: data.total_pages || 1,
      totalResults: data.total_results || 0,
    };
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
}
