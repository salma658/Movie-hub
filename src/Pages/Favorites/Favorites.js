import { useState, useEffect } from "react"; 
import MoviesList from "../../components/MoviesList/MoviesList";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites">
      <h2>Mes Films Favoris</h2>
      {favorites.length > 0 ? (
        <div className="movies-list">
          {favorites.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
              <button className="remove-fav" onClick={() => removeFavorite(movie.id)}>❌ Retirer</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun film en favori.</p>
      )}
    </div>
  );
}

export default Favorites;
