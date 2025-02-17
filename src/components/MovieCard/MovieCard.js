import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <h3>{movie.title}</h3>
      </Link>
    </div>
  );
}

export default MovieCard;
