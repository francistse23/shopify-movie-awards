import React from "react";
import { SearchBarDiv } from "../styled-components";

export default function SearchBar({ inputText, setInputText, searchMovies }) {
  return (
    <SearchBarDiv>
      <label
        for="search"
        style={{
          textAlign: "left",
          fontSize: "2rem",
          fontWeight: "700",
          margin: "1rem 0",
        }}
      >
        Movie Name
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 4,
          width: "100%",
        }}
      >
        <input
          aria-label="Search bar"
          role="search"
          inputMode="search"
          type="text"
          name="search"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchMovies(inputText);
          }}
          placeholder={`🔎 e.g. Iron Man`}
          style={{
            border: "none",
            borderRadius: "6px",
            padding: "1.1rem",
            flex: 3,
            fontSize: "1.15rem",
            backgroundColor: "#DFE3E8",
          }}
          value={inputText}
        />
      </div>
    </SearchBarDiv>
  );
}
