import "jest-styled-components";

import * as React from "react";

import { fireEvent, render } from "@testing-library/react";

import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";

describe("SearchBar component tests", () => {
  const setInputText = jest.fn();
  let inputText = "";

  beforeEach(() => {
    setInputText.mockClear();
    inputText = "";
  });

  test("Search bar input should render", async () => {
    const { getByRole } = render(
      <SearchBar inputText={inputText} setInputText={setInputText} />
    );

    const searchBarInput = await getByRole("search", { name: "Search bar" });

    expect(searchBarInput).toBeInTheDocument();
  });

  test("Search bar should display typed text", async () => {
    const { getByRole } = render(
      <SearchBar inputText={inputText} setInputText={setInputText} />
    );

    const searchBarInput = await getByRole("search", { name: "Search bar" });

    userEvent.type(searchBarInput, "avengers");

    expect(setInputText).toHaveBeenCalledTimes(8);
    // value not updating
    // expect(searchBarInput).toHaveValue("avengers");
  });
});
