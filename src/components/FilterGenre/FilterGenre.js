// src/components/FilterGenre/FilterGenre.js
import { useState, useEffect } from "react";
import axios from "axios";
import "./FilterGenre.css";

function FilterGenre({ onFilter }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=f0dd249709c5d5d37376a1416f2db296`)
      .then((response) => setGenres(response.data.genres))
      .catch(() => console.error("Erreur de chargement des genres"));
  }, []);

  return (
    <div className="filter-genre">
      <select onChange={(e) => onFilter(e.target.value)}>
        <option value="">Tous les genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterGenre;
