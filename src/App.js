import React, { useState } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  // const [page, setPage] = useState(1);
  // const [movies, setMovies] = useState([]);
  // const [movie, setMovie] = useState({});

  const useSearchOMDB = () => useDebouncedSearch((text) => searchMovies(text));
  const { inputText, setInputText, searchResults } = useSearchOMDB();

  async function searchMovies(text) {
    try {
      const res = (
        await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${text}&type=movie&plot=full`
        )
      ).json();

      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  console.log(searchResults);

  return (
    <div className="App">
      <h1>The Shoppies Nominations</h1>

      <div>
        <label for="search">Movie Name </label>
        <input
          inputMode="search"
          type="text"
          name="search"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchMovies(inputText);
          }}
          placeholder="e.g. Iron Man"
          value={inputText}
        />
        <button onClick={() => searchMovies(inputText)}>Search</button>
      </div>
      <div>
        {searchResults?.result?.Search?.map(({ Title, Year, Poster }) => (
          <div>
            <h3>{Title}</h3>
            <h3>{Year}</h3>
            <img src={Poster} alt={`${Title} Poster`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
