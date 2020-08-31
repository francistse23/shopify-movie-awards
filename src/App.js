import React, { useEffect, useState } from "react";
import "./App.css";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  const [query, setQuery] = useState("");
  // const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  async function searchMovies(query) {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}&type=movie&plot=full`
      );
      const movies = await res.json();

      console.log(movies);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <div className="App">
      <h1>The Shoppies Nominations</h1>
      <form className="Seach" onSubmit={() => searchMovies(query)}>
        <label for="search">Movie Name </label>
        <input
          // inputMode="search"
          type="text"
          name="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="movie name"
          value={query}
        />
      </form>
    </div>
  );
}

export default App;
