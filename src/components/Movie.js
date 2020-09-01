import React from "react";

export default function Movie({
  nominations,
  Title,
  Year,
  Poster,
  imdbID,
  setNominations,
}) {
  function editNominations({ Title, Year, Poster, imdbID }) {
    if (nominations.has(imdbID)) {
      setNominations((nominations) => {
        const newNominations = new Map(nominations);
        nominations.delete(imdbID);

        return newNominations;
      });
    } else {
      setNominations((nominations) => {
        const newNominations = new Map(nominations);
        newNominations.set(imdbID, { Title, Year, Poster, imdbID });

        return newNominations;
      });
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
        <button
          disabled={nominations.size >= 5 && !isInNominations}
          onClick={() => editNominations({ Title, Year, Poster, imdbID })}
        >{`${isInNominations ? "Remove from" : "Add to"} Nominations`}</button>
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
