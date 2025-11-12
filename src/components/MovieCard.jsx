import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden">
      <img
        src={movie.image ? movie.image.medium : "https://via.placeholder.com/210x295?text=No+Image"}
        alt={movie.name}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{movie.name}</h3>
        <Link to={`/movie/${movie.id}`}>
          <button className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
