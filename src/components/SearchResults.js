import * as SC from "../styledComponents";

import Loading from "./Loading";
import Movie from "./Movie";
import PaginationFooter from "./PaginationFooter";
import React from "react";

const { MoviesContainer, SectionDiv, SectionTitle } = SC;

export default function SearchResults({
  queriedResult: {
    data: { Search: searchResults, totalResults } = {},
    isLoading = true,
    error,
  },
  typing,
  inputText,
  nominations,
  setNominations,
  page,
  setPage,
}) {
  return (
    <SectionDiv id="search-results">
      {!inputText.length ? (
        <SectionTitle>
          Try searching and adding some movies to your nominations list!
        </SectionTitle>
      ) : null}

      {error ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionTitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</SectionTitle>
          <SectionTitle>
            Please try another search term to find the movie(s) you would like
            to nominate.
          </SectionTitle>
        </div>
      ) : isLoading || typing ? (
        <Loading loading={true} />
      ) : (
        inputText.length > 2 && (
          <>
            <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>

            <MoviesContainer>
              {searchResults?.map(
                ({ Plot, Ratings, Title, Year, Poster, imdbID }) => (
                  <Movie
                    key={`${Title}-${imdbID}`}
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

            <PaginationFooter
              page={page}
              setPage={setPage}
              totalResults={Number(totalResults)}
            />
          </>
        )
      )}
    </SectionDiv>
  );
}
