/**
 * MovieGrid container for rendering movie cards in a responsive grid layout.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function MovieGrid({ children }) {
  return (
    <div className="movie-grid" role="region" aria-label="Movie Collection">
      {children}
    </div>
  );
}
