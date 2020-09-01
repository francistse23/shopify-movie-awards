import React, { useState } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";
import Movie from "./components/Movie";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  // const [page, setPage] = useState(1);
  // const [movies, setMovies] = useState([]);
  // const [movie, setMovie] = useState({});
  const [nominations, setNominations] = useState(new Map());

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

  return (
    <div className="App">
      <h1 style={{ fontSize: "3rem" }}>The Shoppies</h1>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label for="search" style={{ fontSize: "2rem" }}>
          Movie Name{" "}
        </label>
        <input
          inputMode="search"
          type="text"
          name="search"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchMovies(inputText);
          }}
          placeholder="e.g. Iron Man"
          style={{ border: "none", borderRadius: "6px", padding: "8px" }}
          value={inputText}
        />
        <button onClick={() => searchMovies(inputText)}>Search</button>
      </div>

      <div style={{ display: "flex", flex: 3, justifyContent: "space-around" }}>
        {/* movies list */}
        <div style={{ margin: "0 auto", flex: 2 }}>
          {inputText && <h3>{`Results for ${inputText}`}</h3>}
          {searchResults?.result?.Search?.map(
            ({ Title, Year, Poster, imdbID }) => (
              <Movie
                Title={Title}
                Year={Year}
                Poster={Poster}
                imdbID={imdbID}
                nominations={nominations}
                setNominations={setNominations}
              />
            )
          )}
        </div>

        {/* nominations list */}
        {nominations.size > 0 && (
          <div style={{ flex: 1, border: "2px solid " }}>
            <h3>Your Nominations 🏆</h3>
            {[...nominations.values()].map(
              ({ Title, Year, Poster, imdbID }) => (
                <Movie
                  Title={Title}
                  Year={Year}
                  Poster={Poster}
                  imdbID={imdbID}
                  nominations={nominations}
                  setNominations={setNominations}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
