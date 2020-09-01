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
      <h1
        style={{ fontSize: "3rem", fontFamily: "Architects Daughter, cursive" }}
      >
        The Shoppies
      </h1>

      <div
        style={{
          alignItems: "space-between",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          justifyContent: "center",
          margin: "1rem auto",
        }}
      >
        <label
          for="search"
          style={{
            textAlign: "left",
            fontSize: "2rem",
            fontWeight: "700",
            margin: "1rem 0",
          }}
        >
          Movie Name
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 4,
            width: "100%",
          }}
        >
          <input
            aria-label="Search bar"
            role="search"
            inputMode="search"
            type="text"
            name="search"
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchMovies(inputText);
            }}
            placeholder="e.g. Iron Man"
            style={{
              border: "none",
              borderRadius: "6px",
              padding: "8px",
              flex: 3,
            }}
            value={inputText}
          />
          <button onClick={() => searchMovies(inputText)} style={{ flex: 1 }}>
            Search
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 3,
          justifyContent: "space-around",
          margin: "1rem",
        }}
      >
        {/* movies list */}
        <div style={{ margin: "0 auto", flex: 2 }}>
          {inputText && (
            <h3
              style={{ textAlign: "center", marginLeft: "2rem" }}
            >{`Results for "${inputText}"`}</h3>
          )}
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
        <div style={{ flex: 1, backgroundColor: "#212b36" }}>
          <h3>
            Your Nominations{" "}
            <span aria-label="trophy" role="img">
              🏆
            </span>
          </h3>
          {nominations.size > 0 ? (
            [...nominations.values()].map(({ Title, Year, Poster, imdbID }) => (
              <Movie
                Title={Title}
                Year={Year}
                Poster={Poster}
                imdbID={imdbID}
                nominations={nominations}
                setNominations={setNominations}
              />
            ))
          ) : (
            <>
              <p>You don't have any nominations for The Shoppies yet.</p>
              <p>Try searching and adding some movies to the list!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
