import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";

export const metadata = {
  title: "Cine-Stream | Explore Movies & Trending Cinema",
  description: "Discover popular movies, search trending titles, and save your favorite films with Cine-Stream Next.js 15 Media Explorer.",
  keywords: ["movies", "cinema", "tmdb", "next.js 15", "streaming explorer"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <Navbar />
          <main className="app-container">
            {children}
          </main>
          <footer className="footer">
            <div className="app-container">
              <p>&copy; {new Date().getFullYear()} Cine-Stream Explorer. Powered by Next.js 15 App Router & TMDB API.</p>
            </div>
          </footer>
        </FavoritesProvider>
      </body>
    </html>
  );
}
