import { SectionDiv, SectionTitle } from "../styled-components";

import { CSSTransitionGroup } from "react-transition-group";
import Loading from "./Loading";
import Movie from "./Movie";
import PaginationFooter from "./PaginationFooter";
import React from "react";

export default function SearchResults({
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

      {inputText && !searchResults?.loading && (
        <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>
      )}

      {searchResults?.loading ? (
        <Loading loading={searchResults?.loading} />
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
            flexDirection: `${window.screen.width >= 1024 ? "row" : "column"}`,
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
          transitionName="movies"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {searchResults?.result?.Search?.map(
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
        </CSSTransitionGroup>
      )}

      <PaginationFooter
        page={page}
        setPage={setPage}
        // searchResults?.result?.totalResults
        totalResults={Number(79)}
      />
    </SectionDiv>

    // <div>
    //   {inputText && <SectionTitle>{`Results for "${inputText}"`}</SectionTitle>}

    //   <SectionDiv backgroundColor={colors.secondaryColor} height={300}>
    //     {!inputText.length ? (
    //       <SectionTitle>
    //         Try searching and adding some movies to your nominations list!
    //       </SectionTitle>
    //     ) : null}

    //     {searchResults?.loading ? (
    //       <Loading loading={searchResults?.loading} />
    //     ) : !searchResults?.loading &&
    //       inputText &&
    //       (searchResults?.result?.Error === "Movie not found!" ||
    //         !searchResults?.result?.Response) ? (
    //       <div style={{ display: "flex", flexDirection: "column" }}>
    //         <SectionTitle>{`Hmm... we cannot find any movie title that includes "${inputText}".`}</SectionTitle>
    //         <SectionTitle>
    //           Please try another search term to find the movie(s) you would like
    //           to nominate.
    //         </SectionTitle>
    //       </div>
    //     ) : (
    //       <>
    //         <CSSTransitionGroup
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //           }}
    //           transitionName="movies"
    //           transitionEnterTimeout={500}
    //           transitionLeaveTimeout={500}
    //         >
    //           {searchResults?.result?.Search?.map(
    //             ({ Plot, Title, Year, Poster, imdbID }) => (
    //               <Movie
    //                 key={imdbID}
    //                 Plot={Plot}
    //                 Title={Title}
    //                 Year={Year}
    //                 Poster={Poster}
    //                 imdbID={imdbID}
    //                 nominations={nominations}
    //                 setNominations={setNominations}
    //               />
    //             )
    //           )}
    //         </CSSTransitionGroup>
    //       </>
    //     )}
    //   </SectionDiv>
    // </div>
  );
}
