import React from "react";
import { render, screen } from "@testing-library/react";

import SearchBar from "./SearchBar";

describe("Search Bar", () => {
  test("renders SearchBar component", () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText("🔎 e.g. Iron Man")).toBeEmpty();
  });
});
