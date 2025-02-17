import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche
  const [suggestions, setSuggestions] = useState([]); // Suggestions de films
  const [history, setHistory] = useState([]); // Historique des recherches
  const navigate = useNavigate();

  // Charger l'historique depuis localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  // Gérer la recherche en temps réel
  useEffect(() => {
    if (searchTerm.length > 2) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=f0dd249709c5d5d37376a1416f2db296&query=${searchTerm}`)
        .then((response) => {
          setSuggestions(response.data.results.slice(0, 5)); // Afficher seulement 5 suggestions
        })
        .catch((error) => console.error("Erreur API :", error));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Fonction pour gérer la soumission du formulaire
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const updatedHistory = [searchTerm, ...history.filter((item) => item !== searchTerm)].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory)); // Stocker l'historique
      navigate(`/movies?search=${searchTerm}`);
      setSearchTerm(""); // Réinitialiser la barre de recherche
      setSuggestions([]); // Cacher les suggestions
    }
  };

  // Fonction pour remplir la barre de recherche depuis l'historique ou les suggestions
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <nav className="navbar">
      <h1>🎬 Movie Hub </h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Films</Link></li>
        <li><Link to="/favorites">Favoris</Link></li>
      </ul>
      
      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>

        {/* Affichage des suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((movie) => (
              <li key={movie.id} onClick={() => handleSuggestionClick(movie.title)}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}

        {/* Affichage de l'historique des recherches */}
        {history.length > 0 && searchTerm === "" && (
          <ul className="search-history">
            <li className="history-title">🔄 Recherches récentes :</li>
            {history.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </form>
    </nav>
  );
}

export default Navbar;
