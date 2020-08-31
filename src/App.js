import React, { useEffect, useState } from "react";
import "./App.css";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  const [query, setQuery] = useState("");
  // const [page, setPage] = useState(1);
  // const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});

  async function searchMovies(query) {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}&type=movie&plot=full`
      );
      const result = await res.json();

      console.log(result);
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <div className="App">
      <h1>The Shoppies Nominations</h1>

      <div>
        <label for="search">Movie Name </label>
        <input
          inputMode="search"
          type="text"
          name="search"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchMovies(query);
          }}
          placeholder="e.g. Iron Man"
          value={query}
        />
        <button onClick={() => searchMovies(query)}>Search</button>
      </div>
    </div>
  );
}

export default App;
