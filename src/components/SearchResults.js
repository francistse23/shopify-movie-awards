import { SectionDiv, SectionTitle } from "../styled-components";

import Loading from "./Loading";
import Movie from "./Movie";
import PaginationFooter from "./PaginationFooter";
import React from "react";
import { TransitionGroup } from "react-transition-group";

export default function SearchResults({
  queryState: { isLoading, isError },
  inputText,
  searchResults,
  nominations,
  setNominations,
  page,
  setPage,
}) {
  return (
    <SectionDiv>
      {!inputText.length ? (
        <SectionTitle>
          Try searching and adding some movies to your nominations list!
        </SectionTitle>
      ) : null}

      {isLoading ? (
        <Loading loading={isLoading} />
      ) : inputText && (isError || !searchResults) ? (
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
          <TransitionGroup
            style={{
              display: "flex",
              flexDirection: `${
                window.screen.width >= 1024 ? "row" : "column"
              }`,
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
            }}
            transitionName="movies"
            timeout={500}
          >
            {searchResults?.map(
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
          </TransitionGroup>
        </>
      )}

      {searchResults?.result?.totalResults && (
        <PaginationFooter
          page={page}
          setPage={setPage}
          totalResults={Number(searchResults?.result?.totalResults)}
        />
      )}
    </SectionDiv>
  );
}
