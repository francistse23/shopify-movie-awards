import React, { useState, useEffect } from "react";
import "./App.css";
import useDebouncedSearch from "./components/useDebouncedSearch";
import Movie from "./components/Movie";
import Nominations from "./components/Nominations";
import NominationsBanner from "./components/NominationsBanner";
import SearchBar from "./components/SearchBar";
import PaginationFooter from "./components/PaginationFooter";
import { reviver, replacer } from "./lib/JSONHelper";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSTransitionGroup } from "react-transition-group";
import {
  AppBody,
  AppMain,
  AppTitle,
  MovieTitle,
  SectionDiv,
} from "./styled-components";
import { colors, dimensions } from "./constants";

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
        {/* movies list */}
        <SectionDiv flex={3} backgroundColor={colors.sectionBackground}>
          {!inputText.length ? (
            <MovieTitle
              style={{
                lineHeight: "10vh",
                height: "10vh",
              }}
            >
              Try searching and adding some movies to your nominations list!
            </MovieTitle>
          ) : null}

          {searchResults?.loading ? (
            <ClipLoader
              css={css`
                margin: ${dimensions.spacing * 20}px auto;
              `}
              size={100}
              color={`${colors.mainColor}`}
              loading={searchResults?.loading}
            />
          ) : (
            <div>
              <>
                {inputText &&
                (searchResults?.result?.Error === "Movie not found!" ||
                  !searchResults?.result?.Response) ? (
                  <>
                    <MovieTitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</MovieTitle>
                    <MovieTitle>
                      Please try another search term to find the movie(s) you
                      would like to nominate.
                    </MovieTitle>
                  </>
                ) : (
                  inputText && (
                    <MovieTitle>{`Results for "${inputText}"`}</MovieTitle>
                  )
                )}

                <CSSTransitionGroup
                  transitionName="movies"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {searchResults?.result?.Search?.map(
                    ({ Title, Year, Poster, imdbID }) => (
                      <Movie
                        key={imdbID}
                        Title={Title}
                        Year={Year}
                        Poster={Poster}
                        imdbID={imdbID}
                        nominations={nominations}
                        setNominations={setNominations}
                      />
                    )
                  )}
                </CSSTransitionGroup>

                {searchResults?.result?.Search?.length && (
                  <PaginationFooter page={page} setPage={setPage} />
                )}
              </>
            </div>
          )}
        </SectionDiv>
        {/* nominations list */}
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
