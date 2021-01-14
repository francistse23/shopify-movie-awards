import "jest-styled-components";

import * as React from "react";

import App from "../App";
import { render } from "@testing-library/react";

describe("App tests", () => {
  test("renders App component", () => {
    render(<App />);
  });
});
