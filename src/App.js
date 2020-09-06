import React, { useState, useEffect } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";
import Nominations from "./components/Nominations";
import NominationsBanner from "./components/NominationsBanner";
import SearchResults from "./components/SearchResults";
import SearchBar from "./components/SearchBar";
import { reviver, replacer } from "./lib/JSONHelper";
import { AppBody, AppMain, AppTitle } from "./styled-components";

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

function App() {
  const [nominations, setNominations] = useState(new Map());

  const { localStorage } = window;

  const useSearchOMDB = () =>
    useDebouncedSearch((text, page) => searchMovies(text, page));
  const {
    inputText,
    setInputText,
    searchResults,
    page,
    setPage,
  } = useSearchOMDB();

  async function searchMovies(text, page) {
    try {
      const res = (
        await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${text}&type=movie&page=${page}`
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
  }, [localStorage]);

  return (
    <AppMain className="App">
      <AppTitle>The Shoppies</AppTitle>

      <SearchBar
        inputText={inputText}
        setInputText={setInputText}
        searchMovies={searchMovies}
      />

      <AppBody>
        <SearchResults
          inputText={inputText}
          searchResults={searchResults}
          nominations={nominations}
          setNominations={setNominations}
          page={page}
          setPage={setPage}
        />

        <Nominations
          nominations={nominations}
          setNominations={setNominations}
        />
      </AppBody>

      <NominationsBanner nominations={nominations} />
    </AppMain>
  );
}

export default App;
