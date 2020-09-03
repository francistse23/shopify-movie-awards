import React from "react";
import { replacer } from "../lib/JSONHelper";
import { MovieContainerDiv } from "../styled-components";

const buttonStyle = {
  color: "#3E4155",
  fontSize: "1rem",
  fontWeight: "600",
  flex: 1,
  backgroundColor: "#50B83C",
  borderRadius: "12px",
  border: "none",
  margin: "0 0.5rem",
  padding: "0.5rem",
  cursor: "pointer",
};

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
            <button
              disabled={nominations.size >= 5 || isInNominations}
              onClick={() => addToNominations(Title, Year, Poster, imdbID)}
              style={{
                ...buttonStyle,
                backgroundColor:
                  nominations.size >= 5 || isInNominations
                    ? "#919EAB"
                    : "#50B83C",
              }}
            >
              <span role="img" aria-label="Ballot box emoji">
                🗳️
              </span>{" "}
              Add to Nominations
            </button>
          )}
          <button
            disabled={!isInNominations}
            onClick={() => removeFromNominations(imdbID)}
            style={{
              ...buttonStyle,
              backgroundColor: !isInNominations ? "#919EAB" : "#50B83C",
            }}
          >
            <span role="img" aria-label="Remove emoji">
              ❌
            </span>{" "}
            Remove from Nominations
          </button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {Poster === "N/A" ? (
          <img
            src={require("../assets/poster-placeholder.png")}
            alt={`Poster unavailable at this time`}
            style={{ height: 167, width: 113, borderRadius: "6px" }}
          />
        ) : (
          <img
            src={Poster}
            alt={`${Title} Poster`}
            style={{ height: 167, width: 113, borderRadius: "6px" }}
          />
        )}
      </div>
    </MovieContainerDiv>
  );
}
