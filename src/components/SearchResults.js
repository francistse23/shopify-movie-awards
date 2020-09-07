import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSTransitionGroup } from "react-transition-group";
import { colors, dimensions } from "../constants";
import Movie from "./Movie";
import PaginationFooter from "./PaginationFooter";
import { SectionDiv, SectionTitle } from "../styled-components";

export default function SearchResults({
  inputText,
  searchResults,
  nominations,
  setNominations,
  page,
  setPage,
}) {
  return window.screen.width >= 1024 ? (
    <SectionDiv
      flex={3}
      backgroundColor={colors.sectionBackground}
      height={350}
      style={{ flexDirection: "column" }}
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
        <ClipLoader
          css={css`
            margin: ${dimensions.spacing * 20}px auto;
          `}
          size={100}
          color={`${colors.mainColor}`}
          loading={searchResults?.loading}
        />
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
        </>
      )}

      {searchResults?.result?.Search?.length && (
        <PaginationFooter
          page={page}
          setPage={setPage}
          searchResults={searchResults}
        />
      )}
    </SectionDiv>
  ) : (
    <div>
      {inputText && <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>}

      <SectionDiv backgroundColor={colors.sectionBackground} height={300}>
        {!inputText.length ? (
          <SectionTitle>
            Try searching and adding some movies to your nominations list!
          </SectionTitle>
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
          </>
        )}
      </SectionDiv>
      {searchResults?.result?.Search?.length && (
        <PaginationFooter
          page={page}
          setPage={setPage}
          searchResults={searchResults}
        />
      )}
    </div>
  );
}
