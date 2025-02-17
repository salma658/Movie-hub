import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css"

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f0dd249709c5d5d37376a1416f2db296`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger le film.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
