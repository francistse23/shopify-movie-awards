import * as SC from "../styled-components";

import React from "react";
import { dimensions } from "../constants";

const { SearchBarContainer, SearchBarInput } = SC;

export default function SearchBar({ inputText, setInputText }) {
  return (
    <SearchBarContainer id="search-bar">
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
        placeholder={`🔎 e.g. Iron Man`}
        value={inputText}
      />
    </SearchBarContainer>
  );
}
