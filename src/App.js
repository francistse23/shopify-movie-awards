import React, { useState } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";

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

  console.log(nominations);

  function editNominations({ Title, Year, Poster, imdbID }) {
    if (nominations.has(imdbID)) {
      setNominations((nominations) => {
        const newNominations = nominations;
        nominations.delete(imdbID);

        return newNominations;
      });
    } else {
      const newNominations = nominations;
      newNominations.set(imdbID, { Title, Year, Poster, imdbID });
      setNominations(newNominations);
    }
  }

  console.log(searchResults);

  return (
    <div className="App">
      <h1 style={{ fontSize: "3rem" }}>The Shoppies Nominations</h1>

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
          style={{ border: "none", borderRadius: "6px", padding: "8px" }}
          value={inputText}
        />
        <button onClick={() => searchMovies(inputText)}>Search</button>
      </div>
      <div style={{ margin: "0 auto", maxWidth: "600px" }}>
        {searchResults?.result?.Search?.map(
          ({ Title, Year, Poster, imdbID }) => (
            <div
              style={{
                display: "flex",
                flex: 2,
                margin: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3>
                  {Title} ({Year})
                </h3>
                <button
                  onClick={() =>
                    editNominations({ Title, Year, Poster, imdbID })
                  }
                >{`${
                  nominations.has(imdbID) ? "Remove from" : "Add to"
                } Nominations`}</button>
              </div>
              <div
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <img
                  src={Poster}
                  alt={`${Title} Poster`}
                  style={{ height: 223, width: 150 }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
