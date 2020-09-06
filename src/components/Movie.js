import React from "react";
import { replacer } from "../lib/JSONHelper";
import {
  MovieDiv,
  MovieContainerDiv,
  MovieDetailsDiv,
  MoviePosterDiv,
  MovieTitle,
  NominationButton,
  NominationButtonsContainer,
  PosterImage,
} from "../styled-components";
import { colors } from "../constants";

export default function Movie({
  nominations,
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
      flex={2}
      isInNominations={isInNominations}
      isNominations={isNominations}
    >
      <MovieDiv>
        <MovieDetailsDiv>
          <MovieTitle>
            {Title} ({Year})
          </MovieTitle>

          <NominationButtonsContainer>
            {!isNominations && (
              <NominationButton
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
                Add to Nominations
              </NominationButton>
            )}
            <NominationButton
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
              Remove from Nominations
            </NominationButton>
          </NominationButtonsContainer>
        </MovieDetailsDiv>
      </MovieDiv>
      <MoviePosterDiv>
        {Poster === "N/A" ? (
          <PosterImage
            src={require("../assets/poster-placeholder.png")}
            alt={`Poster unavailable at this time`}
          />
        ) : (
          <PosterImage src={Poster} alt={`${Title} Poster`} />
        )}
      </MoviePosterDiv>
    </MovieContainerDiv>
  );
}
