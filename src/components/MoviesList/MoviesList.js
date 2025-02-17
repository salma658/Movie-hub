import { useState, useEffect } from "react";
import "./MoviesList.css";

function MoviesList({ movies }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (movie) => {
    let updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((fav) => fav.id === movie.id);

    if (index !== -1) {
      // Retirer des favoris
      updatedFavorites.splice(index, 1);
    } else {
      // Ajouter aux favoris
      updatedFavorites.push(movie);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
          <button
            className={favorites.some((fav) => fav.id === movie.id) ? "remove-fav" : "add-fav"}
            onClick={() => toggleFavorite(movie)}
          >
            {favorites.some((fav) => fav.id === movie.id) ? "❌ Retirer" : "⭐ Ajouter"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
