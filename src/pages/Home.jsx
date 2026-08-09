import React from 'react';
import { Flame } from 'lucide-react';

export default function Home() {
  return (
    <div className="page-container">
      <div className="hero-banner">
        <span className="hero-tag">
          <Flame size={14} aria-hidden="true" /> Trending Movies
        </span>
        <h1 className="hero-title">Discover Blockbusters & Hidden Gems</h1>
        <p className="hero-desc">
          Explore top rated and popular titles across world cinema with real-time updates and seamless browsing.
        </p>
      </div>

      <div className="page-header">
        <h2 className="page-title">Popular Movies</h2>
        <p className="page-subtitle">Currently trending films on TMDB</p>
      </div>
    </div>
  );
}
