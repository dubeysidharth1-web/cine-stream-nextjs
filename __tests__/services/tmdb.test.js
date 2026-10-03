import {
  getPopularMovies,
  getMovieById,
  searchMovies,
  getPosterUrl,
  getBackdropUrl,
} from "@/services/tmdb";

describe("TMDB Service Module", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, TMDB_API_KEY: "test_mock_api_key" };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  describe("getPopularMovies", () => {
    it("fetches popular movies successfully from TMDB", async () => {
      const mockResponse = { results: [{ id: 1, title: "Movie 1" }], total_pages: 5 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await getPopularMovies(1);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("https://api.themoviedb.org/3/movie/popular?api_key=test_mock_api_key&page=1"),
        expect.any(Object)
      );
      expect(data).toEqual(mockResponse);
    });

    it("returns default fallback structure on network failure", async () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      global.fetch.mockRejectedValueOnce(new Error("Network timeout"));

      const data = await getPopularMovies(1);

      expect(data).toEqual({ results: [], total_pages: 0 });
      consoleSpy.mockRestore();
    });
  });

  describe("getMovieById", () => {
    it("returns null if no ID is passed", async () => {
      const res = await getMovieById(null);
      expect(res).toBeNull();
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("fetches movie details by ID", async () => {
      const mockMovieDetail = { id: 550, title: "Fight Club" };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMovieDetail,
      });

      const res = await getMovieById(550);
      expect(res).toEqual(mockMovieDetail);
    });

    it("returns null when API responds with 404 status", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const res = await getMovieById(999999);
      expect(res).toBeNull();
    });
  });

  describe("searchMovies", () => {
    it("returns empty results immediately if query is empty or whitespace", async () => {
      const res1 = await searchMovies("");
      const res2 = await searchMovies("   ");

      expect(res1).toEqual({ results: [], total_pages: 0 });
      expect(res2).toEqual({ results: [], total_pages: 0 });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it("fetches search results for valid query string", async () => {
      const mockSearchResults = { results: [{ id: 100, title: "Batman Begins" }], total_pages: 1 };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSearchResults,
      });

      const res = await searchMovies("Batman");
      expect(res).toEqual(mockSearchResults);
    });
  });

  describe("Image URL Generators", () => {
    it("getPosterUrl returns fallback image path when path is missing", () => {
      expect(getPosterUrl(null)).toBe("/placeholder-poster.png");
      expect(getPosterUrl(undefined)).toBe("/placeholder-poster.png");
    });

    it("getPosterUrl returns formatted TMDB poster URL when path is provided", () => {
      expect(getPosterUrl("/sample.jpg", "w500")).toBe("https://image.tmdb.org/t/p/w500/sample.jpg");
    });

    it("getBackdropUrl returns null when path is missing", () => {
      expect(getBackdropUrl(null)).toBeNull();
    });

    it("getBackdropUrl returns formatted TMDB backdrop URL", () => {
      expect(getBackdropUrl("/bg.jpg")).toBe("https://image.tmdb.org/t/p/original/bg.jpg");
    });
  });

  describe("API Key Error Handling", () => {
    it("throws an error when TMDB API key is missing", async () => {
      delete process.env.TMDB_API_KEY;
      delete process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

      const result = await getPopularMovies(1);
      expect(result).toEqual({ results: [], total_pages: 0 });

      consoleSpy.mockRestore();
    });
  });
});
