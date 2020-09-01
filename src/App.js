import React, { useState, useEffect } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";
import Movie from "./components/Movie";
import SearchBar from "./components/SearchBar";
import { reviver, replacer } from "./lib/JSONHelper";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  // const [page, setPage] = useState(1);
  const [nominations, setNominations] = useState(new Map());

  const { localStorage } = window;

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

  useEffect(() => {
    if (
      localStorage.length === 0 ||
      !localStorage.getItem("shopify_the_shoppies_nominations")
    ) {
      const str = JSON.stringify(new Map(), replacer);
      localStorage.setItem("shopify_the_shoppies_nominations", str);
    } else {
      const storedNominations = JSON.parse(
        localStorage.getItem("shopify_the_shoppies_nominations"),
        reviver
      );

      setNominations(storedNominations);
    }
  }, []);

  return (
    <div className="App">
      <h1
        style={{ fontSize: "5rem", fontFamily: "Architects Daughter, cursive" }}
      >
        The Shoppies
      </h1>

      <SearchBar
        inputText={inputText}
        setInputText={setInputText}
        searchMovies={searchMovies}
      />

      <div
        style={{
          display: "flex",
          flex: 5,
          justifyContent: "space-between",
          margin: "2rem auto",
          maxWidth: "1300px",
          width: "100%",
        }}
      >
        {/* movies list */}
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: "0 1rem",
            padding: "0 1rem",
            flex: 3,
            backgroundColor: "#212b36",
            borderRadius: "12px",
            boxShadow: "0px 0px 20px 5px #FFFFFF",
          }}
        >
          {searchResults?.result?.Search?.length ? (
            <>
              {" "}
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
            </>
          ) : (
            <p
              style={{
                alignSelf: "center",
                fontSize: "1.5rem",
                lineHeight: "10vh",
                height: "10vh",
              }}
            >
              Try searching and adding some movies to your nominations list!
            </p>
          )}
        </div>

        {/* nominations list */}
        <div
          style={{
            flex: 2,
            backgroundColor: "#212b36",
            borderRadius: "12px",
            margin: "0 1rem",
            padding: "1rem",
            boxShadow: "0px 0px 20px 5px #FFFFFF",
            height: "100%",
          }}
        >
          <h3 style={{ fontSize: "2rem" }}>
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
                isNominations={true}
              />
            ))
          ) : (
            <>
              <p>You don't have any nominations for The Shoppies yet.</p>
              <p>You can make add at most 5 nominations</p>
            </>
          )}
        </div>
      </div>

      {nominations.size === 5 && (
        <footer
          style={{
            backgroundColor: "white",
            position: "sticky",
            bottom: 0,
            lineHeight: "10vh",
            height: "10vh",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <h1>
            You have made all 5 nominations!{" "}
            <span aria-label="trophy" role="img">
              🏆
            </span>
          </h1>
        </footer>
      )}
    </div>
  );
}

export default App;
