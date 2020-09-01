import React, { useState } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";
import Movie from "./components/Movie";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  // const [page, setPage] = useState(1);
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
        style={{ fontSize: "5rem", fontFamily: "Architects Daughter, cursive" }}
      >
        The Shoppies
      </h1>

      {/* search bar */}
      <div
        style={{
          backgroundColor: "#212b36",
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",
          margin: "1rem auto",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0px 0px 20px 5px #FFFFFF",
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
              padding: "1.1rem",
              flex: 3,
              fontSize: "1.15rem",
            }}
            value={inputText}
          />
          {/* <button onClick={() => searchMovies(inputText)} style={{ flex: 1 }}>
            Search
          </button> */}
        </div>
      </div>

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
