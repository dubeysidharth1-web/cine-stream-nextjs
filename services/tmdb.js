const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Gets the server-side or environment TMDB API Key safely.
 */
function getApiKey() {
  return process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
}

/**
 * Generic fetch wrapper for TMDB API with error handling.
 */
async function fetchFromTMDB(endpoint, params = {}) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("TMDB API key is missing. Please set TMDB_API_KEY in your environment.");
  }

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;

  const response = await fetch(url, {
    // Revalidate data every 1 hour (Next.js Data Cache)
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`TMDB API request failed with status: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches popular movies from TMDB (Server Component routine).
 *
 * @param {number} page
 * @returns {Promise<{results: Array, total_pages: number}>}
 */
export async function getPopularMovies(page = 1) {
  try {
    const data = await fetchFromTMDB("/movie/popular", { page });
    return data || { results: [], total_pages: 0 };
  } catch (error) {
    console.error("Error in getPopularMovies:", error);
    throw error;
  }
}

/**
 * Fetches single movie details by ID from TMDB (Server Component routine).
 *
 * @param {string|number} id
 * @returns {Promise<Object|null>}
 */
export async function getMovieById(id) {
  if (!id) return null;
  try {
    const data = await fetchFromTMDB(`/movie/${id}`);
    return data;
  } catch (error) {
    console.error(`Error in getMovieById for ID ${id}:`, error);
    return null;
  }
}

/**
 * Searches movies by query string from TMDB.
 *
 * @param {string} query
 * @param {number} page
 * @returns {Promise<{results: Array, total_pages: number}>}
 */
export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    return { results: [], total_pages: 0 };
  }
  try {
    const data = await fetchFromTMDB("/search/movie", {
      query: query.trim(),
      page,
    });
    return data || { results: [], total_pages: 0 };
  } catch (error) {
    console.error(`Error searching movies for query "${query}":`, error);
    return { results: [], total_pages: 0 };
  }
}

/**
 * Generates full poster URL for TMDB images.
 *
 * @param {string|null} path
 * @param {string} size
 * @returns {string} Poster URL or fallback placeholder
 */
export function getPosterUrl(path, size = "w500") {
  if (!path) return "/placeholder-poster.png";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Generates backdrop URL for TMDB images.
 *
 * @param {string|null} path
 * @param {string} size
 * @returns {string|null} Backdrop URL or null
 */
export function getBackdropUrl(path, size = "original") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
