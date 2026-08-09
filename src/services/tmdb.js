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
  let posterPath = FALLBACK_POSTER;
  if (movie.poster_path) {
    if (movie.poster_path.startsWith('http://') || movie.poster_path.startsWith('https://')) {
      posterPath = movie.poster_path;
    } else {
      posterPath = `${TMDB_IMAGE_BASE}${movie.poster_path}`;
    }
  }

  let backdropPath = null;
  if (movie.backdrop_path) {
    backdropPath = movie.backdrop_path.startsWith('http')
      ? movie.backdrop_path
      : `${TMDB_IMAGE_BASE}${movie.backdrop_path}`;
  }

  return {
    id: movie.id,
    title: movie.title || movie.name || 'Untitled',
    releaseYear: movie.release_date || movie.first_air_date || '',
    rating: movie.vote_average ? Number(movie.vote_average.toFixed(1)) : 0,
    voteCount: movie.vote_count || 0,
    overview: movie.overview || 'No overview available.',
    posterPath,
    backdropPath,
  };
}

const MOCK_MOVIES = [
  {
    id: 101,
    title: 'Dune: Part Two',
    release_date: '2024-03-01',
    vote_average: 8.5,
    vote_count: 4200,
    overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
  },
  {
    id: 102,
    title: 'Oppenheimer',
    release_date: '2023-07-21',
    vote_average: 8.9,
    vote_count: 7800,
    overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster_path: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 103,
    title: 'Spider-Man: Across the Spider-Verse',
    release_date: '2023-06-02',
    vote_average: 8.7,
    vote_count: 6500,
    overview: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster_path: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 104,
    title: 'Interstellar',
    release_date: '2014-11-07',
    vote_average: 8.6,
    vote_count: 32000,
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
    poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 105,
    title: 'Inception',
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 35000,
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
  },
  {
    id: 106,
    title: 'John Wick: Chapter 4',
    release_date: '2023-03-24',
    vote_average: 7.8,
    vote_count: 5400,
    overview: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.',
    poster_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 107,
    title: 'Paddington 2',
    release_date: '2017-11-10',
    vote_average: 7.8,
    vote_count: 1900,
    overview: 'Paddington, now happily settled with the Brown family, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy.',
    poster_path: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 108,
    title: 'A Quiet Place',
    release_date: '2018-04-06',
    vote_average: 7.4,
    vote_count: 13000,
    overview: 'A family is forced to live in silence while hiding from monsters that hunt by sound.',
    poster_path: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 109,
    title: 'Spirited Away',
    release_date: '2001-07-20',
    vote_average: 8.5,
    vote_count: 16000,
    overview: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
    poster_path: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 110,
    title: 'Knives Out',
    release_date: '2019-11-27',
    vote_average: 7.8,
    vote_count: 11500,
    overview: 'A detective investigates the death of a patriarch of an eccentric, combative family.',
    poster_path: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 111,
    title: 'La La Land',
    release_date: '2016-12-09',
    vote_average: 7.9,
    vote_count: 15800,
    overview: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    poster_path: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 112,
    title: 'The Dark Knight',
    release_date: '2008-07-18',
    vote_average: 8.5,
    vote_count: 31000,
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability.',
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  }
];

/**
 * Fetches popular movies from TMDB with pagination support (or fallback mock data)
 * @param {number} page 
 * @returns {Promise<{ movies: Array, page: number, totalPages: number, totalResults: number }>}
 */
export async function getPopularMovies(page = 1) {
  if (!TMDB_KEY) {
    console.warn('VITE_TMDB_KEY is missing. Operating in mock data mode.');
    const pageSize = 6;
    const startIndex = (page - 1) * pageSize;
    const paginated = MOCK_MOVIES.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(MOCK_MOVIES.length / pageSize);

    return {
      movies: paginated.map(normalizeMovie),
      page,
      totalPages,
      totalResults: MOCK_MOVIES.length,
    };
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
 * Searches movies by query string from TMDB with pagination support (or fallback mock data)
 * @param {string} query 
 * @param {number} page 
 * @returns {Promise<{ movies: Array, page: number, totalPages: number, totalResults: number }>}
 */
export async function searchMovies(query, page = 1) {
  const trimmed = (query || '').trim();
  if (!trimmed) {
    return { movies: [], page: 1, totalPages: 1, totalResults: 0 };
  }

  if (!TMDB_KEY) {
    console.warn('VITE_TMDB_KEY is missing. Operating in mock data mode.');
    const filtered = MOCK_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(trimmed.toLowerCase()) ||
      m.overview.toLowerCase().includes(trimmed.toLowerCase())
    );

    return {
      movies: filtered.map(normalizeMovie),
      page: 1,
      totalPages: 1,
      totalResults: filtered.length,
    };
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

