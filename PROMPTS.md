# PROMPTS.md — AI-Assisted Development Log & Documentation

This document records the AI-assisted engineering process, prompt strategies, architectural decisions, manual refinements, and lessons learned while developing **Cine-Stream — Media Explorer**.

---

## 1. Problem Overview & Architectural Goals

The goal for Sprint 08 was to build a production-quality, modular, responsive, and performant Netflix-style movie discovery Single Page Application (SPA).

### Key Constraints & Fixes from Previous Sprint Reviews
1. **Zero Code Duplication**: Helper functions (`getReleaseYear`, `formatFullDate`, `sanitizeQuery`) extracted into `src/utils/` instead of duplicating across pages.
2. **Centralized Service Architecture**: Centralized all TMDB API calls into `src/services/tmdb.js` rather than embedding fetch calls inside page components.
3. **Commit Hygiene**: Incremental, logical commits (11 distinct commits) rather than pushing the entire application in a single commit dump.
4. **Boilerplate Cleanup**: Removed default Vite counter, logos, and unused `App.css`.

---

## 2. Prompts Used & Incremental Development Trajectory

### Step 1: Base Architecture & Dependencies
- **Prompt**: *"Analyze requirements, propose folder structure, install dependencies (react-router-dom, lucide-react), clean up Vite boilerplate, configure .env/.gitignore, and initialize Git."*
- **Outcome**: Established project skeleton, clean assets, `.env.example`, `.env`, updated `.gitignore`, and executed **Commit 1**.

### Step 2: Design System & Routing Setup
- **Prompt**: *"Build global CSS design system with HSL dark media tokens, backdrop blur navbar styling, responsive page containers, and React Router routes."*
- **Outcome**: Created `global.css`, `navbar.css`, `pages.css`, `Navbar.jsx`, page skeletons, router config in `App.jsx`/`main.jsx`, and executed **Commit 2**.

### Step 3: TMDB API Service & Utils
- **Prompt**: *"Extract reusable date and query sanitization helpers into /utils and centralize TMDB API fetch logic in services/tmdb.js."*
- **Outcome**: Built `constants.js`, `formatDate.js`, `sanitize.js`, `tmdb.js` with normalized schemas and HTTP error handling (401, 404, 429), and executed **Commit 3**.

### Step 4: Popular Movies Grid & Movie Cards
- **Prompt**: *"Build MovieCard with poster fallback handling, loading='lazy' attribute, glassmorphic star rating badge, and responsive MovieGrid."*
- **Outcome**: Built `MovieCard.jsx`, `MovieGrid.jsx`, `movie-card.css`, `movie-grid.css`, wired data fetching into `Home.jsx`, and executed **Commit 4**.

### Step 5: Reusable Feedback State Components
- **Prompt**: *"Build reusable LoadingSpinner, ErrorMessage with retry action, and EmptyState components."*
- **Outcome**: Created `LoadingSpinner.jsx`, `ErrorMessage.jsx`, `EmptyState.jsx`, integrated into `Home.jsx`, and executed **Commit 5**.

### Step 6: Debounced Search Feature
- **Prompt**: *"Implement custom useDebounce hook (500ms delay with timer cleanup) and SearchBar component for search queries."*
- **Outcome**: Built `useDebounce.js`, `SearchBar.jsx`, connected debounced queries in `Search.jsx`, and executed **Commit 6**.

### Step 7: Native IntersectionObserver Infinite Scroll
- **Prompt**: *"Implement custom useInfiniteScroll hook using native browser IntersectionObserver and InfiniteScrollLoader sentinel component."*
- **Outcome**: Built `useInfiniteScroll.js`, `InfiniteScrollLoader.jsx`, attached to `Home.jsx` and `Search.jsx` with Set-based ID deduplication, and executed **Commit 7**.

### Step 8: Favorites Context & LocalStorage Persistence
- **Prompt**: *"Build FavoritesContext using React Context API with localStorage sync, FavoriteButton component, and live navbar counter badge."*
- **Outcome**: Created `FavoritesContext.jsx`, `FavoriteButton.jsx`, wrapped `App.jsx` with `FavoritesProvider`, updated `Navbar.jsx`, and executed **Commit 8**.

### Step 9: Favorites Route & Page Integration
- **Prompt**: *"Build Favorites page displaying favorited cards, live count title, and empty state with explore action."*
- **Outcome**: Updated `Favorites.jsx`, verified refresh persistence, and executed **Commit 9**.

### Step 10: Performance, Accessibility & AI Mood Matcher
- **Prompt**: *"Perform accessibility audit and implement Phase 3 AI Mood Matcher feature with live LLM call support and safe fallback engine."*
- **Outcome**: Built `AiMoodMatcher.jsx`, integrated into `Search.jsx`, verified `:focus-visible` states, and executed **Commit 10**.

### Step 11: Final Polish, Documentation & Verification
- **Prompt**: *"Create production README.md, PROMPTS.md, verify npm run build, and finalize project."*
- **Outcome**: Created `README.md`, `PROMPTS.md`, verified build (0 errors), and executed **Commit 11**.

---

## 3. Manual Refinements & Engineering Decisions

1. **Set-Based ID Deduplication**:
   - *Issue*: Rapid scrolling near page boundaries caused occasional duplicate movie IDs in state when appending API pages.
   - *Fix*: Implemented `Set`-based ID filtering in `Home.jsx` and `Search.jsx`:
     ```javascript
     setMovies(prev => {
       const existingIds = new Set(prev.map(m => m.id));
       const filtered = newMovies.filter(m => !existingIds.has(m.id));
       return [...prev, ...filtered];
     });
     ```

2. **Safe Fallback AI Engine**:
   - *Requirement*: Phase 3 AI feature required an LLM API key, but prohibited exposing secrets in code.
   - *Fix*: Created a dual-mode engine in `AiMoodMatcher.jsx`. If `VITE_AI_KEY` is set, it calls the LLM. If unconfigured, it runs an intelligent keyword-to-title matcher (*John Wick*, *Interstellar*, *Paddington 2*) allowing reviewers to demo the feature safely without hardcoded secrets.

3. **Accessibility**:
   - Added visible `:focus-visible` outline styles in `global.css`.
   - Used `aria-live="polite"` on loading state containers.
   - Added `aria-label` tags to all interactive buttons and inputs.

---

## 4. Key Lessons Learned

- **Decoupling Data Services from UI**: Centralizing API logic in `services/tmdb.js` simplified component code and made error handling uniform across pages.
- **Native Browser APIs over Heavy Libraries**: Implementing `IntersectionObserver` via a custom 25-line hook eliminated the need for external infinite scroll packages, reducing bundle size significantly.
- **Micro-Animations & Visual Design System**: Using CSS custom properties (variables) for HSL colors and blur backdrop filters created a cohesive dark media aesthetic.
