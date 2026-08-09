import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Film, Home, Search, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { favoritesCount } = useFavorites();

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Cine-Stream Home">
          <Film className="brand-icon" size={28} aria-hidden="true" />
          <span className="brand-title">Cine-Stream</span>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="navbar-nav">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Home className="nav-icon" size={18} aria-hidden="true" />
                <span>Popular</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Search className="nav-icon" size={18} aria-hidden="true" />
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Heart className="nav-icon" size={18} aria-hidden="true" />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="fav-badge" aria-label={`${favoritesCount} favorite movies saved`}>
                    {favoritesCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
