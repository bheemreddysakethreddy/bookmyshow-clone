import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch random shows (IDs between 1 and 250)
  const fetchRandomShows = async () => {
    setLoading(true);
    try {
      const randomIds = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 250) + 1
      );
      const promises = randomIds.map((id) =>
        fetch(`https://api.tvmaze.com/shows/${id}`).then((res) => res.json())
      );
      const results = await Promise.all(promises);
      setShows(results.filter((s) => s && s.name)); // filter out nulls
    } catch (err) {
      console.error("Error fetching random shows:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch search results
  const fetchSearchResults = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${term}`);
      const data = await res.json();
      setShows(data.map((item) => item.show));
    } catch (err) {
      console.error("Error searching shows:", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search logic
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchSearchResults(query);
      } else {
        fetchRandomShows(); // Default random shows
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [query]);

  // Fetch random shows initially (first render)
  useEffect(() => {
    fetchRandomShows();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        🎥 BookMyShow Clone
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : shows.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {shows.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      )}
    </div>
  );
}
