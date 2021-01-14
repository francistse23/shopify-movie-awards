import * as SC from "../styledComponents";

import Loading from "./Loading";
import Movie from "./Movie";
import PaginationFooter from "./PaginationFooter";
import React from "react";
import { useQuery } from "react-query";

const { MoviesContainer, SectionDiv, SectionTitle } = SC;

const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;

async function searchMovies(inputText, page) {
  try {
    const res = await (
      await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${inputText}&type=movie&page=${page}`
      )
    ).json();

    // using short plots to minimize scrolling
    // if needed, can change plot=full to get a detailed plot
    const moviesWithPlot = await Promise.all(
      res.Search?.map(async ({ imdbID }) => {
        const movie = (
          await fetch(
            `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&type=movie&plot=short`
          )
        ).json();

        return movie;
      })
    );

    res.Search = moviesWithPlot;

    return res;
  } catch (err) {
    throw new Error(err);
  }
}

export default function SearchResults({
  typing,
  inputText,
  nominations,
  setNominations,
  page,
  setPage,
}) {
  const queriedResult = useQuery(
    [inputText, page],
    () => searchMovies(inputText, page),
    {
      enabled: !!inputText && inputText.length > 2,
      keepPreviousData: true,
      retry: 2,
      staleTime: 5000,
    }
  );

  const {
    data: { Search: searchResults, totalResults } = {},
    isLoading = true,
    isError,
  } = queriedResult;

  return (
    <SectionDiv id="search-results">
      {!inputText.length ? (
        <SectionTitle>
          Try searching and adding some movies to your nominations list!
        </SectionTitle>
      ) : null}

      {isLoading || typing ? (
        <Loading loading={isLoading} />
      ) : inputText && (isError || !searchResults) && !typing ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionTitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</SectionTitle>
          <SectionTitle>
            Please try another search term to find the movie(s) you would like
            to nominate.
          </SectionTitle>
        </div>
      ) : (
        <>
          {inputText && (
            <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>
          )}
          <MoviesContainer>
            {inputText &&
              searchResults?.map(
                ({ Plot, Ratings, Title, Year, Poster, imdbID }) => (
                  <Movie
                    key={imdbID}
                    Plot={Plot}
                    Ratings={Ratings}
                    Title={Title}
                    Year={Year}
                    Poster={Poster}
                    imdbID={imdbID}
                    nominations={nominations}
                    setNominations={setNominations}
                  />
                )
              )}
          </MoviesContainer>
        </>
      )}

      {totalResults && (
        <PaginationFooter
          page={page}
          setPage={setPage}
          totalResults={Number(totalResults)}
        />
      )}
    </SectionDiv>
  );
}
