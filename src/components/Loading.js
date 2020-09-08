import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { colors, dimensions } from "../constants";

export default function Loading({ searchResults }) {
  return (
    <ClipLoader
      css={css`
        margin: ${dimensions.spacing * 20}px auto;
      `}
      size={100}
      color={`${colors.mainColor}`}
      loading={searchResults?.loading || true}
    />
  );
}
