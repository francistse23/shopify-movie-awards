import {
  MovieContainerDiv,
  MovieDetailsDiv,
  MoviePlot,
  MoviePosterDiv,
  MovieTitle,
  NominationButton,
  NominationButtonsContainer,
  PosterImage,
} from "../styled-components";

import React from "react";
import { colors } from "../constants";
import { replacer } from "../lib/JSONHelper";

export default function Movie({
  nominations,
  Plot = "",
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

  return (
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
              fontColor={colors.lightColor}
              disabled={nominations.size >= 5 || isInNominations}
              onClick={() => addToNominations(Title, Year, Poster, imdbID)}
              style={{
                backgroundColor:
                  nominations.size >= 5 || isInNominations
                    ? colors.disabledColor
                    : colors.mainColor,
              }}
            >
              <span role="img" aria-label="Ballot box emoji">
                🗳️
              </span>{" "}
              Nominate
            </NominationButton>
          ) : null}
          {!isNominations && <div style={{ flex: 1 }} />}
          <NominationButton
            aria-label="Remove from nomination"
            fontColor={colors.lightColor}
            disabled={!isInNominations}
            onClick={() => removeFromNominations(imdbID)}
            style={{
              backgroundColor: !isInNominations
                ? colors.disabledColor
                : colors.mainColor,
            }}
          >
            <span role="img" aria-label="Remove emoji">
              ❌
            </span>{" "}
            Un-nominate
          </NominationButton>
        </NominationButtonsContainer>
      </MovieDetailsDiv>

      {/*  remove in nominations? */}
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
    </MovieContainerDiv>
  );
}
