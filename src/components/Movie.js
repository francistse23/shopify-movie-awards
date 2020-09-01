import React from "react";

const buttonStyle = {
  fontSize: "1rem",
  flexGrow: 1,
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
  function addToNominations({ Title, Year, Poster, imdbID }) {
    if (!nominations.has(imdbID)) {
      setNominations((nominations) => {
        const newNominations = new Map(nominations);
        newNominations.set(imdbID, { Title, Year, Poster, imdbID });

        return newNominations;
      });
    }
  }

  function removeFromNominations({ imdbID }) {
    if (nominations.has(imdbID)) {
      setNominations((nominations) => {
        const newNominations = new Map(nominations);
        nominations.delete(imdbID);

        return newNominations;
      });
    } else {
    }
  }

  const isInNominations = nominations.has(imdbID);

  return (
    <div
      style={{
        display: "flex",
        flex: 2,
        margin: "1rem",
        padding: "1rem",
        boxSizing: "border-box",
        border: isInNominations ? "5px solid #50B83C" : "",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>
          {Title} ({Year})
        </h3>
        <div style={{ display: "flex", flex: 2 }}>
          {!isNominations && (
            <button
              disabled={isInNominations}
              onClick={() => addToNominations({ Title, Year, Poster, imdbID })}
              style={buttonStyle}
            >
              <span role="img" aria-label="Ballot box emoji">
                🗳️
              </span>{" "}
              Add to Nominations
            </button>
          )}
          <button
            disabled={!isInNominations}
            onClick={() => removeFromNominations({ imdbID })}
            style={buttonStyle}
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
        <img
          src={Poster}
          alt={`${Title} Poster`}
          style={{ height: 223, width: 150 }}
        />
      </div>
    </div>
  );
}
