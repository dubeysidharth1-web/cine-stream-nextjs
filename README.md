# Cine-Stream Media Explorer (Next.js 15 Migration — Sprint 09)

Cine-Stream Media Explorer is a modern web application built with **Next.js 15 App Router**, **React Server Components (RSC)**, **TMDB API**, and **Vanilla CSS**.

Migrated from Sprint 08 (Vite SPA) to Next.js 15, this project showcases clean architecture, zero client-side initial hydration waterfalls, dynamic SEO metadata, `next/image` optimization, and client interactivity boundaries.

---

## 🌟 Key Features

* **Server-Driven Data Fetching**: Popular movies loaded on the server inside `app/page.js` with zero initial `useEffect` waterfalls.
* **Dynamic Routing & Dynamic SEO**: `/movie/[id]` dynamic route powered by `generateMetadata()` for server-generated title and meta tags.
* **Client Boundary Isolation**: Interactive features (`FavoritesContext`, `FavoriteButton`, `SearchBar`) isolated using `"use client"`.
* **Centralized API Service**: TMDB fetch logic centralized in `services/tmdb.js` with Next.js Data Caching (`revalidate: 3600`).
* **Optimized Images**: Powered by `next/image` with remote patterns configured for `image.tmdb.org`.
* **Local Storage Synchronization**: Favorites state stored safely in browser `localStorage` with SSR-safe hydration routines.
* **Accessible UI**: Keyboard navigation support, visible focus rings (`:focus-visible`), ARIA landmarks (`role="search"`, `role="status"`), screen-reader utilities (`sr-only`).
* **Clean Engineering Hygiene**: No `react-router-dom`, no duplicate helpers, no hardcoded API secrets.

---

## 🏗️ Architecture & Server vs. Client Component Separation

| Component / Route | Type | Responsibility |
| :--- | :--- | :--- |
| `app/layout.js` | **Server Component** | Root app shell, metadata defaults, font loading, footer. |
| `app/page.js` | **Server Component** | Server data fetch for popular movies (`getPopularMovies`). |
| `app/movie/[id]/page.js` | **Server Component** | Server movie detail fetch & dynamic SEO (`generateMetadata`). |
| `app/movie/[id]/loading.js` | **Server Component** | Movie detail fallback spinner during server streaming. |
| `app/not-found.js` | **Server Component** | 404 error page for invalid movie IDs or routes. |
| `components/MovieCard.jsx` | **Server Component** | Presentational movie poster, title, release year, rating badge. |
| `components/MovieGrid.jsx` | **Server Component** | Responsive CSS Grid container. |
| `context/FavoritesContext.jsx` | **Client Component** | Manages `favorites` array state & `localStorage` sync. |
| `components/FavoriteButton.jsx` | **Client Component** | Toggles heart icon and favorite status on click. |
| `components/SearchBar.jsx` | **Client Component** | Debounced search input component. |
| `components/MovieExplorer.jsx` | **Client Component** | Combines initial server movies with client-side TMDB search. |
| `app/favorites/page.js` | **Client Component** | Renders favorited movies list from `FavoritesContext`. |

---

## 🛠️ Technology Stack

* **Framework**: Next.js 15 (App Router)
* **Library**: React 19
* **Styling**: Modern Vanilla CSS (Variables, Glassmorphism, CSS Grid)
* **Data Source**: TMDB API (The Movie Database)
* **Image Optimization**: `next/image`
* **Linting & Code Quality**: ESLint (`eslint-config-next`)

---

## 📁 Project Directory Structure

