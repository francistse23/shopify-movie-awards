import { SectionDiv, SectionTitle } from "../styled-components";

import { CSSTransitionGroup } from "react-transition-group";
import Loading from "./Loading";
import Movie from "./Movie";
import React from "react";
import { colors } from "../constants";

export default function SearchResults({
  inputText,
  searchResults,
  nominations,
  setNominations,
}) {
  return window.screen.width >= 1024 ? (
    <SectionDiv
      backgroundColor={colors.secondaryColor}
      style={{
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // margin: "0 auto",
        // maxWidth: "1200px",
      }}
    >
      {!inputText.length ? (
        <SectionTitle>
          Try searching and adding some movies to your nominations list!
        </SectionTitle>
      ) : null}

      {inputText && !searchResults?.loading && (
        <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>
      )}

      {searchResults?.loading ? (
        <Loading searchResults={searchResults} />
      ) : !searchResults?.loading &&
        inputText &&
        (searchResults?.result?.Error === "Movie not found!" ||
          !searchResults?.result?.Response) ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionTitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</SectionTitle>
          <SectionTitle>
            Please try another search term to find the movie(s) you would like
            to nominate.
          </SectionTitle>
        </div>
      ) : (
        <CSSTransitionGroup
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "1600px",
          }}
          transitionName="movies"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {searchResults?.result?.Search?.map(
            ({ Plot, Title, Year, Poster, imdbID }) => (
              <Movie
                key={imdbID}
                Plot={Plot}
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
      )}
    </SectionDiv>
  ) : (
    <div>
      {inputText && <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>}

      <SectionDiv backgroundColor={colors.secondaryColor} height={300}>
        {!inputText.length ? (
          <SectionTitle>
            Try searching and adding some movies to your nominations list!
          </SectionTitle>
        ) : null}

        {searchResults?.loading ? (
          <Loading searchResults={searchResults} />
        ) : !searchResults?.loading &&
          inputText &&
          (searchResults?.result?.Error === "Movie not found!" ||
            !searchResults?.result?.Response) ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SectionTitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</SectionTitle>
            <SectionTitle>
              Please try another search term to find the movie(s) you would like
              to nominate.
            </SectionTitle>
          </div>
        ) : (
          <>
            <CSSTransitionGroup
              style={{
                display: "flex",
                flexDirection: window.screen.width >= 1024 ? "column" : "row",
              }}
              transitionName="movies"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {searchResults?.result?.Search?.map(
                ({ Plot, Title, Year, Poster, imdbID }) => (
                  <Movie
                    key={imdbID}
                    Plot={Plot}
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
          </>
        )}
      </SectionDiv>
    </div>
  );
}
