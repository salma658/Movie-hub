import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard"; 
import "./Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]); // Stocke la liste des films
  const [filteredMovies, setFilteredMovies] = useState([]); // Films après filtrage
  const location = useLocation(); // Récupère l'URL actuelle

  useEffect(() => {
    
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f0dd249709c5d5d37376a1416f2db296&language=fr-FR");
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results); // Initialement, on affiche tous les films
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Récupère le terme de recherche depuis l'URL
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      // Filtrer les films par titre en fonction de la recherche
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      // Si pas de recherche, afficher tous les films
      setFilteredMovies(movies);
    }
  }, [location.search, movies]);

  return (
    <div className="movies-page">
      <h2>🎥 Films Populaires</h2>
      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
