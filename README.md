# Cine-Stream — Media Explorer

> A production-quality, modular, responsive, and performant Netflix-style movie discovery SPA built with React, Vite, React Router, Vanilla CSS, and TMDB REST API.

---

## 🌟 Overview

**Cine-Stream** allows users to discover trending movies, search titles in real-time with 500ms debouncing, auto-fetch paginated results using native `IntersectionObserver` infinite scrolling, and persist personal favorite watchlists across browser refreshes using React Context API and `localStorage`.

---

## ✨ Features

- **Popular Movies Discovery**: Browse trending movies with poster images, title, release year, and rating badges.
- **500ms Debounced Search**: Prevents redundant API calls while typing; queries TMDB only after typing stops for 500ms.
- **Native Infinite Scrolling**: Seamlessly appends new pages as the user scrolls down, powered by browser-native `IntersectionObserver`.
- **Persistent Favorites**: Add/remove movies from favorites with instant updates and `localStorage` persistence.
- **Phase 3 AI Mood Matcher**: Natural language mood recommendation engine that suggests movies based on how you feel.
- **Resilient Error & Loading States**: Comprehensive state handling for initial loading, infinite scroll loading, HTTP/network errors, and empty search results.
- **Lazy Loaded Posters & Fallbacks**: Image posters use `loading="lazy"` with graceful fallback to custom SVG placeholders when poster URLs are missing or broken.
- **Full Keyboard & ARIA Accessibility**: Visible focus states, screen-reader labels, semantic HTML5 elements, and high contrast ratios.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM (v6)
- **Styling**: Modular Vanilla CSS with HSL design tokens & dark media aesthetic
- **State Management**: React Context API (`FavoritesContext`) + `localStorage`
- **Asynchronous Hooks**: Custom `useDebounce` and `useInfiniteScroll`
- **Iconography**: Lucide React
- **API**: The Movie Database (TMDB) REST API

---

## 📁 Project Architecture & Folder Structure

```
cine-stream/
├── .env.example
├── .env
├── .gitignore
├── index.html
├── package.json
├── README.md
├── PROMPTS.md
└── src/
    ├── assets/
    │   └── placeholder.svg
    ├── components/
    │   ├── AiMoodMatcher.jsx
    │   ├── EmptyState.jsx
    │   ├── ErrorMessage.jsx
    │   ├── FavoriteButton.jsx
    │   ├── InfiniteScrollLoader.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── MovieCard.jsx
    │   ├── MovieGrid.jsx
    │   ├── Navbar.jsx
    │   └── SearchBar.jsx
    ├── context/
    │   └── FavoritesContext.jsx
    ├── hooks/
    │   ├── useDebounce.js
    │   └── useInfiniteScroll.js
    ├── pages/
    │   ├── Favorites.jsx
    │   ├── Home.jsx
    │   └── Search.jsx
    ├── services/
    │   └── tmdb.js
    ├── styles/
    │   ├── global.css
    │   ├── movie-card.css
    │   ├── movie-grid.css
    │   ├── navbar.css
    │   └── pages.css
    ├── utils/
    │   ├── constants.js
    │   ├── formatDate.js
    │   └── sanitize.js
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cine-stream.git
   cd cine-stream
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   VITE_TMDB_KEY=your_actual_tmdb_api_key_here
   VITE_AI_KEY=optional_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🔬 Technical Deep Dives

### 1. How Debouncing Works (`useDebounce.js`)

To prevent firing an API request on every keystroke (e.g. typing "Batman" causing 6 separate HTTP calls), the `useDebounce` custom hook wraps the input query state:

```javascript
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```
- **Cleanup Guarantee**: `clearTimeout(handler)` runs on every keystroke re-render, resetting the timer. An API call is only triggered after 500ms of user inactivity.

---

### 2. How Infinite Scrolling Works (`useInfiniteScroll.js`)

Infinite scrolling is implemented natively using the browser's `IntersectionObserver` API without external bloated libraries:

```javascript
export function useInfiniteScroll({ onLoadMore, hasMore, isLoading, rootMargin = '250px' }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading, rootMargin]);

  return sentinelRef;
}
```
- **Sentinel Element**: An invisible element (`InfiniteScrollLoader.jsx`) sits at the bottom of the grid.
- **Pre-fetching Margin**: `rootMargin = '250px'` triggers page `N+1` before the user reaches the absolute bottom, delivering a seamless browsing experience.
- **Deduplication**: Results are merged into state via `Set`-based ID filtering to prevent duplicate key errors.

---

### 3. How Favorites Persistence Works (`FavoritesContext.jsx`)

Favorites are managed globally via React Context API and stored in `localStorage` under the key `'cine_stream_favorites'`:

- **Initialization**: `useState` reads and parses `localStorage` on initial mount.
- **Auto-Sync**: A `useEffect` hook writes updated favorites array to `localStorage` whenever state mutates.
- **State Integrity**: Reloading or refreshing the page retains all favorited items and live navbar badge counts.

---

## ☁️ Deployment Instructions

### Deploying to Vercel

1. Push your repository to GitHub.
2. Import project into Vercel dashboard.
3. In Project Settings -> Environment Variables, add:
   - Name: `VITE_TMDB_KEY` | Value: `[Your TMDB API Key]`
   - Name: `VITE_AI_KEY` | Value: `[Your AI Key]` (Optional)
4. Click **Deploy**. Vercel will run `npm run build` and publish your SPA.

---

## 📄 License

MIT License © 2026 Cine-Stream Team.