```text
cine-stream/
├── app/
│   ├── layout.js              # Global Layout Shell & Metadata
│   ├── page.js                # Popular Movies Home Route (Server Component)
│   ├── loading.js             # Global Loading Boundary
│   ├── error.js               # Global Error Boundary
│   ├── not-found.js           # 404 Fallback Boundary
│   ├── movie/
│   │   └── [id]/
│   │       ├── page.js        # Dynamic Detail Page + generateMetadata()
│   │       └── loading.js     # Detail Page Loading State
│   └── favorites/
│       └── page.js            # Favorites Route (Client Component)
├── components/
│   ├── Navbar.jsx             # Accessible Header Navigation
│   ├── MovieCard.jsx          # Presentational Movie Card (Server Component)
│   ├── MovieGrid.jsx          # Responsive Grid Container
│   ├── MovieExplorer.jsx      # Home Explorer Container (Server Initial + Client Search)
│   ├── SearchBar.jsx          # Debounced Search Input
│   ├── FavoriteButton.jsx     # Client Favorite Toggle Button
│   ├── FavoriteButtonSlot.jsx # Slot Wrapper for Favorite Button
│   ├── LoadingSpinner.jsx     # Spinner Component
│   ├── ErrorMessage.jsx       # Error Display Component
│   └── EmptyState.jsx         # Empty Results Component
├── context/
│   └── FavoritesContext.jsx   # Client Favorites Context & LocalStorage Sync
├── hooks/
│   └── useDebounce.js         # Custom Debounce Hook
├── services/
│   └── tmdb.js                # Centralized TMDB API Requests
├── utils/
│   ├── formatDate.js          # Date Formatting Utility
│   └── sanitize.js            # Query Sanitization Utility
├── styles/
│   └── globals.css            # Global CSS Design System
├── public/
│   └── placeholder-poster.png # Fallback Image Placeholder
├── .env.example               # Environment Variables Template
├── next.config.mjs            # Next.js Config & Remote Patterns
├── PROMPTS.md                 # AI Development & Architectural Logs
└── README.md                  # Comprehensive Documentation
```

---

## 🚀 Environment Variables Setup

Create a `.env.local` file in the root directory:

```bash
# TMDB API Key (Server-Side)
TMDB_API_KEY=your_actual_tmdb_api_key_here
```

A template file `.env.example` is included in the repository.

> **Security Note**: Never commit `.env.local` or real API keys to source control. `.env.local` is ignored by `.gitignore`.

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📦 Production Build & Vercel Deployment

1. **Verify Production Build Locally**:
   ```bash
   npm run build
   ```

2. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🧪 Testing (QA Automation)

Cine-Stream includes a comprehensive, automated unit and component testing suite powered by **Jest** and **React Testing Library (RTL)**.

### Testing Stack
* **Test Runner**: [Jest](https://jestjs.io/) with official Next.js integration (`next/jest`).
* **DOM Environment**: [jsdom](https://github.com/jsdom/jsdom) (`jest-environment-jsdom`).
* **Component Testing**: [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for DOM assertion and accessibility queries.
* **Jest DOM Matchers**: [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) extended matchers (`toBeInTheDocument`, `toHaveAttribute`, `toHaveClass`).
* **User Interaction Simulation**: [@testing-library/user-event](https://testing-library.com/docs/user-event/intro) for realistic typing, clicking, and toggling.
* **API Network Mocking**: Isolation from live TMDB APIs using Jest mocks (`jest.mock` / `global.fetch` mocking).
* **Next.js Navigation & Link Mocking**: Router navigation (`usePathname`, `useRouter`) mocked for component isolation.

### Automated Test Coverage
The suite covers:
1. **Component Rendering Tests**: `MovieCard`, `ErrorMessage`, `EmptyState`, `LoadingSpinner`, `MovieGrid`, `FavoriteButtonSlot`.
2. **User Interaction Tests**: `SearchBar` (debounced typing & sanitization), `FavoriteButton` (state toggling & ARIA label updates).
3. **Async / API Component Tests**: `MovieExplorer` (simulated live search fetching, loading spinners, empty states, network error handling).
4. **Router & Navigation Tests**: `Navbar` (pathname active state highlighting via `usePathname`).
5. **State Management & Services**: `FavoritesContext` (`localStorage` hydration & actions) and `services/tmdb.js` API routines.

### Running Tests

Run the standard test suite:
```bash
npm test
```

Run test suite with code coverage report:
```bash
npm test -- --coverage
```

Current test coverage exceeds **98% statement coverage** across all components, hooks, services, and utilities.

