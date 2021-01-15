import "jest-styled-components";

import * as React from "react";

import Nominations from "../components/Nominations";
import { render } from "@testing-library/react";

describe("Movie component tests", () => {
  const nominations = new Map([
    [
      "tt0371746",
      {
        Title: "Iron Man",
        Year: "2008",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
        imdbID: "tt0371746",
        Ratings: [
          { Source: "Internet Movie Database", Value: "7.9/10" },
          { Source: "Rotten Tomatoes", Value: "94%" },
          { Source: "Metacritic", Value: "79/100" },
        ],
      },
    ],
    [
      "tt1228705",
      {
        Title: "Iron Man 2",
        Year: "2010",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg",
        imdbID: "tt1228705",
      },
    ],
  ]);
  const setState = jest.fn();

  test("Test 2 nominations rendering", async () => {
    const { findAllByTestId } = render(
      <Nominations nominations={nominations} setNominations={setState} />
    );

    const movies = await findAllByTestId("movie-test-id", { exact: false });

    expect(movies).toHaveLength(2);
  });

  test("Test 0 nomination rendering", async () => {
    const { getByText } = render(
      <Nominations nominations={new Map()} setNominations={setState} />
    );

    const noNominations = await getByText(
      "You don't have any nominations for The Shoppies yet."
    );

    expect(noNominations).toBeInTheDocument();
  });
});
