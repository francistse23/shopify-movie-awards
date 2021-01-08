import {
  MovieContainerDiv,
  MovieDetailsDiv,
  MoviePlot,
  MoviePosterDiv,
  MovieRating,
  MovieRatings,
  MovieTitle,
  NominationButton,
  NominationButtonsContainer,
  PosterImage,
} from "../styled-components";

import React from "react";
import { dimensions } from "../constants";
import { replacer } from "../lib/JSONHelper";

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

  function addToNominations(Title, Year, Poster, imdbID) {
    if (!isInNominations) {
      setNominations((nominations) => {
        const newNominations = new Map(nominations);
        newNominations.set(imdbID, { Title, Year, Poster, imdbID });
        const str = JSON.stringify(newNominations, replacer);
        localStorage.setItem("shopify_the_shoppies_nominations", str);

        return newNominations;
      });
    }
  }

  function removeFromNominations(imdbID) {
    if (isInNominations) {
      setNominations((nominations) => {
        const newNominations = new Map(nominations);
        newNominations.delete(imdbID);

        const str = JSON.stringify(newNominations, replacer);

        localStorage.setItem("shopify_the_shoppies_nominations", str);
        return newNominations;
      });
    }
  }

  return isNominations ? (
    <MovieContainerDiv
      isInNominations={isInNominations}
      isNominations={isNominations}
    >
      <MovieDetailsDiv isNominations={isNominations}>
        <MovieTitle isNominations={isNominations}>
          {Title} ({Year})
        </MovieTitle>
        <MoviePosterDiv>
          {Poster === "N/A" ? (
            <PosterImage
              src={require("../assets/poster-placeholder.png")}
              alt={`Poster unavailable at this time`}
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
      </MovieDetailsDiv>

      <NominationButtonsContainer>
        <NominationButton
          aria-label="Remove from nomination"
          disabled={!isInNominations}
          onClick={() => removeFromNominations(imdbID)}
        >
          <span role="img" aria-label="Remove emoji">
            ❌
          </span>{" "}
          Un-nominate
        </NominationButton>
      </NominationButtonsContainer>
    </MovieContainerDiv>
  ) : (
    <MovieContainerDiv
      isInNominations={isInNominations}
      isNominations={isNominations}
    >
      <MovieDetailsDiv>
        <MovieTitle isNominations={isNominations}>
          {Title} ({Year})
        </MovieTitle>

        <MoviePlot>{Plot}</MoviePlot>

        <NominationButtonsContainer>
          {!isNominations ? (
            <NominationButton
              aria-label="Add to nomination"
              disabled={nominations.size >= 5 || isInNominations}
              onClick={() => addToNominations(Title, Year, Poster, imdbID)}
            >
              <span role="img" aria-label="Ballot box emoji">
                🗳️
              </span>{" "}
              Nominate
            </NominationButton>
          ) : null}
          <NominationButton
            aria-label="Remove from nomination"
            disabled={!isInNominations}
            onClick={() => removeFromNominations(imdbID)}
          >
            <span role="img" aria-label="Remove emoji">
              ❌
            </span>{" "}
            Un-nominate
          </NominationButton>
        </NominationButtonsContainer>
      </MovieDetailsDiv>

      <MoviePosterDiv>
        {Poster === "N/A" ? (
          <PosterImage
            src={require("../assets/poster-placeholder.png")}
            alt={`Poster unavailable at this time`}
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
            <MovieRating key={Source}>
              <img
                src={
                  Source.includes("Tomatoes")
                    ? require("../assets/rotten-tomatoes.png")
                    : Source.includes("Metacritic")
                    ? require("../assets/metacritic.png")
                    : require("../assets/imdb.png")
                }
                alt={`${Source} Icon`}
                style={{ height: "24px", width: "24px" }}
              />{" "}
              {Value}
            </MovieRating>
          ))}
        </MovieRatings>
      </MoviePosterDiv>
    </MovieContainerDiv>
  );
}
