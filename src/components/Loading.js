import { colors, dimensions } from "../constants";

import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import { css } from "@emotion/core";

export default function Loading({ loading }) {
  return (
    <ClipLoader
      css={css`
        margin: ${dimensions.spacing * 20}px auto;
      `}
      size={100}
      color={`${colors.mainColor}`}
      loading={loading}
    />
  );
}
