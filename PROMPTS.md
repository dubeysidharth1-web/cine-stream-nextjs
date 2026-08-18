# Engineering Logs & AI Collaboration Record (Sprint 09)

## Overview
This document records the engineering prompts, architectural trade-offs, AI suggestions, manual modifications, and verification steps performed during Sprint 09: **Cine-Stream Next.js 15 Migration**.

---

### Phase 1: Planning & Next.js Initialization

#### 1. Requirement / Problem
Migrate existing Sprint 08 Cine-Stream React SPA from Vite to Next.js 15 using the App Router, eliminating `react-router-dom`, client-side `useEffect` initial hydration waterfalls, and duplicated code structures.

#### 2. Prompt Used
> "START NOW WITH STEP 1 ONLY. First analyze my existing Cine-Stream project architecture and propose the exact migration plan and folder structure. Do NOT generate the complete application yet."

#### 3. What the AI Suggested
Proposed a structured Server-First App Router architecture:
- Initial popular movies fetched on the server in `app/page.js`.
- Dynamic route `/movie/[id]` with `generateMetadata()`.
- Isolated Client Component boundaries (`FavoritesContext`, `FavoriteButton`, `SearchBar`).
- Modular commit strategy adhering to reviewer feedback from Sprints 5 & 6.

#### 4. What Was Implemented
- Initialized Next.js 15 App Router project using `npx create-next-app@latest` with JavaScript, ESLint, Vanilla CSS, and import alias `@/*`.
- Configured `next.config.mjs` with remote image patterns for `image.tmdb.org`.
- Configured `.env.example` and verified `.gitignore` excludes `.env*` secrets.

#### 5. Manual Modifications & Decisions
- Preserved existing Git repository history instead of initializing a blank repo.
- Replaced default Next.js Tailwind configuration with custom CSS design system tokens in `styles/globals.css`.

#### 6. Key Learnings
- In Next.js 15 App Router, dynamic route `params` are Promises that must be awaited (`const { id } = await params;`) in page components and `generateMetadata()`.

---

### Phase 2: Server Component Data Fetching & TMDB Service

#### 1. Requirement / Problem
Centralize TMDB API interactions and remove client-side `useEffect` initial data hydration.

#### 2. Prompt Used
> "Create services/tmdb.js, centralize API requests, do not duplicate fetch logic, use process.env.TMDB_API_KEY."

#### 3. What the AI Suggested
Created `services/tmdb.js` with server-cached `fetch` routines (`getPopularMovies`, `getMovieById`, `searchMovies`).

#### 4. What Was Implemented
- Implemented `services/tmdb.js` using Next.js Data Cache (`revalidate: 3600`).
- Extracted date formatting to `utils/formatDate.js` and input sanitization to `utils/sanitize.js` to eliminate function duplication across components.
- Added fallback poster graphic in `public/placeholder-poster.png`.

#### 5. Manual Modifications & Decisions
- Added graceful null checks and 404 responses so API degradation never crashes the server or client UI.

---

### Phase 3: Dynamic SEO Metadata & Routing

#### 1. Requirement / Problem
Implement dynamic movie details route `/movie/[id]` with dynamic `<title>` and `<meta name="description">`.

#### 2. Prompt Used
> "Create app/movie/[id]/page.js, receive dynamic ID, fetch on server, render details, handle missing IDs with not-found, implement generateMetadata()."

#### 3. What the AI Suggested
Implemented async `generateMetadata({ params })` fetching movie details and returning OpenGraph metadata.

#### 4. What Was Implemented
- Implemented `app/movie/[id]/page.js` Server Component with backdrop blur layout, rating badges, runtime, genres, overview, and back button.
- Implemented `app/movie/[id]/loading.js` and `app/not-found.js`.

---

### Phase 4: Client Component Interactivity (Favorites & Search)

#### 1. Requirement / Problem
Maintain favorites persistence via `localStorage` and interactive search without making the entire application a Client Component.

#### 2. Prompt Used
> "Keep search functionality and favorites. localStorage only inside Client Components. Do not convert the entire application into a Client Component."

#### 3. What the AI Suggested
Created `FavoritesContext.jsx` with safety checks (`typeof window !== 'undefined'`) and passed it via `RootLayout`. slotted `FavoriteButton` inside server-rendered `MovieCard`.

#### 4. What Was Implemented
- Created `context/FavoritesContext.jsx` Client Component.
- Created `hooks/useDebounce.js` custom hook.
- Created `components/MovieExplorer.jsx` client container combining server-fetched initial popular movies with debounced real-time TMDB search.
- Created `app/favorites/page.js` view for saved watch lists.

---

### Verification & Quality Assurance Summary

1. **Build Verification**: Executed `npm run build` cleanly with zero TypeScript/ESLint warnings.
2. **Dynamic Route Validation**: Verified `/movie/[id]` metadata updates correctly per movie title.
3. **Accessibility**: Verified visible focus rings (`:focus-visible`), ARIA landmark roles (`role="search"`, `role="status"`), and keyboard navigation across all routes.
