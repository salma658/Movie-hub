import { useEffect, useState } from "react";
import axios from "axios";
import MoviesList from "../../components/MoviesList/MoviesList";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "f0dd249709c5d5d37376a1416f2db296";

  useEffect(() => {
    // Charger les genres
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`)
      .then((response) => {
        setGenres(response.data.genres);
      })
      .catch(() => {
        setError("Erreur lors du chargement des genres.");
      });

    // Charger les films populaires
    fetchMovies();
  }, []);

  const fetchMovies = (genreId = "") => {
    setLoading(true);
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr`;
    
    if (genreId) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&with_genres=${genreId}`;
    }

    axios.get(url)
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des films.");
        setLoading(false);
      });
  };

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    fetchMovies(genreId);
  };

  return (
    <div className="home">
      <h2>Films Populaires</h2>

      {/* Sélecteur de filtre par catégorie */}
      <select value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Toutes les catégories</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      
      <MoviesList movies={movies} />
    </div>
  );
}

export default Home;
