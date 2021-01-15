import * as SC from "../styledComponents";

import React from "react";
import { replacer } from "../lib/JSONHelper";

const {
  MovieContainer,
  MovieDetails,
  MoviePlot,
  MoviePosterDiv,
  MovieRating,
  MovieRatings,
  MovieTitle,
  NominationButton,
  NominationButtonsContainer,
  PosterImage,
  RatingIcon,
} = SC;

export function addToNominations(Title, Year, Poster, imdbID, nominations) {
  const newNominations = new Map(nominations);
  newNominations.set(imdbID, { Title, Year, Poster, imdbID });
  const str = JSON.stringify(newNominations, replacer);
  localStorage.setItem("shopify_the_shoppies_nominations", str);

  return newNominations;
}

export function removeFromNominations(imdbID, nominations) {
  const newNominations = new Map(nominations);
  newNominations.delete(imdbID);
  const str = JSON.stringify(newNominations, replacer);
  localStorage.setItem("shopify_the_shoppies_nominations", str);

  return newNominations;
}

export default function Movie({
  nominations,
  Plot = "",
  Ratings = [],
  Title,
  Year,
  Poster,
  imdbID,
  setNominations,
  isNominations = false,
}) {
  const isInNominations = nominations.has(imdbID);

  return isNominations ? (
    <MovieContainer
      isInNominations={isInNominations}
      isNominations={isNominations}
    >
      <MovieDetails isNominations={isNominations}>
        <MovieTitle isNominations={isNominations}>
          {Title} ({Year})
        </MovieTitle>
        <MoviePosterDiv>
          {Poster === "N/A" ? (
            <PosterImage
              src={require("../assets/poster-placeholder.png").default}
              alt="Poster unavailable at this time"
              nominated={isNominations}
            />
          ) : (
            <PosterImage
              src={Poster}
              alt={`${Title} Poster`}
              nominated={isNominations}
            />
          )}
        </MoviePosterDiv>
      </MovieDetails>

      <NominationButtonsContainer>
        <NominationButton
          aria-label="Remove from nomination"
          data-testid="remove-nomination"
          disabled={!isInNominations}
          name="Remove from nomination"
          onClick={() =>
            setNominations((nominations) =>
              removeFromNominations(imdbID, nominations)
            )
          }
        >
          <span role="img" aria-label="Remove emoji">
            ❌
          </span>{" "}
          Un-nominate
        </NominationButton>
      </NominationButtonsContainer>
    </MovieContainer>
  ) : (
    <MovieContainer
      isInNominations={isInNominations}
      isNominations={isNominations}
    >
      <MovieDetails>
        <MovieTitle
          aria-label="movie name and year"
          isNominations={isNominations}
        >
          {Title} ({Year})
        </MovieTitle>

        <MoviePlot aria-label={`${Title} plot`}>{Plot}</MoviePlot>

        <NominationButtonsContainer>
          {!isNominations && (
            <NominationButton
              aria-label="Add to nomination"
              disabled={nominations.size >= 5 || isInNominations}
              name="Add to nomination"
              onClick={() =>
                setNominations((nominations) =>
                  addToNominations(Title, Year, Poster, imdbID, nominations)
                )
              }
            >
              <span role="img" aria-label="Ballot box emoji">
                🗳️
              </span>{" "}
              Nominate
            </NominationButton>
          )}
          <NominationButton
            aria-label="Remove from nomination"
            data-testid="remove-nomination"
            disabled={!isInNominations}
            name="Remove from nomination"
            onClick={() =>
              setNominations((nominations) =>
                removeFromNominations(imdbID, nominations)
              )
            }
          >
            <span role="img" aria-label="Remove emoji">
              ❌
            </span>{" "}
            Un-nominate
          </NominationButton>
        </NominationButtonsContainer>
      </MovieDetails>

      <MoviePosterDiv>
        {Poster === "N/A" ? (
          <PosterImage
            src={require("../assets/poster-placeholder.png").default}
            alt="Poster unavailable at this time"
            nominated={isNominations}
          />
        ) : (
          <PosterImage
            src={Poster}
            alt={`${Title} Poster`}
            nominated={isNominations}
          />
        )}

        <MovieRatings>
          {Ratings.map(({ Source, Value }) => (
            <MovieRating key={Source} data-testid={`${Source}-rating`}>
              <RatingIcon
                src={
                  Source.includes("Tomatoes")
                    ? require("../assets/rotten-tomatoes.png").default
                    : Source.includes("Metacritic")
                    ? require("../assets/metacritic.png").default
                    : require("../assets/imdb.png").default
                }
                alt={`${Source} Icon`}
              />{" "}
              {Value}
            </MovieRating>
          ))}
        </MovieRatings>
      </MoviePosterDiv>
    </MovieContainer>
  );
}
