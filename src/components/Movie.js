import React from "react";
import { replacer } from "../lib/JSONHelper";
import {
  MovieContainerDiv,
  NominationButton,
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
      <div
        style={{
          display: "flex",
          flex: 2,
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          margin: "0 0.5rem",
        }}
      >
        <div style={{ flex: 3 }}>
          <h3 style={{ fontSize: "1.5rem" }}>
            {Title} ({Year})
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
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
        </div>
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {Poster === "N/A" ? (
          <PosterImage
            src={require("../assets/poster-placeholder.png")}
            alt={`Poster unavailable at this time`}
          />
        ) : (
          <PosterImage src={Poster} alt={`${Title} Poster`} />
        )}
      </div>
    </MovieContainerDiv>
  );
}
