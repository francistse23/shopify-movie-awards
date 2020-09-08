import React from "react";
import { SearchBarDiv, SearchBarInput } from "../styled-components";
import { dimensions } from "../constants";

export default function SearchBar({ inputText, setInputText, searchMovies }) {
  return (
    <SearchBarDiv>
      <label
        htmlFor="search"
        id="search"
        style={{
          fontSize: `${dimensions.fontSize * 1.5}px`,
          fontWeight: "600",
          margin: `${dimensions.fontSize}px 0`,
          textAlign: "left",
        }}
      >
        Movie Name
      </label>
      <SearchBarInput
        aria-label="Search bar"
        role="search"
        inputMode="search"
        // type="text"
        name="search"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") searchMovies(inputText);
        }}
        placeholder={`🔎 e.g. Iron Man`}
        value={inputText}
      />
    </SearchBarDiv>
  );
}
