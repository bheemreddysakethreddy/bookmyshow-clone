import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching show details:", err));
  }, [id]);
  if (!movie) return <div className="text-center mt-10 text-gray-600">unable to fetch details of the movie you are looking for</div>;
  console.log(movie.summary)

  return (
    <div className="p-8 flex flex-col md:flex-row items-center gap-8">
      <img
        src={movie.image ? movie.image.original : "https://via.placeholder.com/500x750?text=No+Image"}
        alt={movie.name}
        className="rounded-lg shadow-lg w-64 md:w-80"
      />

      <div>
        <h1 className="text-4xl font-bold text-gray-900">{movie.name}</h1>
        <p className="text-gray-600 mt-2">{movie.genres.join(", ")}</p>
        <p className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: movie.summary }}></p>

        <p className="mt-3 text-gray-500">
          ⭐ Rating: <span className="font-semibold">{movie.rating?.average || "N/A"}</span>
        </p>
        <p className="text-gray-500">
          ⏱️ Runtime: <span className="font-semibold">{movie.runtime} mins</span>
        </p>

        <Link to={`/booking/${id}`}>
          <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
            Book Tickets 🎟️
          </button>
        </Link>
      </div>
    </div>
  );
}
