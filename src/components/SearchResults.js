import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { CSSTransitionGroup } from "react-transition-group";
import { colors, dimensions } from "../constants";
import Movie from "./Movie";
import PaginationFooter from "./PaginationFooter";
import { Subtitle, SectionDiv } from "../styled-components";

export default function SearchResults({
  inputText,
  searchResults,
  nominations,
  setNominations,
  page,
  setPage,
}) {
  return (
    <div>
      {inputText && <Subtitle>{`Results for "${inputText}"`}</Subtitle>}

      <SectionDiv backgroundColor={colors.sectionBackground} height={300}>
        {!inputText.length ? (
          <Subtitle>
            Try searching and adding some movies to your nominations list!
          </Subtitle>
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
            <Subtitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</Subtitle>
            <Subtitle>
              Please try another search term to find the movie(s) you would like
              to nominate.
            </Subtitle>
          </div>
        ) : (
          <>
            <CSSTransitionGroup
              style={{ display: "flex" }}
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
