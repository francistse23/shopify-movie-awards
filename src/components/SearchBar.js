import { SearchBarDiv, SearchBarInput } from "../styled-components";

import React from "react";
import { dimensions } from "../constants";

export default function SearchBar({ inputText, setInputText, searchMovies }) {
  return (
    <SearchBarDiv>
      {/* <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid white",
        }}
      > */}
      <label
        htmlFor="search"
        id="search"
        style={{
          alignSelf: "flex-start",
          fontSize: `${dimensions.fontSize * 1.5}px`,
          fontWeight: "600",
          margin: `${dimensions.spacing * 4}px 0`,
          textAlign: "left",
        }}
      >
        Movie Name
      </label>
      <SearchBarInput
        aria-label="Search bar"
        role="search"
        inputMode="search"
        name="search"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchMovies(inputText);
        }}
        placeholder={`🔎 e.g. Iron Man`}
        value={inputText}
      />
      {/* </div> */}
    </SearchBarDiv>
  );
}
